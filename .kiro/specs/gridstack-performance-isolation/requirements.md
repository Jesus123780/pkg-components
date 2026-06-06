# Requirements Document

## Introduction

This document specifies the requirements for a performance-isolated grid layout architecture for a React-based interactive grid system (similar to GridStack.js). The core objective is to decouple widget content rendering from grid interaction state (drag, resize, reflow) so that heavy components (charts, tables, virtualized lists) do not cause slowness during grid interactions, and widget internal state changes do not trigger grid recalculations. The architecture introduces a headless GridEngine (pure logic, no React), a layered provider/shell/content pattern, and a portal-based drag layer to achieve strict render isolation. All implementation changes are scoped exclusively to the `pkg-components` package at `stories/organisms/grid_stack_react_pure_js_module/`.

## Glossary

- **Grid_Engine**: A pure JavaScript/TypeScript class (no React dependency) that manages layout state, collision detection, placement search, compaction, and reflow logic. It operates on plain data structures and emits events or exposes a subscription API.
- **Grid_Provider**: A React context provider that connects the Grid_Engine to the React tree, exposes layout state via subscription, and provides imperative APIs (startDrag, startResize, commitLayout) to consumers.
- **Grid_Item_Shell**: A thin React wrapper responsible only for positioning and sizing a grid cell using CSS transforms. It subscribes only to its own position/size slice from the Grid_Provider, isolating it from unrelated layout changes.
- **Grid_Item_Content**: The React subtree containing the actual heavy widget (chart, table, form). It is rendered inside the Shell but decoupled from drag/resize state through memoization and stable prop references.
- **Drag_Layer**: A portal-based overlay rendered outside the main grid tree that displays the visual preview of the item being dragged or resized, preventing the original content from re-rendering during interaction.
- **External_Store**: A framework-agnostic state container (e.g., using useSyncExternalStore) that holds layout positions and interaction state, enabling fine-grained subscriptions without React context re-render propagation.
- **Layout_Commit**: The act of finalizing a new layout after a drag/resize interaction ends (on pointer-up), as opposed to applying layout on every frame during movement.
- **Interaction_State**: Transient state during drag or resize operations (pointer position, overlay coordinates, preview positions) that exists only for the duration of the interaction.
- **Widget**: Any React component rendered inside a Grid_Item_Content. Widgets can be heavy (charts, tables) or lightweight (text, buttons).
- **Reflow**: The process of resolving collisions and repositioning grid items after a layout change (item moved, resized, added, or removed).
- **FLIP_Animation**: A technique (First, Last, Invert, Play) for performant layout animations using CSS transforms rather than layout-triggering properties.
- **Render_Isolation**: The architectural property ensuring that a React subtree does not re-render due to state changes in sibling or parent subtrees that do not affect its props.

## Requirements

### Requirement 1: Headless Grid Engine

**User Story:** As a developer, I want the layout computation engine to be a pure JavaScript class with no React dependency, so that I can test it independently, reuse it across frameworks, and ensure grid logic never triggers React re-renders directly.

#### Acceptance Criteria

1. THE Grid_Engine SHALL manage layout state as a plain array of position objects where each object contains the properties i (string identifier), x (integer >= 0), y (integer >= 0), w (integer >= 1), h (integer >= 1), and an optional static (boolean) flag indicating the item cannot be moved or displaced
2. THE Grid_Engine SHALL expose methods for collision detection, placement search, compaction, and reflow without importing or depending on any React API (no references to react, react-dom, or any React hook in its module dependency graph)
3. WHEN a layout mutation is requested (move, resize, add, or remove of an item), THE Grid_Engine SHALL compute the new layout synchronously and emit the result via a subscription callback registered through a subscribe method that returns an unsubscribe function
4. IF a layout mutation results in an item with x + w exceeding the configured column count or with w < 1 or h < 1, THEN THE Grid_Engine SHALL clamp the item position to valid bounds (x >= 0, y >= 0, x + w <= column count, w >= 1, h >= 1) before computing the reflow
5. THE Grid_Engine SHALL accept configuration parameters at construction time with the following defaults: column count (default 12, range 1 to 48), row height in pixels (default 60, range 1 to 1000), margins as a horizontal and vertical pair in pixels (default [10, 10]), and collision mode (one of push, swap, push-first, or none; default push)
6. WHEN multiple items collide during a reflow, THE Grid_Engine SHALL resolve collisions using a bounded algorithm that completes within O(n * maxDepth) operations where n is the number of items and maxDepth is a configurable parameter (default 8, range 1 to 50)
7. WHEN the Grid_Engine has no subscribers registered and a layout mutation is requested, THE Grid_Engine SHALL still compute and store the new layout internally, making it retrievable via a synchronous getLayout method

### Requirement 2: External Store for Layout State

**User Story:** As a developer, I want layout state to live in an external store compatible with useSyncExternalStore, so that only components subscribed to specific slices re-render when layout changes.

#### Acceptance Criteria

1. THE External_Store SHALL implement a subscribe function that accepts a callback and returns an unsubscribe function, and a getSnapshot function that returns the current state, conforming to the React useSyncExternalStore contract
2. WHEN a grid item position changes, THE External_Store SHALL notify only subscribers whose selector references the changed item's identifier, leaving all other subscribers uncalled
3. THE External_Store SHALL maintain two distinct state channels: committed layout positions and transient Interaction_State, each with independent subscribe/getSnapshot pairs
4. WHEN Interaction_State changes during drag or resize, THE External_Store SHALL NOT invoke subscribers of the committed layout channel
5. THE External_Store SHALL provide a selector API that accepts an item identifier and returns that item's position object (x, y, w, h) from the committed layout channel
6. WHEN a selector's watched item has not changed between snapshots, THE External_Store SHALL return the same object reference from getSnapshot so that React skips re-rendering the subscribed component
7. IF a selector references an item identifier that does not exist in the current layout, THEN THE External_Store SHALL return null without throwing an error
8. THE External_Store SHALL return immutable snapshot objects from getSnapshot; successive calls between state changes SHALL return the same reference

### Requirement 3: Grid Item Shell Render Isolation

**User Story:** As a developer, I want each grid cell wrapper to subscribe only to its own position data, so that moving one item does not cause other items to re-render.

#### Acceptance Criteria

1. THE Grid_Item_Shell SHALL subscribe to the External_Store using a selector that accepts the item's unique id and returns only that item's position data (x, y, w, h), such that changes to other items' position data do not trigger a subscription notification
2. WHEN another item's position changes in the layout, THE Grid_Item_Shell SHALL NOT re-render (verified by a render-count test: in a grid of at least 5 items, moving one item results in exactly 0 additional renders for every other Grid_Item_Shell)
3. THE Grid_Item_Shell SHALL apply position using CSS translate3d(x, y, 0) and size using explicit width and height properties, and SHALL NOT use top, left, right, bottom, or margin for positioning
4. WHEN the Grid_Item_Shell re-renders due to its own position change, THE Grid_Item_Content inside it SHALL NOT re-render if its props are shallowly equal to the previous render's props
5. THE Grid_Item_Shell SHALL use React.memo (or equivalent shallow-comparison memoization boundary) to prevent propagation of parent re-renders to the Grid_Item_Content
6. WHEN the External_Store emits a state update, THE Grid_Item_Shell selector SHALL complete comparison and return within 2 milliseconds per item to avoid frame drops in grids of up to 200 items

### Requirement 4: Widget Content Decoupling

**User Story:** As a developer, I want widget content to be completely decoupled from grid interaction state, so that heavy components like charts and tables maintain smooth internal performance during grid operations.

#### Acceptance Criteria

1. THE Grid_Item_Content SHALL NOT receive drag coordinates, resize deltas, or overlay state as props
2. WHILE a drag or resize interaction is active on any grid item, THE Grid_Item_Content of non-interacting items SHALL NOT re-render
3. WHILE a drag or resize interaction is active on the item itself, THE Grid_Item_Content SHALL NOT re-render until the Layout_Commit occurs; WHEN the Layout_Commit occurs, THE Grid_Item_Content SHALL re-render only if its committed width or height changed
4. THE Grid_Item_Content SHALL receive stable references for its props across renders (no new object/array allocations per render), and THE ReactNode identity of the Widget rendered as Grid_Item_Content SHALL remain referentially stable across parent re-renders (no inline JSX recreation per render cycle)
5. WHEN the Widget internal state changes (e.g., chart data update, form input), THE Grid_Engine SHALL NOT recalculate layout or trigger reflow
6. THE Grid_Item_Content SHALL receive its committed cell width and height (in pixels) as stable props so that responsive Widgets (charts, tables) can size themselves, and these values SHALL update only on Layout_Commit

### Requirement 5: Portal-Based Drag Layer

**User Story:** As a developer, I want drag and resize previews to render in a separate portal outside the grid item tree, so that moving the preview does not trigger re-renders in widget content.

#### Acceptance Criteria

1. WHEN a drag or resize interaction starts, THE Drag_Layer SHALL render a visual preview in a React portal mounted to a DOM node that is outside the grid container DOM tree
2. WHILE a drag or resize interaction is active, THE Drag_Layer SHALL update its position and size using direct DOM manipulation (refs and style mutations) without triggering React state updates or re-renders on pointer move events
3. WHEN the drag or resize interaction ends, THE Drag_Layer SHALL unmount the preview element from the portal and THE Grid_Provider SHALL trigger a single Layout_Commit
4. WHILE a drag or resize interaction is active, THE Drag_Layer SHALL display a placeholder limited to a maximum of 10 DOM nodes (e.g., a static outline or a captured snapshot image of the dragged item), not the full Widget subtree
5. WHILE a drag interaction is active, THE Grid_Item_Shell of the dragged item SHALL apply CSS opacity of 0.4 to indicate its original position without unmounting the Grid_Item_Content
6. IF the portal mount target DOM node does not exist when a drag interaction starts, THEN THE Drag_Layer SHALL create and append a dedicated container element to document.body before rendering the preview

### Requirement 6: Layout Commit Strategy

**User Story:** As a developer, I want layout changes to commit only on interaction end (pointer-up), so that intermediate positions during drag do not cause cascading re-renders across the grid.

#### Acceptance Criteria

1. WHILE a drag or resize interaction is active, THE Grid_Provider SHALL NOT update the committed layout in the External_Store
2. WHEN the pointer is released after a drag or resize, THE Grid_Provider SHALL compute the final layout via the Grid_Engine and commit it to the External_Store as a single synchronous write that triggers exactly one notification cycle to committed-channel subscribers
3. THE Grid_Provider SHALL expose an option to enable speculative preview updates during drag for visual feedback without committing to the External_Store committed channel
4. WHILE a speculative preview is active, THE preview positions SHALL be communicated to Grid_Item_Shell components via the Interaction_State channel, not the committed layout channel
5. IF the drag interaction is cancelled by Escape key press or by the pointer leaving the Grid_Provider container bounds for more than 300ms without re-entering, THEN THE Grid_Provider SHALL discard Interaction_State, restore the last committed layout, and ensure Grid_Item_Content components receive zero re-renders during restoration

### Requirement 7: Animation Without Content Re-renders

**User Story:** As a developer, I want layout transition animations (FLIP) to execute via CSS transforms on the Shell layer only, so that animating position changes does not re-render widget content.

#### Acceptance Criteria

1. WHEN a Layout_Commit produces position changes, THE Grid_Item_Shell SHALL animate to the new position using FLIP_Animation on CSS transform properties with a default duration of 300ms and easing cubic-bezier(0.22, 1, 0.36, 1)
2. WHILE a FLIP_Animation is in progress, THE Grid_Item_Shell SHALL update the DOM element transform via refs or the Web Animations API without setting React state, ensuring zero React re-renders on Grid_Item_Content during the animation
3. WHEN a FLIP_Animation starts, THE Grid_Item_Shell SHALL apply will-change: transform to the animating element, and WHEN the animation completes or is cancelled, THE Grid_Item_Shell SHALL remove will-change within one animation frame
4. WHEN the user prefers reduced motion (prefers-reduced-motion: reduce), THE Grid_Item_Shell SHALL skip animation and apply final positions immediately with zero transition duration
5. THE animation system SHALL use CSS transitions or Web Animations API rather than JavaScript-driven frame-by-frame style mutations that trigger browser layout recalculation (forced reflow)
6. IF a new Layout_Commit occurs while a FLIP_Animation is still in progress, THEN THE Grid_Item_Shell SHALL cancel the current animation and start a new FLIP_Animation from the element's current visual position to the new target position

### Requirement 8: Grid Provider API

**User Story:** As a developer, I want a clean React context provider that exposes grid operations via hooks, so that consuming components can interact with the grid without tight coupling to the engine internals.

#### Acceptance Criteria

1. THE Grid_Provider SHALL expose a useGridItem hook that accepts an item identifier and returns the current position (x, y) and size (w, h) for that item, or null if the identifier does not match any item in the grid
2. THE Grid_Provider SHALL expose imperative methods (startDrag, endDrag, startResize, endResize, addItem, removeItem) via a ref or stable callback interface where each method maintains referential identity across re-renders (same function reference on every render cycle)
3. WHEN a new item is added via the Grid_Provider addItem method, THE Grid_Engine SHALL compute placement without overlaps and THE External_Store SHALL notify affected Shell subscribers
4. IF the Grid_Engine cannot place a new item without overlaps (e.g., grid is full or dimensions exceed available space), THEN THE Grid_Provider addItem method SHALL return a failure result indicating placement was not possible without mutating the committed layout
5. THE Grid_Provider SHALL accept an onLayoutChange callback that fires only on Layout_Commit and receives the complete layout array (objects with i, x, y, w, h properties), not on intermediate Interaction_State changes
6. THE Grid_Provider SHALL memoize all exposed callbacks and hook return values so that useGridItem returns a referentially identical object between renders when the item's position and size have not changed
7. IF removeItem is called with an identifier that does not exist in the current layout, THEN THE Grid_Provider SHALL return a failure result without modifying the layout or notifying subscribers

### Requirement 9: Migration Compatibility

**User Story:** As a developer, I want to migrate from the current useGrid/GridStack architecture to the new isolated architecture without breaking the existing ControlledGrid API contract.

#### Acceptance Criteria

1. THE new Grid_Provider SHALL accept an items prop typed as an array of objects where each object contains the properties: i (string, required), x (number, required), y (number, required), w (number, required), h (number, required), static (boolean, optional), and component (Record<string, unknown>, optional), matching the current GridItem interface
2. THE new architecture SHALL support an onLayoutChange callback prop with the signature (layout: Array<{i: string, x: number, y: number, w: number, h: number}>) => void, invoked after every drag or resize interaction that produces a layout change
3. THE new architecture SHALL support the same dragMode values (preview, overlay, real) and collisionMode values (push, swap, push-first, none) as the current GridStack component, accepting them as props of enum type
4. WHERE the legacy componentMap prop is provided as Record<string, React.ReactNode>, THE Grid_Provider SHALL map each keyed entry to a Grid_Item_Content wrapper so that existing component registrations render without consumer changes
5. THE new architecture SHALL expose a compatibility adapter component that accepts the full current GridStackProps interface (items, cols, rowHeight, radio, margin, containerPadding, isDraggable, isResizable, preventCollision, onLayoutChange, componentMap, dragMode, collisionMode, animation, snapEnabled, snapThreshold, showGrid, sticky) and internally delegates to the new Grid_Provider and Grid_Item components
6. IF a consumer passes an items array where objects use an "id" property instead of "i", THEN THE compatibility adapter SHALL normalize each item by mapping "id" to "i" before forwarding to Grid_Provider, preserving all other properties unchanged
7. WHEN the compatibility adapter receives an onLayoutChange callback, THE adapter SHALL invoke the callback with layout items using the "i" property as identifier (not "id"), maintaining backward compatibility with existing GridStackWrapper consumers

### Requirement 10: Performance Benchmarks

**User Story:** As a developer, I want measurable performance guarantees, so that I can validate the architecture meets its render isolation goals.

#### Acceptance Criteria

1. WHEN dragging an item in a grid with 20 or more items where each item contains a heavy Widget (simulated with 500 DOM nodes), THE Grid_Item_Content components of non-dragged items SHALL have zero React re-renders during the entire drag interaction (measured via React Profiler onRender callback)
2. WHEN a Widget internal state updates (e.g., setState inside a chart component), THE Grid_Engine reflow calculation SHALL NOT execute (verified by a spy on the Grid_Engine reflow method showing zero invocations)
3. WHEN a Layout_Commit occurs, THE total React re-render count across all Grid_Item_Shell components SHALL equal only the number of items whose position actually changed (measured via React Profiler)
4. WHILE dragging an item for at least 3 seconds in a grid with 30 items containing heavy Widgets, THE frame rate SHALL remain above 55 frames per second when measured with Chrome DevTools Performance panel at 4x CPU throttle (simulating a mid-range device)
5. WHEN adding or removing a grid item, THE Grid_Item_Content components of unaffected items SHALL NOT unmount or remount (verified via a component lifecycle spy showing zero mount/unmount calls on unaffected items)
6. THE performance benchmarks SHALL be automated as test cases using React Testing Library with a render-count utility, executable via the project test runner without manual browser profiling

# Implementation Plan: Gridstack Performance Isolation

## Overview

This plan implements a performance-isolated grid layout architecture that decouples widget content rendering from grid interaction state. The implementation is scoped exclusively to `pkg-components/stories/organisms/grid_stack_react_pure_js_module/` and builds on the existing module structure. Each task builds incrementally, starting with the pure TypeScript engine, then the store layer, then React components, then integration wiring, and finally the compatibility adapter.

## Tasks

- [ ] 1. Set up project structure, core types, and test utilities
  - [ ] 1.1 Create core type definitions and directory structure
    - Create `engine/` directory with `grid-engine.ts` and `types.ts`
    - Create `store/` directory with `external-store.ts`
    - Create `__tests__/` and `__test-utils__/` directories
    - Define `GridPosition`, `GridEngineConfig`, `StoreState`, `InteractionState`, `PxHelpers` interfaces in `types.ts`
    - Export all types from a barrel `types/index.ts`
    - _Requirements: 1.1, 1.5, 2.1_

  - [ ] 1.2 Create test utilities and fast-check generators
    - Create `__test-utils__/generators.ts` with fast-check arbitraries for `GridPosition`, layout arrays, and `GridEngineConfig`
    - Create `__test-utils__/render-counter.tsx` HOC/hook for counting React renders in tests
    - Create `__test-utils__/heavy-widget.tsx` simulated heavy widget with 500 DOM nodes
    - Install `fast-check` as a dev dependency if not already present
    - _Requirements: 10.6_

- [ ] 2. Implement GridEngine (pure TypeScript, zero React dependency)
  - [ ] 2.1 Implement GridEngine core: constructor, getLayout, setLayout, subscribe
    - Implement constructor accepting `GridEngineConfig` with defaults (cols=12, rowHeight=60, margin=[10,10], collisionMode='push', maxReflowDepth=8)
    - Implement `getLayout()` returning current layout array
    - Implement `setLayout(layout)` for external layout injection
    - Implement `subscribe(callback)` returning unsubscribe function
    - Ensure zero React imports in the module dependency graph
    - _Requirements: 1.1, 1.2, 1.3, 1.5, 1.7_

  - [ ] 2.2 Implement GridEngine mutations: moveItem, resizeItem, addItem, removeItem
    - Implement `moveItem(id, x, y)` with bounds clamping
    - Implement `resizeItem(id, w, h)` with bounds clamping
    - Implement `addItem(item)` with placement search, returning null on failure
    - Implement `removeItem(id)` returning null for non-existent ids
    - All mutations notify subscribers exactly once with new layout
    - _Requirements: 1.3, 1.4, 8.3, 8.4, 8.7_

  - [ ] 2.3 Implement collision resolution and compaction algorithms
    - Implement `resolveCollisions(layout, movedItem)` with push, swap, push-first, and none modes
    - Implement `compact(layout)` for vertical compaction
    - Implement `clampToBounds(item)` ensuring x>=0, y>=0, w>=1, h>=1, x+w<=cols
    - Implement `findPlacement(item, layout)` for addItem placement search
    - Bound reflow to O(n * maxReflowDepth) iterations
    - _Requirements: 1.4, 1.6, 8.3_

  - [ ]* 2.4 Write property tests for GridEngine (Properties 1, 2, 20)
    - **Property 1: Layout Bounds Invariant** — for any config and any mutation, all items satisfy x>=0, y>=0, w>=1, h>=1, x+w<=cols
    - **Property 2: Subscription Notification on Mutation** — subscribers invoked exactly once per mutation
    - **Property 20: Reflow Bounded Complexity** — collision resolution terminates within n*maxDepth iterations
    - **Validates: Requirements 1.3, 1.4, 1.6, 1.7**

  - [ ]* 2.5 Write unit tests for GridEngine
    - Test configuration defaults and overrides
    - Test specific collision scenarios (swap, push, push-first, none)
    - Test edge cases: single item, full grid, static items blocking placement
    - Test compaction behavior with known layouts
    - _Requirements: 1.1, 1.2, 1.4, 1.5, 1.6_

- [ ] 3. Checkpoint - GridEngine verification
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Implement ExternalStore (framework-agnostic state container)
  - [ ] 4.1 Implement ExternalStore with committed layout channel
    - Implement `subscribeCommitted(callback)` / `getCommittedSnapshot()` conforming to useSyncExternalStore contract
    - Implement `commitLayout(layout)` that notifies committed subscribers
    - Implement `getItemPosition(id)` / `getItemSnapshot(id)` with referential stability for unchanged items
    - Return `null` for non-existent item ids without throwing
    - Ensure immutable snapshots (internal state not affected by external mutation of returned objects)
    - _Requirements: 2.1, 2.2, 2.5, 2.6, 2.7, 2.8_

  - [ ] 4.2 Implement ExternalStore interaction channel and per-item subscriptions
    - Implement `subscribeInteraction(callback)` / `getInteractionSnapshot()` for transient state
    - Implement `setInteractionState(state)` that notifies only interaction subscribers
    - Implement `subscribeItem(id, callback)` for per-item granular subscription
    - Implement `batch(fn)` for grouping multiple mutations
    - Ensure interaction state changes never invoke committed channel subscribers
    - _Requirements: 2.2, 2.3, 2.4_

  - [ ]* 4.3 Write property tests for ExternalStore (Properties 3, 4, 5, 6)
    - **Property 3: Selective Subscriber Notification** — changing item A does not invoke item B subscriber
    - **Property 4: Channel Isolation** — interaction changes never invoke committed subscribers
    - **Property 5: Referential Stability for Unchanged Items** — unchanged item snapshots are === identical
    - **Property 6: Immutable Snapshots** — mutating returned snapshot does not affect store state
    - **Validates: Requirements 2.2, 2.4, 2.6, 2.8**

  - [ ]* 4.4 Write unit tests for ExternalStore
    - Test subscribe/unsubscribe lifecycle
    - Test getSnapshot returns null for missing items
    - Test batch commit behavior
    - Test subscriber error handling (catch and continue)
    - _Requirements: 2.1, 2.3, 2.7_

- [ ] 5. Checkpoint - Store layer verification
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implement React components: GridProvider, GridItemShell, GridItemContent
  - [ ] 6.1 Implement GridProvider context and hooks
    - Create `GridProvider` component that instantiates GridEngine + ExternalStore
    - Implement `useGridItem(id)` hook using `useSyncExternalStore` with per-item selector
    - Implement `useGridActions()` hook returning stable references (startDrag, endDrag, startResize, endResize, addItem, removeItem)
    - Implement `PxHelpers` computation from engine config
    - Wire `onLayoutChange` callback to fire only on Layout_Commit
    - Accept `items`, `cols`, `rowHeight`, `margin`, `collisionMode`, `speculativePreview`, `maxReflowDepth` props
    - _Requirements: 8.1, 8.2, 8.4, 8.5, 8.6_

  - [ ] 6.2 Implement GridItemShell with per-item subscription and FLIP animation
    - Subscribe to ExternalStore using per-item selector (useSyncExternalStore)
    - Apply positioning via CSS `translate3d(x, y, 0)` with explicit width/height
    - Implement FLIP animation on Layout_Commit using Web Animations API / CSS transitions (300ms, cubic-bezier(0.22, 1, 0.36, 1))
    - Apply `will-change: transform` during animation, remove on completion
    - Support `prefers-reduced-motion: reduce` (skip animation)
    - Cancel in-progress animation and start from current position on new commit
    - Apply opacity 0.4 on the shell when its item is being dragged
    - Wrap children in React.memo boundary
    - _Requirements: 3.1, 3.2, 3.3, 3.5, 5.5, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

  - [ ] 6.3 Implement GridItemContent with memoized render boundary
    - Create `GridItemContent` component with React.memo and custom comparator
    - Re-render only when committed widthPx or heightPx changes
    - Do not receive drag coordinates, resize deltas, or overlay state as props
    - Ensure stable prop references (no new object/array allocations per render)
    - Pass committed cell width/height in pixels as stable props
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.6_

- [ ] 7. Implement DragLayer (portal-based overlay with direct DOM manipulation)
  - [ ] 7.1 Implement DragLayer portal and pointer event handling
    - Render via React portal to document.body (create container if missing)
    - On pointerdown: mount preview, capture pointer
    - On pointermove: update style.transform directly via ref (zero React re-renders)
    - On pointerup: unmount preview, trigger Layout_Commit via GridProvider
    - Limit preview DOM to max 10 nodes (static outline/placeholder)
    - Auto-cancel after 10 seconds of inactivity
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.6_

  - [ ] 7.2 Wire drag/resize interaction flow in GridProvider
    - Implement `startDrag` flow: set interaction state, mount DragLayer, capture pointer
    - Implement `endDrag` flow: compute final layout via GridEngine, commit to store, unmount DragLayer
    - Implement `startResize` / `endResize` with corner-based resize logic
    - Implement cancellation (Escape key, pointer exit 300ms+): discard interaction state, restore committed layout
    - Implement speculative preview via interaction channel (when enabled)
    - Ignore concurrent drag requests (log warning)
    - Queue items prop changes during active interaction, apply after interaction ends
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 8.2_

- [ ] 8. Checkpoint - Core architecture verification
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Implement CompatibilityAdapter
  - [ ] 9.1 Implement CompatibilityAdapter wrapping legacy GridStackProps
    - Accept full GridStackProps interface (items, cols, rowHeight, radio, margin, containerPadding, isDraggable, isResizable, preventCollision, onLayoutChange, componentMap, dragMode, collisionMode, animation, snapEnabled, snapThreshold, showGrid, sticky)
    - Normalize "id" to "i" on input items
    - Map componentMap entries to GridItemContent wrappers
    - Translate dragMode/collisionMode enum values
    - Invoke onLayoutChange with "i" property (not "id")
    - Auto-generate `i` from array index when neither "i" nor "id" present
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

  - [ ]* 9.2 Write property test for CompatibilityAdapter (Property 21)
    - **Property 21: ID Normalization Round-Trip** — items with "id" property produce onLayoutChange with "i" property containing original identifier, "id" not present in output
    - **Validates: Requirements 9.6, 9.7**

  - [ ]* 9.3 Write unit tests for CompatibilityAdapter
    - Test props passthrough for all GridStackProps
    - Test componentMap rendering
    - Test dragMode/collisionMode enum translation
    - Test auto-generation of "i" from array index
    - _Requirements: 9.1, 9.3, 9.4, 9.5_

- [ ] 10. Implement render isolation integration tests and property tests
  - [ ]* 10.1 Write property test for collision-free placement (Property 16)
    - **Property 16: Collision-Free Placement on AddItem** — addItem success implies zero overlapping pairs; failure implies layout unchanged
    - **Validates: Requirements 8.3, 8.4**

  - [ ]* 10.2 Write render isolation integration tests (Properties 7, 8, 9, 10, 12, 13, 14, 17, 18, 19)
    - **Property 7:** Content render isolation during interaction (N>=5 items, 0 renders on non-dragged content)
    - **Property 8:** Self-content isolation until commit (re-render only if w/h changed)
    - **Property 9:** Widget state isolation from engine (setState in widget triggers 0 engine reflows)
    - **Property 10:** DragLayer zero React re-renders during moves (render count = 1 after mount)
    - **Property 12:** Single atomic commit on pointer-up (exactly 1 committed notification)
    - **Property 13:** Cancellation restores state with zero content re-renders
    - **Property 14:** Animation without content re-renders
    - **Property 17:** onLayoutChange fires only on commit (0 during drag, 1 on pointer-up)
    - **Property 18:** Shell re-render count equals changed items
    - **Property 19:** Add/remove does not unmount unaffected content
    - **Validates: Requirements 3.2, 3.4, 4.2, 4.3, 4.5, 5.2, 6.2, 6.5, 7.2, 8.5, 10.1, 10.2, 10.3, 10.5**

  - [ ]* 10.3 Write DragLayer DOM node limit test (Property 11)
    - **Property 11:** Drag preview element contains at most 10 DOM nodes regardless of widget complexity
    - **Validates: Requirements 5.4**

  - [ ]* 10.4 Write speculative preview property test (Property 22)
    - **Property 22: Speculative Preview via Interaction Channel** — preview positions appear only in interaction channel; committed snapshot remains referentially identical during interaction
    - **Validates: Requirements 6.3, 6.4**

- [ ] 11. Implement performance benchmarks
  - [ ]* 11.1 Write automated performance benchmark tests
    - Test 20+ items with heavy widgets (500 DOM nodes each): zero non-dragged content renders during drag
    - Test 30 items render count as frame-rate proxy
    - Test widget setState does not trigger engine reflow (spy verification)
    - Test shell re-render count equals only changed items on commit
    - All benchmarks executable via project test runner without manual profiling
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [ ] 12. Final integration and wiring
  - [ ] 12.1 Wire all components together and update module exports
    - Update `index.tsx` barrel export with new public API (GridProvider, GridItemShell, GridItemContent, useGridItem, useGridActions, CompatibilityAdapter)
    - Ensure CompatibilityAdapter is the default export for backward compatibility
    - Verify existing Storybook stories still render with CompatibilityAdapter
    - Remove or deprecate legacy `useGrid` hook references (keep file for reference)
    - _Requirements: 9.1, 9.2, 9.5_

  - [ ] 12.2 Update Storybook stories with new architecture demos
    - Add story demonstrating new GridProvider + GridItemShell + GridItemContent API
    - Add story demonstrating render isolation (with render counter overlay)
    - Keep existing stories working via CompatibilityAdapter
    - _Requirements: 9.5_

- [ ] 13. Final checkpoint - Full suite verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- All implementation is scoped to `pkg-components/stories/organisms/grid_stack_react_pure_js_module/`
- The GridEngine module MUST have zero React imports in its dependency graph
- The ExternalStore MUST be framework-agnostic (no React imports)
- fast-check library is used for property-based testing
- Render isolation tests use React Testing Library with the custom render-counter utility

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1"] },
    { "id": 2, "tasks": ["2.2", "2.3"] },
    { "id": 3, "tasks": ["2.4", "2.5", "4.1"] },
    { "id": 4, "tasks": ["4.2"] },
    { "id": 5, "tasks": ["4.3", "4.4", "6.1"] },
    { "id": 6, "tasks": ["6.2", "6.3"] },
    { "id": 7, "tasks": ["7.1"] },
    { "id": 8, "tasks": ["7.2", "9.1"] },
    { "id": 9, "tasks": ["9.2", "9.3", "10.1"] },
    { "id": 10, "tasks": ["10.2", "10.3", "10.4", "11.1"] },
    { "id": 11, "tasks": ["12.1"] },
    { "id": 12, "tasks": ["12.2"] }
  ]
}
```

export interface CardData {
    id: string;
    label?: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
    parentId?: string | null;
}

/** Registry entry */
export interface NodeRegistryItem {
    id: string;
    el: HTMLElement | null;
    rect?: DOMRect;
    data: CardData;
}

/** Control point used to bend the connector */
export interface ConnectorControl {
    cx: number;
    cy: number;
}

/** Public API from the board */
export interface ConnectorBoardHandle {
    recalc(): void;
    getRects(): Record<string, DOMRect | undefined>;
}
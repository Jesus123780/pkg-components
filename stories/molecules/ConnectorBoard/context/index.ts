/** ================================
 * Context
 * ================================ */

import { createContext } from "react";
import { CardData } from "../types";

export const ConnectorContext = createContext<{
    register: (id: string, el: HTMLElement | null, data: CardData) => void;
    unregister: (id: string) => void;
    updatePos: (id: string, x: number, y: number) => void;
    getRects: () => Record<string, DOMRect | undefined>;
    recalc: () => void;
} | null>(null);
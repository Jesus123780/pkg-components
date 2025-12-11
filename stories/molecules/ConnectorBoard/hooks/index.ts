import { useContext } from "react";
import { ConnectorContext } from "../context";


/**
 * Hook to access positions and recalc
 */
export const useConnectorPositions = () => {
    const ctx = useContext(ConnectorContext);
    if (!ctx) throw new Error('Must use inside <ConnectorBoard>');
    return { positions: ctx.getRects(), recalc: ctx.recalc };
};

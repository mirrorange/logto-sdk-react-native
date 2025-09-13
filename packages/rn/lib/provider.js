import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { LogtoClient } from './client.js';
import { LogtoContext } from './context.js';
/**
 * A provider component to provide the `LogtoContext` which includes the `LogtoClient` instance
 * with the given configuration.
 */
export const LogtoProvider = ({ config, children }) => {
    const memorizedLogtoClient = useMemo(() => new LogtoClient(config), [config]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    useEffect(() => {
        (async () => {
            const isAuthenticated = await memorizedLogtoClient.isAuthenticated();
            setIsAuthenticated(isAuthenticated);
            // Mark the client as initialized.
            setIsInitialized(true);
        })();
    }, [memorizedLogtoClient]);
    const memorizedContextValue = useMemo(() => ({
        client: memorizedLogtoClient,
        isAuthenticated,
        isInitialized,
        setIsAuthenticated,
    }), [memorizedLogtoClient, isAuthenticated, isInitialized]);
    return _jsx(LogtoContext.Provider, { value: memorizedContextValue, children: children });
};

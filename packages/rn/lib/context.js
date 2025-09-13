import { createContext } from 'react';
export const throwContextError = () => {
    throw new Error('Must be used inside <LogtoProvider> context.');
};
export const LogtoContext = createContext({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    client: undefined,
    isInitialized: false,
    isAuthenticated: false,
    setIsAuthenticated: throwContextError,
});

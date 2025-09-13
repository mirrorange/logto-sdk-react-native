import type { LogtoClient } from './client';
export type LogtoContextProps = {
    client: LogtoClient;
    /**
     * Indicates if the client is initialized.
     *
     * - `true`: The client is initialized, and the authentication state is fetched.
     * - `false`: The client is not initialized.
     */
    isInitialized: boolean;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};
export declare const throwContextError: () => never;
export declare const LogtoContext: import("react").Context<LogtoContextProps>;

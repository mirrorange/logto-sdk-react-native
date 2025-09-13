import { type ReactNode } from 'react';
import { type LogtoNativeConfig } from './client.js';
export type LogtoProviderProps = {
    /** The configuration for the `LogtoClient`. */
    readonly config: LogtoNativeConfig;
    readonly children?: ReactNode;
};
/**
 * A provider component to provide the `LogtoContext` which includes the `LogtoClient` instance
 * with the given configuration.
 */
export declare const LogtoProvider: ({ config, children }: LogtoProviderProps) => import("react/jsx-runtime").JSX.Element;

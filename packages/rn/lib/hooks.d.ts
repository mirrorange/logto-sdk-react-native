import { type InteractionMode, type SignInOptions } from '@logto/client';
import type { LogtoClient } from './client';
/**
 * A hook to use the Logto client instance, methods, and the authentication state. The
 * `LogtoContext` must be provided to make this hook work. It's recommended to use the
 * `LogtoProvider` component to wrap the root component of the app.
 */
export declare const useLogto: () => {
    /** The Logto client instance. */
    client: LogtoClient;
    /**
     * If the user is authenticated.
     *
     * NOTE: It only checks the existence of ID token in the storage, so it's not guaranteed that the
     * tokens are valid.
     */
    isAuthenticated: boolean;
    /**
     * Indicates if the client is initialized and the authentication state is retrieved from the storage.
     */
    isInitialized: boolean;
    /** @see {@link LogtoClient.getRefreshToken} */
    getRefreshToken: () => Promise<import("@silverhand/essentials").Nullable<string>>;
    /** @see {@link LogtoClient.getAccessToken} */
    getAccessToken: (this: unknown, resource?: string | undefined, organizationId?: string | undefined) => Promise<string>;
    /** @see {@link LogtoClient.getAccessTokenClaims} */
    getAccessTokenClaims: (resource?: string) => Promise<import("@logto/js").AccessTokenClaims>;
    /** @see {@link LogtoClient.getOrganizationToken} */
    getOrganizationToken: (this: unknown, organizationId: string) => Promise<string>;
    /** @see {@link LogtoClient.getOrganizationTokenClaims} */
    getOrganizationTokenClaims: (organizationId: string) => Promise<import("@logto/js").AccessTokenClaims>;
    /** @see {@link LogtoClient.getIdToken} */
    getIdToken: () => Promise<import("@silverhand/essentials").Nullable<string>>;
    /** @see {@link LogtoClient.getIdTokenClaims} */
    getIdTokenClaims: () => Promise<import("@logto/js").IdTokenClaims>;
    /** @see {@link LogtoClient.signIn} */
    signIn: {
        (options: string, interactionMode?: InteractionMode): Promise<void>;
        (options: SignInOptions): Promise<void>;
    };
    /** @see {@link LogtoClient.signOut} */
    signOut: (redirectUri?: string) => Promise<void>;
    /** @see {@link LogtoClient.fetchUserInfo} */
    fetchUserInfo: () => Promise<import("@logto/js").UserInfoResponse>;
};

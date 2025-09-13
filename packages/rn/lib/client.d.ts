import { Prompt, StandardLogtoClient, type SignInOptions, type InteractionMode, type LogtoConfig } from '@logto/client';
import * as WebBrowser from 'expo-web-browser';
import { BrowserStorage, SecureStorage } from './storage';
export type LogtoNativeConfig = LogtoConfig & {
    /**
     * The prompt to be used for the authentication request. This can be used to skip the login or
     * consent screen when the user has already granted the required permissions.
     *
     * @see {@link https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest | OpenID Connect Core 1.0}
     * @default [Prompt.Login, Prompt.Consent]
     */
    prompt?: Prompt | Prompt[];
    /**
     * **Only for iOS**
     *
     * Determines whether the session should ask the browser for a private authentication session.
     * Set this to true to request that the browser doesn’t share cookies or other browsing data
     * between the authentication session and the user’s normal browser session. Whether the request
     * is honored depends on the user’s default web browser.
     *
     * @default true
     */
    preferEphemeralSession?: boolean;
};
export declare class LogtoClient extends StandardLogtoClient {
    authSessionResult?: WebBrowser.WebBrowserAuthSessionResult;
    protected storage: SecureStorage | BrowserStorage;
    constructor(config: LogtoNativeConfig);
    /**
     * Start the sign-in flow with the specified redirect URI. The URI must be registered in the
     * Logto Console. It uses `WebBrowser.openAuthSessionAsync` to open the browser and start the
     * sign-in flow.
     *
     * The user will be redirected to that URI after the sign-in flow is completed, and the client
     * will handle the callback to exchange the authorization code for the tokens.
     *
     * @param options The options for the sign-in flow.
     *
     * @see {@link SignInOptions}
     */
    signIn(options: SignInOptions): Promise<void>;
    /**
     * Start the sign-in flow with the specified redirect URI. The URI must be registered in the
     * Logto Console. It uses `WebBrowser.openAuthSessionAsync` to open the browser and start the
     * sign-in flow.
     *
     * The user will be redirected to that URI after the sign-in flow is completed, and the client
     * will handle the callback to exchange the authorization code for the tokens.
     *
     * @param redirectUri The redirect URI that the user will be redirected to after the sign-in flow is completed.
     * @param interactionMode The interaction mode to be used for the authorization request. Note it's not
     * a part of the OIDC standard, but a Logto-specific extension. Defaults to `signIn`.
     *
     * @see {@link InteractionMode}
     */
    signIn(redirectUri: string, interactionMode?: InteractionMode): Promise<void>;
    /**
     * Revokes all the tokens and cleans up the storage. By default, it will NOT open the browser
     * to start the sign-out flow for better user experience, and the `postLogoutRedirectUri` will
     * be ignored.
     */
    signOut(postLogoutRedirectUri?: string | undefined): Promise<void>;
}

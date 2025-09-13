import { LogtoError, Prompt, StandardLogtoClient, createRequester, } from '@logto/client';
import { decodeIdToken } from '@logto/js';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import { LogtoNativeClientError } from './errors';
import { BrowserStorage, SecureStorage } from './storage';
import { generateCodeChallenge, generateRandomString } from './utils';
const issuedAtTimeTolerance = 300; // 5 minutes
export class LogtoClient extends StandardLogtoClient {
    constructor(config) {
        const storage = Platform.OS === 'web'
            ? new BrowserStorage(config.appId)
            : new SecureStorage(`logto.${config.appId}`);
        const requester = createRequester(fetch);
        super({ prompt: [Prompt.Consent], ...config }, {
            requester,
            navigate: async (url, { redirectUri, for: purpose }) => {
                switch (purpose) {
                    case 'sign-in': {
                        this.authSessionResult = undefined;
                        this.authSessionResult = await WebBrowser.openAuthSessionAsync(url, redirectUri, {
                            preferEphemeralSession: config.preferEphemeralSession ?? true,
                            createTask: false,
                        });
                        break;
                    }
                    case 'sign-out': {
                        break;
                    }
                    default: {
                        throw new LogtoNativeClientError('navigation_purpose_not_supported');
                    }
                }
            },
            storage,
            generateCodeChallenge,
            generateCodeVerifier: generateRandomString,
            generateState: generateRandomString,
        }, (client) => ({
            // Due to the limitation of Expo, we could not verify JWT signature on the client side.
            // Thus we only decode the token and verify the claims here. The signature verification
            // may be done on the server side or in the future when the limitation is resolved.
            //
            // Limitations:
            // - Lack of support for the crypto module or Web Crypto API.
            // - Lack of support for native modules in the managed workflow.
            verifyIdToken: async (idToken) => {
                const { issuer } = await client.getOidcConfig();
                const claims = decodeIdToken(idToken);
                if (Math.abs(claims.iat - Date.now() / 1000) > issuedAtTimeTolerance) {
                    throw new LogtoError('id_token.invalid_iat');
                }
                if (claims.aud !== client.logtoConfig.appId || claims.iss !== issuer) {
                    throw new LogtoError('id_token.invalid_token');
                }
            },
        }));
        this.storage = storage;
    }
    async signIn(options, interactionMode) {
        await (typeof options === 'string'
            ? super.signIn(options, interactionMode)
            : super.signIn(options));
        if (this.authSessionResult?.type !== 'success') {
            throw new LogtoNativeClientError('auth_session_failed');
        }
        await this.handleSignInCallback(this.authSessionResult.url);
    }
    /**
     * Revokes all the tokens and cleans up the storage. By default, it will NOT open the browser
     * to start the sign-out flow for better user experience, and the `postLogoutRedirectUri` will
     * be ignored.
     */
    async signOut(postLogoutRedirectUri) {
        return super.signOut(postLogoutRedirectUri);
    }
}

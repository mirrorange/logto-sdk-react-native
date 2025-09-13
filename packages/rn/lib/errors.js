const logtoNativeClientErrorCodes = Object.freeze({
    auth_session_failed: 'User failed to finish the authentication session.',
    navigation_purpose_not_supported: 'The navigation purpose is not supported.',
});
export class LogtoNativeClientError extends Error {
    constructor(code, data) {
        super(logtoNativeClientErrorCodes[code]);
        this.name = 'LogtoNativeClientError';
        this.code = code;
        this.data = data;
    }
}

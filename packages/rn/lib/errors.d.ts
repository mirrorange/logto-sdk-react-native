declare const logtoNativeClientErrorCodes: Readonly<{
    auth_session_failed: "User failed to finish the authentication session.";
    navigation_purpose_not_supported: "The navigation purpose is not supported.";
}>;
export type LogtoNativeClientErrorCode = keyof typeof logtoNativeClientErrorCodes;
export declare class LogtoNativeClientError extends Error {
    name: string;
    code: LogtoNativeClientErrorCode;
    data: unknown;
    constructor(code: LogtoNativeClientErrorCode, data?: unknown);
}
export {};

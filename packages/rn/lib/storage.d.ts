import { type Storage, type StorageKey } from '@logto/client';
import type { Nullable } from '@silverhand/essentials';
/**
 * A secure storage implementation that uses `expo-secure-store` and
 * `@react-native-async-storage/async-storage`.
 *
 * It encrypts the value using the AES algorithm with a random key and stores the key in the secure
 * store. The encrypted value is stored in the async storage.
 *
 * @remarks
 * Due to the size limitation of the secure store (2048 bytes), we can only store the encryption
 * key in the secure store but not the value itself.
 *
 * @see {@link https://docs.expo.dev/versions/latest/sdk/securestore/}
 * @see {@link https://react-native-async-storage.github.io/async-storage/}
 */
export declare class SecureStorage implements Storage<string> {
    id: string;
    constructor(id: string);
    getStorageKey(key: string): string;
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
    protected encrypt(key: string, value: string): Promise<string>;
    protected decrypt(key: string, value: string): Promise<string | null>;
}
/**
 * This is a browser storage implementation that uses `localStorage` and `sessionStorage`.
 *
 * @remarks
 * Forked from @logto/browser/src/storage.ts
 * Since `expo-secure-store` doesn't support web, we need to use the browser's native storage.
 * @see {@link https://docs.expo.dev/versions/latest/sdk/securestore/}
 */
export declare class BrowserStorage implements Storage<StorageKey> {
    readonly appId: string;
    constructor(appId: string);
    getKey(item?: string): string;
    getItem(key: StorageKey): Promise<Nullable<string>>;
    setItem(key: StorageKey, value: string): Promise<void>;
    removeItem(key: StorageKey): Promise<void>;
}

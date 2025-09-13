import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoES from 'crypto-es';
import * as SecureStore from 'expo-secure-store';
import { generateRandomString } from './utils';
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
export class SecureStorage {
    constructor(id) {
        this.id = id;
    }
    getStorageKey(key) {
        return `${this.id}.${key}`;
    }
    async getItem(key) {
        const storageKey = this.getStorageKey(key);
        const encrypted = await AsyncStorage.getItem(storageKey);
        if (!encrypted) {
            return null;
        }
        return this.decrypt(storageKey, encrypted);
    }
    async setItem(key, value) {
        const storageKey = this.getStorageKey(key);
        const encrypted = await this.encrypt(storageKey, value);
        await AsyncStorage.setItem(storageKey, encrypted);
    }
    async removeItem(key) {
        const storageKey = this.getStorageKey(key);
        await Promise.all([
            AsyncStorage.removeItem(storageKey),
            SecureStore.deleteItemAsync(storageKey),
        ]);
    }
    async encrypt(key, value) {
        const encryptionKey = await generateRandomString();
        const encrypted = CryptoES.AES.encrypt(value, encryptionKey).toString();
        await SecureStore.setItemAsync(key, encryptionKey);
        return encrypted;
    }
    async decrypt(key, value) {
        const encryptionKey = await SecureStore.getItemAsync(key);
        if (!encryptionKey) {
            return null;
        }
        return CryptoES.AES.decrypt(value, encryptionKey).toString(CryptoES.enc.Utf8);
    }
}
const keyPrefix = `logto`;
/**
 * This is a browser storage implementation that uses `localStorage` and `sessionStorage`.
 *
 * @remarks
 * Forked from @logto/browser/src/storage.ts
 * Since `expo-secure-store` doesn't support web, we need to use the browser's native storage.
 * @see {@link https://docs.expo.dev/versions/latest/sdk/securestore/}
 */
export class BrowserStorage {
    constructor(appId) {
        this.appId = appId;
    }
    getKey(item) {
        if (item === undefined) {
            return `${keyPrefix}:${this.appId}`;
        }
        return `${keyPrefix}:${this.appId}:${item}`;
    }
    async getItem(key) {
        if (key === 'signInSession') {
            // The latter `getItem()` is for backward compatibility. Can be removed when major bump.
            return sessionStorage.getItem(this.getKey(key)) ?? sessionStorage.getItem(this.getKey());
        }
        return localStorage.getItem(this.getKey(key));
    }
    async setItem(key, value) {
        if (key === 'signInSession') {
            sessionStorage.setItem(this.getKey(key), value);
            return;
        }
        localStorage.setItem(this.getKey(key), value);
    }
    async removeItem(key) {
        if (key === 'signInSession') {
            sessionStorage.removeItem(this.getKey(key));
            return;
        }
        localStorage.removeItem(this.getKey(key));
    }
}

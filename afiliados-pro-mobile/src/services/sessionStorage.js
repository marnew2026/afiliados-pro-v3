import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "./apiEnvironment";

// Authentication belongs to one backend, including the Central's session.
const sessionKeys = new Set([
  "token", "userId", "email", "distributionToken", "distributionUserId",
]);
const prefix = `@afiliados-pro/session/${encodeURIComponent(API_BASE_URL)}/`;
const storageKey = (key) => sessionKeys.has(key) ? `${prefix}${key}` : key;

const sessionStorage = {
  getItem: (key) => AsyncStorage.getItem(storageKey(key)),
  setItem: (key, value) => AsyncStorage.setItem(storageKey(key), value),
  removeItem: (key) => AsyncStorage.removeItem(storageKey(key)),
  multiGet: async (keys) => {
    const entries = await AsyncStorage.multiGet(keys.map(storageKey));
    return entries.map((entry, index) => [keys[index], entry[1]]);
  },
  multiSet: (entries) => AsyncStorage.multiSet(
    entries.map(([key, value]) => [storageKey(key), value])
  ),
  multiRemove: (keys) => AsyncStorage.multiRemove(keys.map(storageKey)),
};

export default sessionStorage;

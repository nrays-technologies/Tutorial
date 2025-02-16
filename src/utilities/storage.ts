import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageKey = {
  tokenFIR: 'kToken',
  authToken: 'kAuthToken',
  user: 'kUser',
  
  
};

const storeValue = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

const getValue = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return value;
    }
    return null;
  } catch (e) {
    // error reading value
    return null;
  }
};

const storeObjectData = async (key: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

const getObjectData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    return null;
  }
};

const clearStorage = async () => {
  try {
    await AsyncStorage.multiRemove([StorageKey.searchOld]);
  } catch (e) {
    // clear error
  }
};

const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }
};

export {
  storeValue,
  getValue,
  storeObjectData,
  getObjectData,
  clearAll,
  clearStorage,
  StorageKey
};

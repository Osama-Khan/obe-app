import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'token';

class StorageService {
  setToken = (token: string) => AsyncStorage.setItem(TOKEN_KEY, token);
  getToken = () => AsyncStorage.getItem(TOKEN_KEY);
  clearToken = () => AsyncStorage.removeItem(TOKEN_KEY);
}

export default new StorageService();

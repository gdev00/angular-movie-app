export class LocalStorageUtil {
    static setItem<T>(key: string, value: T): void {
      localStorage.setItem(key, JSON.stringify(value));
    }
  
    static getItem<T>(key: string): T | null {
      const storedItem = localStorage.getItem(key);
      return storedItem ? JSON.parse(storedItem) as T : null;
    }
}
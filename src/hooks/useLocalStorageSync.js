import { useEffect } from 'react';
import { saveToStorage } from '../utils/storage';

export default function useLocalStorageSync(key, value) {
  useEffect(() => { saveToStorage(key, value); }, [key, value]);
}

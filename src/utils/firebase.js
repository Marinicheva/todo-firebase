import { initializeApp } from 'firebase/app';
import { getDatabase  } from 'firebase/database';
import { getStorage } from "firebase/storage";

import { firebaseConfig } from './constants';

/* Подключаемся к firebase*/
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

export { db, storage};

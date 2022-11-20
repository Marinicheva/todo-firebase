import { initializeApp } from 'firebase/app';
import { getDatabase  } from 'firebase/database';

import { firebaseConfig } from './constants';

/* Подключаемся к firebase*/
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;

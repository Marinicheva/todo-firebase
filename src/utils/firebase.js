import { initializeApp } from 'firebase/app';
import { getDatabase, ref  } from 'firebase/database';

import { firebaseConfig } from './constants';

/* Подключаемся к firebase*/
const app = initializeApp(firebaseConfig);
const db = ref(getDatabase(app));

export default db;

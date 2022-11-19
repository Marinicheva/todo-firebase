import { useEffect, useState } from 'react';
import db from '../../utils/firebase';
import { ref, push, onValue } from "firebase/database";

import TaskForm from '../TaskForm/TaskForm';
import Task from '../Task/Task';

import tasks from '../../taskdb';

function App() {

  const [forRender, setForRender] = useState([]);

  // Рендер задач из БД
  useEffect(() => {
    const tasks = ref(db, 'tasks');
    onValue(tasks, (snapshot) => {
      const s = snapshot.val();
      console.log(s);
    })
  }, [])

  console.log(forRender);
  

  // Добавляем запись в БД
  const onAddTask = async (data) => {

    if (!data) return Promise.reject('Nothing get');
    push(ref(db, 'tasks'), { complited: false, ...data })
      .then(() => {
        // Мб всплывающее уведомление о добавлении
        console.log('send')
      })
      .catch((err) => {
        // Уведомление о фейле
        console.dir(err)
      });

  }

  return (
    <div className="app">
      <h1 className="app__title">ToDo List</h1>
      <TaskForm onAddTask={onAddTask} />

      <div className="task__container">
        <ul className="task__list">
          {
            forRender.map((item, i) => {
              return (
                <Task
                  key={i}
                  {...item}
                />
              );
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default App;

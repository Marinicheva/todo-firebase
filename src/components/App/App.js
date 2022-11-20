import { useEffect, useState } from 'react';
import db from '../../utils/firebase';
import { ref, push, get, remove } from "firebase/database";

import TaskForm from '../TaskForm/TaskForm';
import Task from '../Task/Task';

function App() {

  const [forRender, setForRender] = useState([]);

  // Рендер задач из БД

  useEffect(() => {
    // TODO: Ниже повторяющийся код. Применить принцип DRY
    const arr = [];

    get(ref(db, 'tasks'))
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          const key = childSnapshot.key;
          const data = childSnapshot.val();

          arr.push({ id: key, ...data });
        });

        setForRender(arr.reverse());
      });
  }, []);

  // Добавляем запись в БД
  const onAddTask = (data) => {

    if (!data) return Promise.reject('Nothing get');


    push(ref(db, 'tasks'), { complited: false, ...data })
      .then(() => {
        // Мб всплывающее уведомление о добавлении
        // TODO: Ниже повторяющийся код. Применить принцип DRY
        
        get(ref(db, 'tasks'))
          .then(snapshot => {
            const arr = [];
            snapshot.forEach(childSnapshot => {
              const key = childSnapshot.key;
              const data = childSnapshot.val();

              arr.push({ id: key, ...data });
            });

            setForRender(arr.reverse());
          });
        console.log('send')
      })
      .catch((err) => {
        // Уведомление о фейле
        console.dir(err)
      });
  }

  const onDeleteTask = (id) => {
    remove(ref(db, 'tasks/' + id))
      .then(() => {
        get(ref(db, 'tasks'))
          .then(snapshot => {
            const arr = [];
            snapshot.forEach(childSnapshot => {
              const key = childSnapshot.key;
              const data = childSnapshot.val();

              arr.push({ id: key, ...data });
            });

            setForRender(arr.reverse());
          });
      console.log('delete');
      });
  }

  return (
    <div className="app">
      <h1 className="app__title">ToDo List</h1>
      <TaskForm onAddTask={onAddTask} />

      <div className="task__container">
        <ul className="task__list">
          {
            forRender.map((item) => {
              return (
                <Task
                  key={item.id}
                  {...item}
                  onDeleteTask={onDeleteTask}
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

import { useEffect, useState } from 'react';
import db from '../../utils/firebase';
import { ref, push, get, remove, update } from "firebase/database";

import TaskForm from '../TaskForm/TaskForm';
import Task from '../Task/Task';
import FullTaskPopup from '../FullTaskPopup/FullTaskPopup';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [openedTask, setIsOpenedTask] = useState(null);
  // TODO: Изменить названия этих стейтов ниже
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

    if (!data || data.text === '') return Promise.reject('Nothing get');

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

  // Удаляем таску
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

  // Отметить таску выполненной
  const onDoneTask = (id, data) => {
     update(ref(db, 'tasks/' + id), data)
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
        console.log('task is done');
      });
  }

  // Редактирование таски
  const onUpdateTask = (id, data) => {
    update(ref(db, 'tasks/' + id), data)
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
        console.log('task is update');
      });
  }

  const onOpenTaskPopup = (id) => {
    const openedTask = forRender.find(item => item.id === id);
    setIsOpenedTask(openedTask)
    setIsPopupOpen(true);
  }

  const onCloseTaskPopup = () => {
    setIsPopupOpen(false);
    setIsOpenedTask(null)
  }

  return (
    <div className="app">
      <h1 className="app__title">ToDo List</h1>
      <div className='add-task'>
        <TaskForm onAddTask={onAddTask} onSubmitEditTaskForm={onUpdateTask} />
      </div>
      
      <div className="task__container">
        <ul className="task__list">
          {
            forRender.map((item) => {
              return (
                <Task
                  key={item.id}
                  {...item}
                  onOpenTask={onOpenTaskPopup}
                  onDeleteTask={onDeleteTask}
                  onDoneTask={onDoneTask}
                  onUpdateTask={onUpdateTask}
                />
              );
            })
          }
        </ul>
      </div>
      <FullTaskPopup {...openedTask} isOpen={isPopupOpen} onClose={onCloseTaskPopup} />
    </div>
  );
}

export default App;

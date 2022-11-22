import { useCallback, useEffect, useState } from 'react';
import db from '../../utils/firebase';
import { ref, push, get, remove, update } from "firebase/database";

import TaskForm from '../TaskForm/TaskForm';
import Task from '../Task/Task';
import FullTaskPopup from '../FullTaskPopup/FullTaskPopup';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [openedTask, setIsOpenedTask] = useState(null);
  // TODO: Изменить названия этих стейтов ниже
  const [tasks, setTasks] = useState([]);

  const getTasks = useCallback(() => {
    const arr = [];

    get(ref(db, 'tasks'))
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          const key = childSnapshot.key;
          const data = childSnapshot.val();

          arr.push({ id: key, ...data });
        });

        setTasks(arr.reverse());
      });
  }, []);

  // Рендер задач из БД
  useEffect(() => getTasks(), [getTasks]);

  // Добавляем запись в БД
  const onAddTask = (data) => {

    if (!data || data.text === '') return Promise.reject('Nothing get');

    push(ref(db, 'tasks'), { complited: false, ...data })
      .then(() => {
        // Мб всплывающее уведомление о добавлении
        getTasks();
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
        getTasks();
        console.log('delete');
      });
  }

  // Отметить таску выполненной
  const onDoneTask = (id, data) => {
     update(ref(db, 'tasks/' + id), data)
      .then(() => {
        getTasks();
        console.log('task is done');
      });
  }

  // Редактирование таски
  const onUpdateTask = (id, data) => {
    update(ref(db, 'tasks/' + id), data)
      .then(() => {
        getTasks();
        console.log('task is update');
      });
  }

  const onOpenTaskPopup = (id) => {
    const openedTask = tasks.find(item => item.id === id);
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
            tasks.map((item) => {
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

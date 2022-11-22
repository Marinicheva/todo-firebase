import { useCallback, useEffect, useState } from 'react';
import { db, storage } from '../../utils/firebase';
import { ref as dbRef, push, get, remove, update } from "firebase/database";
import { ref as storageRef, uploadBytes } from "firebase/storage";

import TaskForm from '../TaskForm/TaskForm';
import Task from '../Task/Task';
import FullTaskPopup from '../FullTaskPopup/FullTaskPopup';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [openedTask, setIsOpenedTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  const getTasks = useCallback(() => {
    const arr = [];

    get(dbRef(db, 'tasks'))
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          const key = childSnapshot.key;
          const data = childSnapshot.val();

          arr.push({ id: key, ...data });
        });

        setTasks(arr.reverse());
      });
  }, []);

  // TODO: Пробую получить файл из firebase
  // Files list
  // const fileRef = storageRef(storage, '/taks/id');

  // listAll(fileRef).then((res) => {
  //   res.items.forEach((itemRef) => {
  //     // console.log(itemRef);
  //   });
  // });

  // Download files to firebase
  const uploadFiles = (data, task) => {

    for (let file of data.files) {
      let fileRef = storageRef(storage, `/task/${task.key}/${file.name}`);
      uploadBytes(fileRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
      });

    }
  }


  // Рендер задач из БД
  useEffect(() => getTasks(), [getTasks]);

  // Добавляем запись в БД
  const onAddTask = (data) => {
    console.log(data);

    if (!data || data.text === '') return Promise.reject('Nothing get');

    push(dbRef(db, 'tasks'), { complited: false, ...data })
      .then((task) => {
        // Мб всплывающее уведомление о добавлении
        uploadFiles(data, task)
        console.log(task.key);
        console.log('send')
      })
      .then(() => {
        getTasks();
      })
      .catch((err) => {
        // Уведомление о фейле
        console.dir(err)
      });
  }

  // Удаляем таску
  const onDeleteTask = (id) => {
    remove(dbRef(db, 'tasks/' + id))
      .then(() => {
        getTasks();
        console.log('delete');
      });
  }

  // Отметить таску выполненной
  const onDoneTask = (id, data) => {
     update(dbRef(dbRef, 'tasks/' + id), data)
      .then(() => {
        getTasks();
        console.log('task is done');
      });
  }

  // Редактирование таски
  const onUpdateTask = (id, data) => {
    update(dbRef(dbRef, 'tasks/' + id), data)
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

import { useCallback, useEffect, useState } from 'react';
import { db, storage } from '../../utils/firebase';
import { ref as dbRef, push, get, remove, update } from "firebase/database";
import { ref as storageRef, uploadBytes, listAll } from "firebase/storage";

import TaskForm from '../TaskForm/TaskForm';
import Task from '../Task/Task';
import FullTaskPopup from '../FullTaskPopup/FullTaskPopup';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [openedTask, setIsOpenedTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  // Функция получения задач из Firebase Realtime Database
  const getTasks = useCallback(() => {
    const arr = [];

    get(dbRef(db, 'tasks'))
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          // Добавляем уникальный ID задачи
          const key = childSnapshot.key;
          const data = childSnapshot.val();

          // Если ключ isAddFiles равен true записываем в поле files имена файлов, иначе поле добавлять не нужно
          if (data.isAddFiles) {
            data.files = getFilesList(key);
          }

          // Добавляем каждую задачу в массив стейта для последующего рендера
          arr.push({ id: key, ...data });
        });

        setTasks(arr.reverse());
      });
  }, []);

  // Рендер задач из Firebase Realtime Database при первом монтировании компонента
  useEffect(() => getTasks(), [getTasks]);

  // Функция получения списка приложенных файлов
  const getFilesList = (id) => {

    const fileRef = storageRef(storage, `task/${id}/`);
    const files = [];

    // Получаем список всех файлов в директории с именем равным ID карточки
    listAll(fileRef).then((res) => {
      res.items.forEach((itemRef) => {
        files.push(itemRef.name);
      });
    });

    // Возвращаем массиа имен файлов для записи в соответствующее поле экземпляра задачи
    return files;
  }

  // Функция загрузки файлов в Firebase Storage
  const uploadFiles = (data, task) => {

    for (let file of data.files) {
      // Для каждого файла создаем ссылку для записи в формате /task/ID-задачи, к которой относится файл/имя файла
      let fileRef = storageRef(storage, `/task/${task.key}/${file.name}`);
      uploadBytes(fileRef, file).then((snapshot) => {
        console.log('Uploaded file!');
      });

    }
  }

  // Функция добавления новой задачи
  const onAddTask = (data) => {
    // Дополняем данные из формы создания полем с отметкой об исполнении (новая задача всегда не выполнена)
    push(dbRef(db, 'tasks'), { complited: false, ...data })
      .then((task) => {
        // Мб всплывающее уведомление о добавлении
        // После добавления задачи загружаем файлы в Firebase Storage, если они есть
        if (data.files) {
          uploadFiles(data, task);
        }

        console.log('Task is send');
      })
      .then(() => {
        // Получаем актуальный список задач из Firebase Realtime Database для их отображения
        getTasks();
      })
      .catch((err) => {
        // Уведомление о фейле
        console.err(err)
      });
  }

  // Функция удаления задачи
  const onDeleteTask = (id) => {

    remove(dbRef(db, 'tasks/' + id))
      .then(() => {
        // Получаем актуальный список задач из Firebase Realtime Database для их отображения
        getTasks();
        console.log('Task is delete');
      });
  }

  // Функция установления отметки о выполнении задачи
  const onDoneTask = (id, data) => {
    update(dbRef(db, 'tasks/' + id), data)
      .then(() => {
        // Получаем актуальный список задач из Firebase Realtime Database для их отображения
        getTasks();
        console.log('Task is done');
      });
  }

  // Функция редактирования задачи
  const onUpdateTask = (id, data) => {
    update(dbRef(db, 'tasks/' + id), data)
      .then(() => {
        // Получаем актуальный список задач из Firebase Realtime Database для их отображения
        getTasks();
        console.log('Task is update');
      });
  }

  // Функция открытия попапа с просмотром задачи
  const onOpenTaskPopup = (id) => {
    const openedTask = tasks.find(item => item.id === id);
    setIsOpenedTask(openedTask)
    setIsPopupOpen(true);
  }

  // Функция закрытия попапа с просмотром задачи
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
      <FullTaskPopup
        {...openedTask}
        isOpen={isPopupOpen}
        onClose={onCloseTaskPopup}
      />
    </div>
  );
}

export default App;

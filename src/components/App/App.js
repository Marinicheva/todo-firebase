import { useState } from 'react';

import AddTaskPopup from '../AddTaskPopup/AddTaskPopup';
import FullTaskPopup from '../FullTaskPopup/FullTaskPopup';
import Task from '../Task/Task';

import tasks from '../../taskdb'; 

function App() {
  const defaultFullTask = {title: '', text: ''};

  const [ isAddTaskPopupOpen, setIsAddTaskPopupOpen ] = useState(false);
  const [ isFullTaskPopupOpen, setIsFullTaskPopupOpen ] = useState(false);
  const [fullTask, setFullTask] = useState(defaultFullTask);

  const handleOpenAddTask = () => {
    setIsAddTaskPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsAddTaskPopupOpen(false);
    setIsFullTaskPopupOpen(false);
  }

  const handleClickTask = (data) => {
    setIsFullTaskPopupOpen(true);
    setFullTask(data);
  }

  return (
    <div className="app">
      <h1 className="app__title">ToDo List</h1>
      <button className="app__new-task" onClick={handleOpenAddTask}>
        Новая задача
        <svg className="app__new-task-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g id="Layer_1" data-name="Layer 1">
            <path d="m10 22h-8v-8h8zm.5-9h-9a.5.5 0 0 0 -.5.5v9a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0 -.5-.5z"></path>
            <path d="m10 10h-8v-8h8zm.5-9h-9a.5.5 0 0 0 -.5.5v9a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0 -.5-.5z"></path>
            <path d="m22 10h-8v-8h8zm.5-9h-9a.5.5 0 0 0 -.5.5v9a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0 -.5-.5z"></path>
            <path d="m22.5 17.5h-4v-4a.5.5 0 0 0 -1 0v4h-4a.5.5 0 0 0 0 1h4v4a.5.5 0 0 0 1 0v-4h4a.5.5 0 0 0 0-1z"></path>
          </g>
        </svg>
      </button>
      <div className="task__container">
        <ul className="task__list">
          {
            tasks.map((item, i) => {
              return <Task key={i} title={item.title} text={item.text} onClickTask={(data) => handleClickTask(data)} />
            })
          }
        </ul>
      </div>
      <AddTaskPopup isOpen={isAddTaskPopupOpen} onClose={closeAllPopups}/>
      <FullTaskPopup isOpen={isFullTaskPopupOpen} onClose={closeAllPopups} {...fullTask}/>
    </div>
  );
}

export default App;

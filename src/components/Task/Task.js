import { useState } from 'react';

import EditTask from '../EditTask/EditTask';

const Task = ({ id, text, date, complited, onDeleteTask, onDoneTask }) => {

  const [isTaskDone, setIsTaskDone] = useState(complited);
  const [isTaskEdit, setIsTaskEdit] = useState(false);

  let classNames = `task__item ${isTaskDone ? 'task__item_done' : ''}`;
  const nowDate = new Date();

  if (nowDate > new Date(date) && !isTaskDone) {
    classNames += 'task__item_expired'
  }

  const handleClickDone = () => {
    if (!isTaskDone) {
      setIsTaskDone(true);
      onDoneTask(id, { complited: true });
    }
  }

  const handleDeleteTask = () => {
    onDeleteTask(id);
  }

  const onEditTask = () => {
    setIsTaskEdit(true);
  }

  const onCancelEditTask = () => {
    setIsTaskEdit(false);
  }


  if( isTaskEdit ) {
    return (
      <EditTask text={text} date={date} onCancelEditTask={onCancelEditTask} />
    );
  }

  return (
    <li className={classNames}>
      <p className="task__text">{text}</p>
      <div className="task__btns">
        <button className="task__btn task__btn-edit" onClick={onEditTask} disabled={isTaskDone}>
          <svg
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            width="100px"
            height="100px"
          >
            <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z" />
          </svg>
        </button>
        <button className=" task__btn task__delete-btn" onClick={handleDeleteTask}>
          <svg
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30" width="100px"
            height="100px"
          >
            <path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z" />
          </svg>
        </button>
        <button className="task__btn task__done-btn" onClick={handleClickDone}>
          <svg
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="100px"
            height="100px"
          >
            <path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z" />
          </svg>
        </button>
      </div>
      <div className="task__footer">
        <p className="task__date">Плановая дата: {date}</p>
      </div>
    </li>
  )
}

export default Task
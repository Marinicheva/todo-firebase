import React from 'react';
import './AddForm.less';

const AddForm = () => {
  return (
    <form className="add-task-form form">
      <label className='form__label' htmlFor="task-name">Имя задачи
        <input className='form__input' id="task-name" placeholder="Введите имя задачи" type="text" />
      </label>

      <label className='form__label' htmlFor="task-text">Текст задачи
        <textarea className='form__textarea' id="task-text" placeholder="Введите текст задачи" />
      </label>
      <button type="submit">Добавить задачу</button>
    </form>
  )
}

export default AddForm
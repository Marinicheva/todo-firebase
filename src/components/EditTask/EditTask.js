import {useEffect, useState} from 'react'

const EditTask = ({text, date, onCancelEditTask}) => {
  const [taskText, setTaskText] = useState('');
  const [taskDate, setTaskDate] =useState('');

  useEffect(() => {
    setTaskText(text);
    setTaskDate(date)
  }, [text, date]);

  const handleChangeText = (evt) => {
    setTaskText(evt.target.value);
  }

  const handleChangeDate = (evt) => {
    setTaskDate(evt.target.value);
  }
  
  return (
    <li className='task__item'>
      <form className="add-task-form form">
        <input
          className='form__field'
          value={taskText}
          id="name"
          placeholder="Введите задачу..."
          type="text"
          onChange={(evt) => {handleChangeText(evt)}}
        />

        <input
          className='form__field form__date'
          value={taskDate}
          type="date"
          id="date"
          onChange={(evt) => {handleChangeDate(evt)}}
        />

        <label className='form__label form__label-file' htmlFor="task-file">
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 60 60"
          >
            <g>
              <path d="M45.5,34c-7.168,0-13,5.832-13,13s5.832,13,13,13s13-5.832,13-13S52.668,34,45.5,34z M45.5,58c-6.065,0-11-4.935-11-11s4.935-11,11-11s11,4.935,11,11S51.565,58,45.5,58z" />
              <path d="M50.679,41.429l-5.596,8.04l-3.949-3.242c-0.426-0.351-1.057-0.288-1.407,0.139c-0.351,0.427-0.289,1.057,0.139,1.407l4.786,3.929c0.18,0.147,0.404,0.227,0.634,0.227c0.045,0,0.091-0.003,0.137-0.009c0.276-0.039,0.524-0.19,0.684-0.419l6.214-8.929c0.315-0.453,0.204-1.077-0.25-1.392C51.617,40.863,50.995,40.976,50.679,41.429z" />
              <path d="M29.551,48H12.5c-0.552,0-1-0.447-1-1s0.448-1,1-1h17.051c0.133-2.142,0.687-4.167,1.584-6H12.5c-0.552,0-1-0.447-1-1s0.448-1,1-1h19.782c2.884-4.222,7.732-7,13.218-7c1.026,0,2.027,0.106,3,0.292V14.586L33.914,0H1.5v60h34.708C32.41,57.278,29.859,52.943,29.551,48z M34.5,4l10,10h-10V4z M12.5,14h10c0.552,0,1,0.447,1,1s-0.448,1-1,1h-10c-0.552,0-1-0.447-1-1S11.948,14,12.5,14z M12.5,22h25c0.552,0,1,0.447,1,1s-0.448,1-1,1h-25c-0.552,0-1-0.447-1-1S11.948,22,12.5,22z M12.5,30h25c0.552,0,1,0.447,1,1s-0.448,1-1,1h-25c-0.552,0-1-0.447-1-1S11.948,30,12.5,30z" />
            </g>

          </svg>
          <input
            className='form__field form__file'
            id="file"
            type="file" />
        </label>

        <button
          className='form__btn'
          type="submit"
        >
          Сохранить
        </button>
        <button
          className='form__btn'
          onClick={onCancelEditTask}
        >
          Отменить
        </button>
      </form>
    </li>
  )
}

export default EditTask
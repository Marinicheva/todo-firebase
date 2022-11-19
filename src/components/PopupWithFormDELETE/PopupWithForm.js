const PopupWithForm = ({ isOpen, onClose, formType, task, onChangeFields }) => {
  const classNames = `popup ${isOpen ? 'popup_opened' : ''}`;

  const handleChangeField = (evt) => {
    onChangeFields(evt.target.id = evt.target.value);
  }

  return (
    <div className={classNames}>
      <div className="popup__container">
        <button className="popup__close-btn" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="25px"
            height="25px">
            <path
              d="M21.5 4.5H26.501V43.5H21.5z"
              transform="rotate(45.001 24 24)"
            />
            <path
              d="M21.5 4.5H26.5V43.501H21.5z"
              transform="rotate(135.008 24 24)"
            />
          </svg>
        </button>
        
      </div>
    </div>
  )
}

export default PopupWithForm;

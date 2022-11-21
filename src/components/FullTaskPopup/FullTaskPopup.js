import { useRef } from "react";

const FullTaskPopup = ({ title, text, date, onClose, isOpen }) => {
  const classNames = `popup ${isOpen ? 'popup_opened' : ''}`;
  const overlay = useRef();

  const handleCloseClickByOverlay = (evt) => {
    console.log()
    if(evt.target === overlay.current) {
      onClose();
    }
  }

  return (
    <div ref={overlay} className={classNames} onClick={(evt) => handleCloseClickByOverlay(evt)}>
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
        <h2 className="popup__title">{title}</h2>
        <p className="popup__text">{text}</p>
        <div className="popup__footer">
          <p className="popup__date">Плановая дата: {date}</p>
        </div>
      </div>
    </div>
  )
}

export default FullTaskPopup
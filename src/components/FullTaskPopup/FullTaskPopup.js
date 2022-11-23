import { useRef, useState } from "react";

const FullTaskPopup = ({
  title,
  text,
  date,
  isAddFiles,
  files,
  onClose,
  isOpen,
}) => {

  const [isShowFiles, setIsShowFiles] = useState(false);
  const overlay = useRef();

  const popupClassNames = `popup ${isOpen ? 'popup_opened' : ''}`;
  const filesContainerClassName = isShowFiles ? "popup__files-container_show" : "popup__files-container";

  // Функция закрытия попапа по оверлею
  const handleCloseClickByOverlay = (evt) => {
    console.log()
    if (evt.target === overlay.current) {
      onClose();
    }
  }

  // Просмотр списка прикрепленных файлов
  const handleShowFiles = () => {
    console.log(files);
    setIsShowFiles(state => !state);
  }

  return (
    <div ref={overlay} className={popupClassNames} onClick={(evt) => handleCloseClickByOverlay(evt)}>
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

          {isAddFiles &&
            (
              <div className="popup__files">
                <button
                  className="popup__show-files-btn"
                  onClick={handleShowFiles}
                >
                  Файлы к текущей задаче
                </button>
                <div className={filesContainerClassName}>
                  { files.map((item, i) => (<p key={i} className="popup__attached-files">{item}</p>)) }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default FullTaskPopup
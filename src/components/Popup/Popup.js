import React from 'react'

const Popup = (props) => {
  return (
    <div className="popup">
      <div className="popup__container">
        <button className="popup__close-btn">
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
        {props.children ? props.children : <><h2 className="popup__title">props.text</h2></>}
      </div>
    </div>
  )
}

export default Popup;

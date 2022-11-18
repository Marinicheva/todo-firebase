import React from 'react'

const Popup = (props) => {
  return (
    <div className="popup">
      <div className="popup__container">
        <button className="popup__close-btn">
          
        </button>
        { props.children ? props.children : <><h2 className="popup__title">props.text</h2></> } 
      </div>
    </div>
  )
}

export default Popup;

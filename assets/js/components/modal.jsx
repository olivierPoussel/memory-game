import React, { Fragment, useState } from 'react';
import '../../styles/modal.css'

// Composant pour afficher une popup avec un texte personnalisé
const Modal = (props) => {
    const [show, setShow] = useState(true);
    const handleClick = () => {
        setShow(false);
    }
    return (
        <Fragment>
            <div className={`modal-overlay ${show ? '': 'closed'}`}></div>
            <div className={`modal ${show ? '': 'closed'}`}>
                <p>{props.text}</p>
                <button onClick={handleClick} className="close-button">Ok</button>
            </div>
        </Fragment>
    );
}

export default Modal;
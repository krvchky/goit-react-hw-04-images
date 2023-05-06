import PropTypes  from "prop-types";
import css from './Modal.module.css';
import { createPortal } from "react-dom";
import { useEffect } from "react";

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ largeImageURL, onClose }) => {
useEffect(() => {
window.addEventListener('keydown', handleKeyDown);

return () => {
window.removeEventListener('keydown', handleKeyDown);
};
});

const handleKeyDown = evt => {
if (evt.code === 'Escape') {
onClose();
}
};

const handleBackDropClick = evt => {
if (evt.currentTarget === evt.target) {
onClose();
}
};


return createPortal (
<div className={css.overlay} onClick={handleBackDropClick}>
<div className={css.modal}>
<img src={largeImageURL} alt=""/>
</div>
</div>,
modalRoot
);
}


Modal.propTypes = {
onClose: PropTypes.func.isRequired,
largeImageURL: PropTypes.string.isRequired,
};

export default Modal;

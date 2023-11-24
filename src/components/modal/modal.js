import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modalOverlay/modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById("react-modals");

const Modal = ({ title, children, onClose }) => {

  const handleEscClose = (evt) => {
    if (evt.key === "Escape") onClose();
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  })

  return createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={styles['modal']}>
        <div className={styles['title-wrap']}>
          {typeof title === 'string' ? (
            <h2 className={`${styles.title} text text_type_main-large`}>
              {title}
            </h2>
          ) : (
            <div></div>
          )}
          <CloseIcon type='primary' className={styles['btn-close']} onClick={onClose}/>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modalOverlay/modal-overlay';
import styles from './modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('react-modals');

const Modal = ({ title, children, onClose }) => {
  const handleEscClose = (evt) => {
    if (evt.key === 'Escape') onClose();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  });

  return createPortal(
    <>
      <div className={styles['modal-wrap']}>
        <div className={styles['modal']}>
          <div className={styles['title-wrap']}>
            {title ? (
              <h2 className={`${styles.title} text text_type_main-large`}>
                {title}
              </h2>
            ) : (
              <div></div>
            )}
            <CloseIcon
              type='primary'
              className={styles['btn-close']}
              onClick={onClose}
            />
          </div>
          {children}
        </div>
      <ModalOverlay onClose={onClose} />
      </div>
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
  onClose: PropTypes.func,
};

export default Modal;

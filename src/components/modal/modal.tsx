import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modalOverlay/modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals') as HTMLElement;

type IModal = {
  title?: string,
  children: JSX.Element,
  handleModalClose: () => void,
}

const Modal = ({ title, children, handleModalClose }: IModal): JSX.Element => {

  const handleEscClose = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') handleModalClose();
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
              onClick={handleModalClose}
            />
          </div>
          {children}
        </div>
      <ModalOverlay onClose={handleModalClose} />
      </div>
    </>,
    modalRoot
  );
};

export default Modal;

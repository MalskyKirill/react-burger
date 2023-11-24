import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modalOverlay/modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById("react-modals");

const Modal = ({ title, children }) => {
  return createPortal(
    <ModalOverlay>
      <div className={styles['modal']}>
        <div className={styles['title-wrap']}>
          {typeof title === 'string' ? (
            <h2 className={`${styles.title} text text_type_main-large`}>
              {title}
            </h2>
          ) : (
            <div></div>
          )}
          <CloseIcon type='primary' className={styles['btn-close']} />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;

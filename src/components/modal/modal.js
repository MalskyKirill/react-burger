import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modalOverlay/modal-overlay';
import styles from './modal.module.css';

const Modal = ({ title, children }) => {
  return (
    <ModalOverlay>
      <div className={styles['modal']}>
        <div className={styles['title-wrap']}>
          {typeof title === 'string' ? (
            <h2 className={`${styles.title} ttext text_type_main-medium`}>
              Детали ингредиента
            </h2>
          ) : (
            <div></div>
          )}
          <CloseIcon type='primary' className={styles['btn-close']} />
        </div>
        {children}
      </div>
    </ModalOverlay>
  );
};

export default Modal;

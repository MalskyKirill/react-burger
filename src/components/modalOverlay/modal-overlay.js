import styles from './modal-overlay.module.css';

const ModalOverlay = ({children, onClose}) => {

  const onClickOverlay = (evt) => {
    if(evt.target.id === 'overlay') onClose()
  }

  return(
    <div id='overlay' onClick={onClickOverlay} className={styles['modal-overlay']}>{children}</div>
  );
}

export default ModalOverlay;

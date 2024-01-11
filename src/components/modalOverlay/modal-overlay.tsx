import styles from './modal-overlay.module.css';

type TModalOverlay = {
  onClose: () => void
}

const ModalOverlay = ({onClose}: TModalOverlay): JSX.Element => {

  return(
    <div id='overlay' onClick={onClose} className={styles['modal-overlay']}></div>
  );
}

export default ModalOverlay;

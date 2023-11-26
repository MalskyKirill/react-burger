import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({onClose}) => {

  return(
    <div id='overlay' onClick={onClose} className={styles['modal-overlay']}></div>
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
}

export default ModalOverlay;

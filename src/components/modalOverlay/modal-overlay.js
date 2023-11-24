import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({children, onClose}) => {

  const onClickOverlay = (evt) => {
    if(evt.target.id === 'overlay') onClose()
  }

  return(
    <div id='overlay' onClick={onClickOverlay} className={styles['modal-overlay']}>{children}</div>
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.element,
}

export default ModalOverlay;

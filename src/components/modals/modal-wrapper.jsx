import clsx from 'clsx';
import CountdownTimer from '../timer/timer-countdown/timer-countdown';
import './modal.scss';

function ModalWrapper({ title, timer, className, children, onCancel }) {
  if (!onCancel) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className={clsx('modal', className)}>
        <div className="modal__title-container">
          <div className="title-timer">
            <h3 className="modal__title-container_title">{title}</h3>
            {timer && (
              <CountdownTimer
                time={15}
                timeClassName="colored"
                small="v-small"
                inLobby
              />
            )}
          </div>
          <button
            className="modal__title-container_close-btn"
            onClick={onCancel}
          />
        </div>
        {children}
      </div>
    </div>
  );
}

export default ModalWrapper;

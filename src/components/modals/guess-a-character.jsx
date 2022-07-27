import { useState, useEffect } from 'react';
import CountdownTimer from '../timer/timer-countdown/timer-countdown';
import Btn from '../btn/btn';
import checkGuess from '../../helper-functions/check-guess.js';
import './modal.scss';
import ModalWrapper from './modal-wrapper';

function GuessCharacterModal({ active, onSubmit, onCancel, timer }) {
  // const { gameData, resetData, playerId } = useContext(GameDataContext);
  const [guess, setGuess] = useState('');
  // const navigate = useNavigate();

  // const onTimerFinish = useCallback(async () => {
  //   try {
  //     resetData();
  //     navigate(INACTIVE);
  //     await leaveGame(playerId, gameData.id);
  //   } catch {
  //     resetData();
  //     navigate(INACTIVE);
  //   }
  // }, [playerId, gameData.id, resetData, navigate]);

  useEffect(() => {
    return () => setGuess('');
  }, [active]);

  if (!active) {
    return null;
  }

  return (
    <ModalWrapper title="READY TO GUESS?" onCancel={onCancel}>
      <form className="modal-form" onSubmit={(event) => onSubmit(event, guess)}>
        <div className="modal__timer-container">
          <p className="modal__timer-container_name">TIME LEFT</p>
          <CountdownTimer
            time={timer || 60}
            inLobby={'in-lobby'}
            small={'v-small'}
          />
        </div>
        <input
          className="modal__input-field"
          type="text"
          placeholder="Enter your guess"
          value={guess}
          onChange={(e) => {
            setGuess(e.target.value);
          }}
        />
        <Btn
          className="btn-yellow-solid"
          disabled={checkGuess(guess)}
          type="submit"
        >
          I WANT TO GUESS
        </Btn>
      </form>
    </ModalWrapper>
  );
}

export default GuessCharacterModal;

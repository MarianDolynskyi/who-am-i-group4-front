import { useState, useEffect, useContext } from 'react';
import CountdownTimer from '../timer/timer-countdown/timer-countdown';
import Btn from '../btn/btn';
import checkGuess from '../../helper-functions/check-guess.js';
import './modal.scss';
import ModalWrapper from './modal-wrapper';
import { useCallback } from 'react';
import { leaveGame } from '../../services/games-service';
import { INACTIVE } from '../../constants/constants';
import GameDataContext from '../../contexts/game-data-context';
import { useNavigate } from 'react-router-dom';

function GuessCharacterModal({ active, onSubmit, onCancel, timer, setTimer }) {
  const { gameData, resetData, playerId } = useContext(GameDataContext);
  const [guess, setGuess] = useState('');
  const navigate = useNavigate();

  const onTimerFinish = useCallback(async () => {
    try {
      await leaveGame(playerId, gameData.id);
      resetData();
      navigate(INACTIVE);
    } catch {
      resetData();
      navigate(INACTIVE);
    }
  }, [playerId, gameData.id, resetData, navigate]);

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
            time={timer}
            setTime={setTimer}
            inLobby={'in-lobby'}
            small={'v-small'}
            onFinish={onTimerFinish}
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

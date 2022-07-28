import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DEFEAT,
  INACTIVE,
  LOADING,
  LOBBY,
  PLAY,
  PROCESSING_QUESTION,
  SUGGESTING_CHARACTERS,
  VICTORY,
  WAITING_FOR_PLAYERS,
} from '../constants/constants';
import GameDataContext from '../contexts/game-data-context';
import { INACTIVE_USER, LOOSER, WINNER } from '../constants/constants';

export default function useGameData() {
  const { gameData, resetData, playerId, fetchGame } =
    useContext(GameDataContext);
  const navigate = useNavigate();
  const promiseRef = useRef();

  useEffect(() => {
    if (promiseRef.current && promiseRef.current.state === 'pending') {
      return;
    }
    const checkStatus = setTimeout(async () => {
      promiseRef.current = fetchGame();
    }, 1000);

    return () => clearTimeout(checkStatus);
  });

  useEffect(() => {
    if (!gameData.id && !sessionStorage.gameId) {
      resetData();
      navigate('/');

      return;
    }

    const currentPlayer = gameData.players.find(
      (player) => player.player.id === playerId
    );

    if (gameData.status === WAITING_FOR_PLAYERS) {
      navigate(LOADING);

      return;
    }

    if (gameData.status === SUGGESTING_CHARACTERS) {
      navigate(LOBBY);

      return;
    }

    if (
      gameData.status === PROCESSING_QUESTION &&
      currentPlayer.state !== INACTIVE_USER &&
      currentPlayer.state !== WINNER &&
      currentPlayer.state !== LOOSER
    ) {
      navigate(PLAY);

      return;
    }

    if (currentPlayer?.state === INACTIVE_USER) {
      navigate(INACTIVE);

      return;
    }

    if (currentPlayer?.state === WINNER) {
      navigate(VICTORY);

      return;
    }

    if (currentPlayer?.state === LOOSER) {
      navigate(DEFEAT);

      return;
    }
  }, [gameData, resetData, playerId, navigate]);

  return;
}

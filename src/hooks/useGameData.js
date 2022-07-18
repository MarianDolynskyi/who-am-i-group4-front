import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LOADING,
  LOBBY,
  PLAY,
  PROCESSING_QUESTION,
  SUGGESTING_CHARACTERS,
  WAITING_FOR_PLAYERS,
} from '../constants/constants';
import GameDataContext from '../contexts/game-data-context';
import { findGameById } from '../services/games-service';

export default function useGameData() {
  const { gameData, setGameData, resetData, playerId } =
    useContext(GameDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = setTimeout(async () => {
      const gameId = gameData.id || sessionStorage.getItem('gameId');
      const userId = playerId || sessionStorage.getItem('playerId');

      if (gameId && userId) {
        try {
          const { data } = await findGameById(userId, gameId);

          if (data.players.length)
            setGameData((state) => ({
              ...state,
              status: data.status,
              players: data.players,
            }));
        } catch (error) {
          //to do: handle errors
          // if (error.response.status === 404) {
          //   resetData();
          //   navigate('/');
          // }
        }
      }
    }, 1000);

    return () => clearTimeout(checkStatus);
  });

  useEffect(() => {
    if (!gameData.id && !sessionStorage.gameId) {
      resetData();
      navigate('/');

      return;
    }

    if (gameData.status === WAITING_FOR_PLAYERS) {
      navigate(LOADING);

      return;
    }

    if (gameData.status === SUGGESTING_CHARACTERS) {
      navigate(LOBBY);

      return;
    }

    if (gameData.status === PROCESSING_QUESTION) {
      navigate(PLAY);

      return;
    }
  }, [gameData, resetData, playerId, navigate]);

  return;
}

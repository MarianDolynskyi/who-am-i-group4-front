import { useContext, useEffect } from 'react';
import { ASKED, ASKING, GUESSED, GUESSING } from '../constants/constants';
import GameDataContext from '../contexts/game-data-context';

export default function usePlayers() {
  const { gameData, playerId } = useContext(GameDataContext);

  const currentPlayer = gameData.players.find(
    (player) => player.player.id === playerId
  );

  useEffect(() => {
    sessionStorage.setItem('avatar', currentPlayer?.avatar);
    sessionStorage.setItem('name', currentPlayer?.nickname);
    sessionStorage.setItem('character', currentPlayer?.player.character);
  }, [
    currentPlayer?.avatar,
    currentPlayer?.nickname,
    currentPlayer?.player.character,
  ]);

  return gameData.players.reduce(
    (obj, player) => {
      if (
        player.state === ASKING ||
        player.state === ASKED ||
        player.state === GUESSING ||
        player.state === GUESSED
      ) {
        obj.playerTurn = player;
      }

      if (player.player.id === playerId) {
        obj.currentPlayer = player;

        // if (obj.currentPlayer.state === INACTIVE_USER) {
        //   navigate(INACTIVE);
        // }

        // if (obj.currentPlayer.state === WINNER) {
        //   navigate(VICTORY);
        // }

        // if (obj.currentPlayer.state === LOOSER) {
        //   navigate(DEFEAT);
        // }

        return obj;
      }

      obj.playersWithoutCurrent.push(player);

      return obj;
    },
    { playersWithoutCurrent: [] }
  );
}

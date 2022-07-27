import { useEffect } from 'react';
import { useContext } from 'react';
import GameDataContext from '../contexts/game-data-context';

export default function usePlayers() {
  const { gameData, playerId } = useContext(GameDataContext);

  const players = gameData.players.map((player, index) => ({
    nickname: player.player.name || `Player ${index + 1}`,
    avatar: `avatar0${index + 1}`,
    ...player,
  }));

  const currentPlayer = players.find((player) => player.player.id === playerId);
  const playersWithoutCurrent = players.filter(
    (player) => player.player.id !== playerId
  );

  useEffect(() => {
    sessionStorage.setItem('avatar', currentPlayer?.avatar);
    sessionStorage.setItem('name', currentPlayer?.nickname);
  }, [currentPlayer.avatar, currentPlayer.nickname]);

  return { currentPlayer, playersWithoutCurrent };
}

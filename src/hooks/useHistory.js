import { useContext, useEffect } from 'react';
import GameDataContext from '../contexts/game-data-context';
import { getHistory } from '../services/games-service';

export default function useHistory() {
  const { gameData, setGameData, playerId } = useContext(GameDataContext);

  useEffect(() => {
    const checkHistory = setTimeout(async () => {
      const gameId = gameData.id || sessionStorage.getItem('gameId');
      const userId = playerId || sessionStorage.getItem('playerId');

      if (gameId && userId) {
        try {
          const { data } = await getHistory(userId, gameId);
          setGameData((state) => ({ ...state, history: data }));
        } catch (error) {
          //to do: handle errors
        }
      }
    }, 1000);

    return () => clearTimeout(checkHistory);
  });

  const history =
    gameData.history &&
    gameData.history.map((item) => {
      const playersAvatars = item.Players.map((player, index) => ({
        id: player,
        avatar: `avatar0${index + 1}`,
      }));
      const user = playersAvatars.find((player) => player.id === item.PlayerId);
      const avatar = user && user.avatar;
      const answers = item.Answers.map((answer) => {
        const player = playersAvatars.find(
          (player) => player.id === answer.PlayerId
        );
        const avatar = player && player.avatar;
        const status = answer && answer.Answer;

        return { avatar, status };
      });

      return { avatar, answers, question: item.Question };
    });

  return history;
}

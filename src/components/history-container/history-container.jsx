import HistoryItem from '../history-item/history-item';
import QuestionForm from '../question-form/question-form';
import { useEffect, useMemo, useRef, useState } from 'react';
import AnswerForm from '../answer-form/answer-form';
import MessageBlock from '../message-block/message-block';
import './history-container.scss';
import {
  answerQuestion,
  askQuestion,
  getHistory,
  answerGuess,
} from '../../services/games-service';
import {
  ANSWERED,
  ANSWERING,
  ASKING,
  GUESSED,
  GUESSING,
  NO,
  RESPONSE,
  WAITING,
} from '../../constants/constants';
import { useContext } from 'react';
import GameDataContext from '../../contexts/game-data-context';
import { useCallback } from 'react';

function HistoryContainer({ currentPlayer, players, playerTurn }) {
  const { gameData, playerId, fetchGame } = useContext(GameDataContext);
  const bottomElement = useRef(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const mode = currentPlayer.state;

  useEffect(() => {
    const listBottom = bottomElement.current;

    if (!listBottom) return;

    listBottom.scrollIntoView({
      behavior: 'auto',
      block: 'end',
    });
  }, [history.length]);

  const fetchHistory = useCallback(
    async function () {
      if (!gameData.id) {
        return;
      }
      const { data } = await getHistory(playerId, gameData.id);

      if (data.length) {
        const gameHistory = data.map((item) => {
          const playersAvatars = item.Players.map((player, index) => ({
            id: player,
            avatar: `avatar0${index + 1}`,
          }));
          const user = playersAvatars.find(
            (player) => player.id === item.PlayerId
          );
          const users = playersAvatars.filter(
            (player) => player.id !== item.PlayerId
          );
          const avatar = user?.avatar;
          const answers = users.map((user) => {
            const answer = item.Answers.find(
              (answer) => user.id === answer.PlayerId
            );
            const avatar = user && user.avatar;
            const status = answer && answer.Answer;

            return { avatar, status };
          });

          return { avatar, answers, question: item.Question };
        });

        setHistory(gameHistory);
      }
    },
    [playerId, gameData.id]
  );

  useEffect(() => {
    fetchHistory();
  }, [
    playerTurn?.player.id,
    fetchHistory,
    playerTurn?.question,
    currentPlayer.answer,
  ]);

  const lastHistoryItemAnswersLength = useMemo(
    () => history[history.length - 1]?.answers.length ?? 0,
    [history]
  );
  const answersLength = useMemo(
    () =>
      players.reduce((all, player) => {
        if (player.state === ANSWERED) {
          return all + 1;
        }

        return all;
      }, 0),
    [players]
  );

  useEffect(() => {
    if (lastHistoryItemAnswersLength !== answersLength) {
      fetchHistory();
    }
  }, [lastHistoryItemAnswersLength, answersLength, fetchHistory]);

  useEffect(() => {
    if (playerTurn.state !== GUESSED) {
      setAnswer('');
    }
  }, [playerTurn.state]);

  const submitAsk = useCallback(
    async (question) => {
      setLoading(true);
      try {
        await askQuestion(playerId, gameData.id, question);
        await fetchGame();
      } catch (error) {
        //to do: handle error
      }
      setLoading(false);
    },
    [fetchGame, gameData.id, playerId]
  );

  const submitAnswer = useCallback(
    async (answer) => {
      setLoading(true);
      try {
        await answerQuestion(playerId, gameData.id, answer);
        await fetchGame();
      } catch (error) {
        //to do: handle error
      }
      setLoading(false);
    },
    [fetchGame, gameData.id, playerId]
  );

  const submitAnswerGuess = useCallback(
    async (answer) => {
      setLoading(true);
      setAnswer(answer);
      try {
        await answerGuess(playerId, gameData.id, answer);
        await fetchGame();
      } catch (error) {
        //to do: handle error
      }
      setLoading(false);
    },
    [fetchGame, gameData.id, playerId]
  );

  return (
    <div className="history">
      <div className="history_list">
        {history &&
          history.map((item, index) => (
            <HistoryItem
              key={index}
              avatar={item.avatar}
              question={item.question}
              answers={item.answers}
            />
          ))}
        <div className="list_scroll_bottom" ref={bottomElement}></div>
      </div>
      <div className="history_bottom">
        {mode === ASKING && (
          <QuestionForm onSubmit={submitAsk} disabled={loading} />
        )}
        {mode === ANSWERING && playerTurn?.question && (
          <AnswerForm
            mode={playerTurn.state === GUESSING ? GUESSING : mode}
            onSubmit={
              playerTurn.state === GUESSING ? submitAnswerGuess : submitAnswer
            }
            disabled={loading}
          />
        )}
        {mode === ANSWERED && playerTurn.state === GUESSED && (
          <MessageBlock mode={WAITING} message={answer} />
        )}
        {mode === GUESSED && gameData.wrong && (
          <MessageBlock mode={RESPONSE} message={NO} />
        )}
      </div>
    </div>
  );
}

export default HistoryContainer;

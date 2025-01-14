import HistoryItem from '../history-item/history-item';
import QuestionForm from '../question-form/question-form';
import { useEffect, useMemo, useRef, useState } from 'react';
import AnswerForm from '../answer-form/answer-form';
import MessageBlock from '../message-block/message-block';
import './history-container.scss';
import {
  getHistory,
  askQuestion,
  answerQuestion,
} from '../../services/games-service';
import {
  ASKING,
  ANSWERING,
  ANSWERED,
  GUESSING,
  ANSWERING_GUESS,
  ANSWERED_GUESS,
  WAITING,
} from '../../constants/constants';
import { useContext, useCallback } from 'react';
import GameDataContext from '../../contexts/game-data-context';

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
          const user = gameData.avatars.find(
            (player) => player.id === item.PlayerId
          );
          const users = gameData.avatars.filter(
            (player) =>
              player.id !== item.PlayerId &&
              item.Players.find((id) => id === player.id)
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

          const guess = item.IsGuess ? 'guess' : '';
          const myGuess =
            item.IsGuess && item.PlayerId === playerId ? 'guess' : '';

          return { avatar, answers, question: item.Question, guess, myGuess };
        });

        setHistory(gameHistory);
      }
    },
    [playerId, gameData.id, gameData.avatars]
  );
  // const promiseRef = useRef();

  // useEffect(() => {
  //   if (promiseRef.current && promiseRef.current.state === 'pending') {
  //     return;
  //   }
  //   const checkStatus = setTimeout(async () => {
  //     promiseRef.current = fetchHistory();
  //   }, 1000);

  //   return () => clearTimeout(checkStatus);
  // });

  useEffect(() => {
    fetchHistory();
  }, [
    playerTurn?.player.id,
    fetchHistory,
    playerTurn?.question,
    playerTurn?.guess,
    currentPlayer.answer,
  ]);

  const lastHistoryItemAnswersLength = useMemo(
    () => history[history.length - 1]?.answers.length ?? 0,
    [history]
  );
  const answersLength = useMemo(
    () =>
      players.reduce((all, player) => {
        if (player.state === ANSWERED || player.state === ANSWERED_GUESS) {
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
    if (playerTurn?.state !== ANSWERING_GUESS) {
      setAnswer('');
    }

    if (playerTurn?.state === ASKING) {
      setLoading(false);
    }
  }, [playerTurn?.state]);

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
              guess={item.guess}
              myGuess={item.myGuess}
            />
          ))}
        <div className="list_scroll_bottom" ref={bottomElement}></div>
      </div>
      <div className="history_bottom">
        {mode === ASKING && (
          <QuestionForm onSubmit={submitAsk} disabled={loading} />
        )}
        {(mode === ANSWERING || mode === ANSWERING_GUESS) &&
          (playerTurn.question || playerTurn.guess) && (
            <AnswerForm
              mode={mode}
              onSubmit={submitAnswer}
              disabled={loading}
            />
          )}
        {mode === ANSWERED_GUESS && playerTurn?.state === GUESSING && (
          <MessageBlock mode={WAITING} message={answer} />
        )}
      </div>
    </div>
  );
}

export default HistoryContainer;

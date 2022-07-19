import HistoryItem from '../history-item/history-item';
import QuestionForm from '../question-form/question-form';
import { useEffect, useRef, useState } from 'react';
import AnswerForm from '../answer-form/answer-form';
import MessageBlock from '../message-block/message-block';
import './history-container.scss';
import { answerQuestion, askQuestion } from '../../services/games-service';
import {
  ANSWERED,
  ANSWERING,
  ASKING,
  GUESSING,
  READY,
  RESPONSE,
  WAITING,
} from '../../constants/constants';
import { useContext } from 'react';
import GameDataContext from '../../contexts/game-data-context';
import useHistory from '../../hooks/useHistory';

function HistoryContainer({ mode, disabled }) {
  const { gameData, playerId } = useContext(GameDataContext);
  const [message, setMessage] = useState('yes');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const bottomElement = useRef(null);

  const history = useHistory();

  useEffect(() => {
    const listBottom = bottomElement.current;

    if (!listBottom) return;

    listBottom.scrollIntoView({
      behavior: 'auto',
      block: 'end',
    });
  });

  const sendQuestionHandler = async () => {
    if (currentQuestion !== '') {
      try {
        await askQuestion(playerId, gameData.id, currentQuestion);
        setCurrentQuestion('');
      } catch (error) {
        //to do: handle error
      }
    }
  };

  const handleClick = async (event) => {
    event.preventDefault();
    const answer = event.nativeEvent.submitter.value;
    setMessage(answer);
    try {
      await answerQuestion(playerId, gameData.id, answer);
    } catch (error) {
      //to do: handle error
    }
  };

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
      {mode === ASKING && (
        <QuestionForm
          setCurrentQuestion={setCurrentQuestion}
          currentQuestion={currentQuestion}
          sendQuestion={sendQuestionHandler}
        />
      )}
      {(mode === ANSWERING || mode === ANSWERED) && (
        <AnswerForm mode={mode} onClick={handleClick} disabled={disabled} />
      )}
      {mode === RESPONSE && <MessageBlock mode={mode} message={message} />}
    </div>
  );
}

export default HistoryContainer;

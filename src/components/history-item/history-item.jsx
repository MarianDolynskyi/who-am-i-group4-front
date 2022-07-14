import clsx from 'clsx';
import AnswerIcon from '../answer-icon/answer-icon';
import './history-item.scss';

function HistoryItem({ avatar, question, answers, guess }) {
  return (
    <div className="history-item">
      <div className={clsx('history-item__question', guess)}>
        {guess && <span className="my-guess">My guess</span>}
        <div className={clsx('history-item__avatar', avatar)}></div>
        <p>{question}</p>
      </div>
      <div className="history-item__icons-box">
        {answers.map((answer, index) => (
          <AnswerIcon
            key={index}
            avatar={answer.avatar}
            status={answer.status || null}
          />
        ))}
      </div>
    </div>
  );
}

export default HistoryItem;

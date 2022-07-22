import messageConverter from '../../helper-functions/message-converter';
import clsx from 'clsx';
import './message-block.scss';

function MessageBlock({ mode, message }) {
  const modeClassName = `${mode.toLowerCase()}-${message.toLowerCase()}`;
  console.log('MESSAGE', message);

  return (
    <div className={clsx('text', modeClassName)}>
      <div className={`icon-${modeClassName}`}></div>
      {/* <span className={modeClassName}>{messageConverter(mode, message)}</span> */}
    </div>
  );
}

export default MessageBlock;

import CountdownTimer from '../timer/timer-countdown/timer-countdown';
import PlayerCard from '../player-card/player-card';
import ModalContext from '../../contexts/modal-context';
import './users-container.scss';
import { useContext } from 'react';
import { LEAVING } from '../../constants/constants';

function UsersContainer({ currentPlayer, players, timer }) {
  const modalActive = useContext(ModalContext)[0];

  return (
    <div className="users">
      <div className="users__timer-container">
        <p className="users__turn">TURN TIME</p>
        {!!timer && (
          <CountdownTimer small={'v-small'} time={timer} paused={modalActive} />
        )}
      </div>
      {currentPlayer && (
        <PlayerCard
          className="in-users-container"
          avatarClassName={currentPlayer.avatar}
          name={currentPlayer.player.name}
          isYou
        />
      )}
      <hr />
      <div className="users__list">
        {players ? (
          players.map((player) => (
            <PlayerCard
              className="in-users-container"
              key={player.player.id}
              name={player.player.name}
              avatarClassName={player.avatar}
              assignedCharacter={player.player.character}
              leaving={player.state === LEAVING}
            />
          ))
        ) : (
          <h1>Something went wrong</h1>
        )}
      </div>
    </div>
  );
}

export default UsersContainer;

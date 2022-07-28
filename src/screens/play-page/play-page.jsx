import UsersContainer from '../../components/users-container/users-container';
import HistoryContainer from '../../components/history-container/history-container';
import GuessCharacterModal from '../../components/modals/guess-a-character';
import Header from '../../components/header/header';
import { useCallback, useContext, useState } from 'react';
import ModalContext from '../../contexts/modal-context';
import './play-page.scss';
import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import Spinner from '@atlaskit/spinner';
import { askGuess } from '../../services/games-service';
import GameDataContext from '../../contexts/game-data-context';
import useGameData from '../../hooks/useGameData';
import usePlayers from '../../hooks/usePlayers';

function PlayPage() {
  const { gameData, playerId } = useContext(GameDataContext);
  const [active, setActive] = useState(false);

  useGameData();
  const { currentPlayer, playersWithoutCurrent, playerTurn } = usePlayers();
  const timer = gameData.timer; //|| playerTurn?.question ? 20 : 60

  const onSubmitGuess = useCallback(
    async (event, guess) => {
      event.preventDefault();
      try {
        await askGuess(playerId, gameData.id, guess);
        setActive(false);
      } catch (error) {
        //to do: handle errors
      }
    },
    [gameData.id, playerId]
  );

  return (
    console.log(playerTurn, gameData.players),
    (
      <ScreenWrapper className="lobby-screen">
        {currentPlayer ? (
          <>
            <Header type="play-game" />
            <div className="lobby-screen__content_wrapper">
              <ModalContext.Provider value={[active, setActive]}>
                <UsersContainer
                  currentPlayer={currentPlayer}
                  players={playersWithoutCurrent}
                  timer={timer}
                />
                <HistoryContainer
                  currentPlayer={currentPlayer}
                  players={playersWithoutCurrent}
                  playerTurn={playerTurn}
                />
                <GuessCharacterModal
                  active={active}
                  onSubmit={onSubmitGuess}
                  onCancel={() => setActive(false)}
                  timer={timer}
                />
              </ModalContext.Provider>
            </div>
          </>
        ) : (
          <Spinner appearance="invert" />
        )}
      </ScreenWrapper>
    )
  );
}

export default PlayPage;

/*
---------Modes-----------
ASLING - ask a question
ANSWERING - answer a question (3 buttons)
GUESSING - answer a quessing question (2 buttons)
WAITING - waiting for response from other prayers after giving an answer
RESPONSE - giving a response for the question ('yes' or 'no')
*/

import UsersContainer from '../../components/users-container/users-container';
import HistoryContainer from '../../components/history-container/history-container';
import GuessCharacterModal from '../../components/modals/guess-a-character';
import Header from '../../components/header/header';
import { useContext, useState } from 'react';
import ModalContext from '../../contexts/modal-context';
import './play-page.scss';
import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import Spinner from '@atlaskit/spinner';
import { askQuestion } from '../../services/games-service';
import GameDataContext from '../../contexts/game-data-context';
import useGameData from '../../hooks/useGameData';
import usePlayers from '../../hooks/usePlayers';

function PlayPage() {
  const { gameData, playerId } = useContext(GameDataContext);
  const [active, setActive] = useState(false);

  useGameData();
  const { currentPlayer, playersWithoutCurrent } = usePlayers();

  const submitGuess = async (event, guess) => {
    event.preventDefault();
    try {
      await askQuestion(playerId, gameData.id, guess);
      setActive(false);
    } catch (error) {
      //to do: handle errors
    }
  };

  return (
    <ScreenWrapper className="lobby-screen">
      {currentPlayer ? (
        <>
          <Header type="play-game" />
          <div className="lobby-screen__content_wrapper">
            <ModalContext.Provider value={[active, setActive]}>
              {currentPlayer && (
                <>
                  <UsersContainer
                    mode={currentPlayer.state}
                    currentPlayer={currentPlayer}
                    players={playersWithoutCurrent}
                    timer={gameData.timer}
                  />
                  <HistoryContainer
                    mode={currentPlayer.state}
                    currentPlayer={currentPlayer}
                  />
                </>
              )}
              <GuessCharacterModal
                active={active}
                onSubmit={submitGuess}
                onCancel={() => setActive(false)}
              />
            </ModalContext.Provider>
          </div>
        </>
      ) : (
        <Spinner appearance="invert" />
      )}
    </ScreenWrapper>
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

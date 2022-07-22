import GameTitle from '../../components/game-title/game-title';
import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import GameDataContext from '../../contexts/game-data-context';
import './home.scss';
import PlayersOnlineTitle from '../../components/players-online-title/players-online-title';
import AfterLogin from './AfterLogin';
import BeforeLogin from './BeforeLogin';
import { useContext, useEffect, useState } from 'react';

function Homepage() {
  const { leaveGame } = useContext(GameDataContext);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    leaveGame();
  }, []);

  return (
    <ScreenWrapper>
      <GameTitle />
      <PlayersOnlineTitle />
      {isLogin ? (
        <AfterLogin setIsLogin={setIsLogin} />
      ) : (
        <BeforeLogin setIsLogin={setIsLogin} />
      )}
    </ScreenWrapper>
  );
}

export default Homepage;

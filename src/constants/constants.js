const WAITING_FOR_PLAYERS =
  'com.eleks.academy.whoami.core.state.WaitingForPlayers';
const SUGGESTING_CHARACTERS =
  'com.eleks.academy.whoami.core.state.SuggestingCharacters';
const PROCESSING_QUESTION =
  'com.eleks.academy.whoami.core.state.ProcessingQuestion';
const NUMBER_OF_PLAYERS = 4;
const READY = 'READY';
const NOT_READY = 'NOT_READY';
const ASKING = 'ASKING';
const ASKED = 'ASKED';
const ANSWERING = 'ANSWERING';
const ANSWERED = 'ANSWERED';
const GUESSING = 'GUESSING';
const GUESSED = 'GUESSED';
const ANSWERING_GUESS = 'ANSWERING_GUESS';
const ANSWERED_GUESS = 'ANSWERED_GUESS';
const INACTIVE_USER = 'INACTIVE';
const WINNER = 'WINNER';
const LOOSER = 'LOOSER';
const YES = 'YES';
const NO = 'NO';
const NOT_SURE = 'NOT_SURE';
const WAITING = 'WAITING';
const RESPONSE = 'RESPONSE';

const MAIN_LOBBY = '/main-lobby';
const GAME_LOBBY = '/game-lobby';
const LOADING = '/loading';
const LOBBY = '/lobby';
const PLAY = '/play';
const DEFEAT = '/defeat';
const VICTORY = '/victory';
const INACTIVE = '/inactive';
const CREATE_ACCOUNT = '/create-account';
const SIGN_IN = '/sign-in';
const RESTORE = '/restore';
const NEW_PASSWORD = '/new-password';
const PROFILE = '/profile';
const REDIRECT = '/email-redirect';

const RGX_PASS =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;
const RGX_USERNAME = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]$/;
const RGX_EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const THEME_FILTER = [
  { title: 'Actors', checked: false },
  { title: 'Astronauts', checked: false },
  { title: 'Superheroes', checked: false },
];
const NUMBER_OF_PLAYERS_FILTER = [
  { title: '4', checked: false },
  { title: '5', checked: false },
  { title: '6', checked: false },
  { title: '7', checked: false },
  { title: '8', checked: false },
  { title: '9', checked: false },
  { title: '10', checked: false },
  { title: '11', checked: false },
  { title: '12', checked: false },
];
const TYPE_FILTER = [
  { title: 'Public', checked: false },
  { title: 'Private', checked: false },
];

export {
  WAITING_FOR_PLAYERS,
  SUGGESTING_CHARACTERS,
  PROCESSING_QUESTION,
  NUMBER_OF_PLAYERS,
  READY,
  NOT_READY,
  ASKING,
  ASKED,
  ANSWERING,
  ANSWERED,
  GUESSING,
  GUESSED,
  ANSWERING_GUESS,
  ANSWERED_GUESS,
  INACTIVE_USER,
  WINNER,
  LOOSER,
  YES,
  NO,
  NOT_SURE,
  WAITING,
  RESPONSE,
  MAIN_LOBBY,
  GAME_LOBBY,
  LOADING,
  LOBBY,
  PLAY,
  DEFEAT,
  VICTORY,
  INACTIVE,
  THEME_FILTER,
  NUMBER_OF_PLAYERS_FILTER,
  TYPE_FILTER,
  CREATE_ACCOUNT,
  SIGN_IN,
  RESTORE,
  NEW_PASSWORD,
  PROFILE,
  REDIRECT,
  RGX_PASS,
  RGX_USERNAME,
  RGX_EMAIL,
};

import axios from 'axios';

async function getAllPlayersCount(player) {
  return axios({
    method: 'get',
    url: '/api/v1/games/all-players-count',
    headers: { 'X-Player': player },
  });
}

async function findGameById(player, id) {
  return axios({
    method: 'get',
    url: `/api/v1/games/${id}`,
    headers: { 'X-Player': player },
  });
}

async function findAvailableGames(player) {
  return axios({
    method: 'get',
    url: '/api/v1/games',
    headers: { 'X-Player': player },
  });
}

function createGame(player, playersNum) {
  return axios({
    method: 'post',
    url: '/api/v1/games',
    headers: { 'X-Player': player },
    data: {
      maxPlayers: playersNum,
    },
  });
}

function suggestCharacter(player, id, name, character) {
  return axios({
    method: 'post',
    url: `/api/v1/games/${id}/characters`,
    headers: { 'X-Player': player },
    data: {
      name: name,
      character: character,
    },
  });
}

async function findTurnInfo(player, id) {
  return axios({
    method: 'get',
    url: `/api/v1/games/${id}/turn`,
    headers: { 'X-Player': player },
  });
}

function askQuestion(player, id, message) {
  console.log('QUESTION', player, id, message);

  return axios({
    method: 'post',
    url: `/api/v1/games/${id}/questions`,
    headers: { 'X-Player': player },
    data: {
      message: message,
    },
  });
}

function answerQuestion(player, id, question) {
  return axios({
    method: 'post',
    url: `/api/v1/games/${id}/answer`,
    headers: { 'X-Player': player },
    data: {
      message: question,
    },
  });
}

function askGuess(player, id, guess) {
  return axios({
    method: 'post',
    url: `/api/v1/games/${id}/guess`,
    headers: { 'X-Player': player },
    data: {
      message: guess,
    },
  });
}

function answerGuess(player, id, answer) {
  return axios({
    method: 'post',
    url: `/api/v1/games/${id}/guess/answer`,
    headers: { 'X-Player': player },
    params: {
      answer,
    },
  });
}

function leaveGame(player, id) {
  return axios({
    method: 'delete',
    url: `/api/v1/games/${id}/leave`,
    headers: { 'X-Player': player },
  });
}

function getHistory(player, id) {
  return axios({
    method: 'get',
    url: `/api/v1/games/${id}/history`,
    headers: { 'X-Player': player },
  });
}

function inactivePlayer(player, id) {
  return axios({
    method: 'post',
    url: `/api/v1/games/${id}/inactivePlayer`,
    headers: { 'X-Player': player },
  });
}

export {
  getAllPlayersCount,
  findGameById,
  findAvailableGames,
  createGame,
  suggestCharacter,
  findTurnInfo,
  askQuestion,
  answerQuestion,
  askGuess,
  answerGuess,
  leaveGame,
  getHistory,
  inactivePlayer,
};

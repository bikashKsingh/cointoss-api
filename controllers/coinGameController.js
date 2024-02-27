const coinGameService = require("../services/coinGameService");
const { defaultServerResponse, coinGameMessage } = require("../constants");

// createCoinGame
module.exports.createCoinGame = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await coinGameService.createCoinGame(req.body);
    if (serviceResponse.status === 200) {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = serviceResponse.message;
    } else {
      response.message = serviceResponse.message;
      response.errors = serviceResponse.errors;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: coinGameController: createCoinGame`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// getCoinGameById
module.exports.getCoinGameById = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await coinGameService.getCoinGameById(req.params);
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = coinGameMessage.COIN_GAME_FETCHED;
    } else {
      response.message = coinGameMessage.COIN_GAME_NOT_FETCHED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: coinGameController: getCoinGameById`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// getCurrentCoinGame
module.exports.getCurrentCoinGame = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await coinGameService.getCurrentCoinGame(
      req.params
    );
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = coinGameMessage.COIN_GAME_FETCHED;
    } else {
      response.message = coinGameMessage.COIN_GAME_NOT_FETCHED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: coinGameController: getCurrentCoinGame`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// getAllCoinGames
module.exports.getAllCoinGames = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await coinGameService.getAllCoinGames(req.query);
    if (serviceResponse) {
      response.body = serviceResponse.body;
      response.page = serviceResponse.page;
      response.totalRecords = serviceResponse.totalRecords;
      response.totalPages = serviceResponse.totalPages;
      response.status = 200;
      response.message = coinGameMessage.COIN_GAME_FETCHED;
    } else {
      response.message = coinGameMessage.COIN_GAME_NOT_FETCHED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: coinGameController: getAllCoinGames`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// updateCoinGame
module.exports.updateCoinGame = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await coinGameService.updateCoinGame({
      id: req.params.id,
      body: req.body,
    });
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = coinGameMessage.COIN_GAME_UPDATED;
    } else {
      response.message = coinGameMessage.COIN_GAME_NOT_UPDATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: coinGameController: updateCoinGame`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// deleteCoinGame
module.exports.deleteCoinGame = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await coinGameService.deleteCoinGame(req.params);
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = coinGameMessage.COIN_GAME_DELETED;
    } else {
      response.message = coinGameMessage.COIN_GAME_NOT_DELETED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: coinGameController: deleteCoinGame`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// deleteUnPlayedCoinGame
module.exports.deleteUnPlayedCoinGame = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await coinGameService.deleteUnPlayedCoinGame();
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = coinGameMessage.COIN_GAME_DELETED;
    } else {
      response.message = coinGameMessage.COIN_GAME_NOT_DELETED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: coinGameController: deleteUnPlayedCoinGame`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

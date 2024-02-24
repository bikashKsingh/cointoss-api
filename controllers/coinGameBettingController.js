const coinGameBettingService = require("../services/coinGameBettingService");
const {
  defaultServerResponse,
  coinGameBettingMessage,
} = require("../constants");

// createCoinGameBetting
module.exports.createCoinGameBetting = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await coinGameBettingService.createCoinGameBetting({
      ...req.body,
      customer: req.params.customerId,
    });
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
      `Somthing Went Wrong Controller: coinGameBettingController: createCoinGameBetting`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// getCoinGameBettingById
module.exports.getCoinGameBettingById = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await coinGameBettingService.getCoinGameBettingById(
      req.params
    );
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = coinGameBettingMessage.COIN_GAME_BETTING_FETCHED;
    } else {
      response.message = coinGameBettingMessage.COIN_GAME_BETTING_NOT_FETCHED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: coinGameBettingController: getCoinGameBettingById`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// getAllCoinGameBettings
module.exports.getAllCoinGameBettings = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await coinGameBettingService.getAllCoinGameBettings(
      req.query
    );
    if (serviceResponse) {
      response.body = serviceResponse.body;
      response.page = serviceResponse.page;
      response.totalRecords = serviceResponse.totalRecords;
      response.totalPages = serviceResponse.totalPages;
      response.status = 200;
      response.message = coinGameBettingMessage.COIN_GAME_BETTING_FETCHED;
    } else {
      response.message = coinGameBettingMessage.COIN_GAME_BETTING_NOT_FETCHED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: coinGameBettingController: getAllCoinGameBettings`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// updateCoinGameBetting
module.exports.updateCoinGameBetting = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await coinGameBettingService.updateCoinGameBetting({
      id: req.params.id,
      body: req.body,
    });
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = coinGameBettingMessage.COIN_GAME_BETTING_UPDATED;
    } else {
      response.message = coinGameBettingMessage.COIN_GAME_BETTING_NOT_UPDATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: coinGameBettingController: updateCoinGameBetting`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// deleteCoinGameBetting
module.exports.deleteCoinGameBetting = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await coinGameBettingService.deleteCoinGameBetting(
      req.params
    );
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = coinGameBettingMessage.COIN_GAME_BETTING_DELETED;
    } else {
      response.message = coinGameBettingMessage.COIN_GAME_BETTING_NOT_DELETED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: coinGameBettingController: deleteCoinGameBetting`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// Customers Section
// ================

// getAllCustomersCoinGameBettings
module.exports.getAllCustomersCoinGameBettings = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse =
      await coinGameBettingService.getAllCustomersCoinGameBettings({
        ...req.query,
        ...req.params,
      });
    if (serviceResponse) {
      response.body = serviceResponse.body;
      response.page = serviceResponse.page;
      response.totalRecords = serviceResponse.totalRecords;
      response.totalPages = serviceResponse.totalPages;
      response.status = 200;
      response.message = coinGameBettingMessage.COIN_GAME_BETTING_FETCHED;
    } else {
      response.message = coinGameBettingMessage.COIN_GAME_BETTING_NOT_FETCHED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: coinGameBettingController: getAllCustomersCoinGameBettings`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// updateCustomersCoinGameBetting
module.exports.updateCustomersCoinGameBetting = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse =
      await coinGameBettingService.updateCustomersCoinGameBetting({
        ...req.params,
        ...req.body,
      });
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = coinGameBettingMessage.COIN_GAME_BETTING_UPDATED;
    } else {
      response.message = coinGameBettingMessage.COIN_GAME_BETTING_NOT_UPDATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: coinGameBettingController: updateCustomersCoinGameBetting`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

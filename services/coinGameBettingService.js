const coinGameBettingModel = require("../database/models/coinGameBettingModel");
const {
  formatMongoData,
  sefaultTransactionType,
  transactionType,
} = require("../helpers/dbHelper");
const wsHelpers = require("../helpers/wsHelpers");
const _ = require("lodash");
const {
  coinGameBettingMessage,
  defaultServerResponse,
} = require("../constants");
const customerModel = require("../database/models/customerModel");
const coinGameModel = require("../database/models/coinGameModel");
const walletTransactionHistoryModel = require("../database/models/walletTransactionHistoryModel");

// createCoinGameBetting
module.exports.createCoinGameBetting = async (serviceData) => {
  const response = _.cloneDeep(defaultServerResponse);
  try {
    // check wallet amount
    const customerDetails = await customerModel.findOne({
      _id: serviceData.customer,
    });
    const customerWallet = customerDetails.wallet;
    if (parseInt(serviceData.bettingAmount) > customerWallet) {
      response.message = "Insufficient wallet amount";
      response.errors.wallet = "Insufficient wallet amount";
      return response;
    }

    // stop duplicate betting
    const bettingDetails = await coinGameBettingModel.findOne({
      customer: serviceData.customer,
      coinGame: serviceData.coinGame,
    });

    if (bettingDetails) {
      response.message = "You already bet on this game.";
      response.errors.wallet = "You already bet on this game.";
      return response;
    }

    const newData = new coinGameBettingModel(serviceData);
    const result = await newData.save();

    // emit bettingCreated event
    wsHelpers.emitNewEvent("bettingCreated", result);

    const formatData = formatMongoData(result);
    response.status = 200;
    response.body = formatData;
    response.message = coinGameBettingMessage.COIN_GAME_BETTING_CREATED;
    return response;
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: coinGameBettingService: createCoinGameBetting`,
      error.message
    );
    throw new Error(error);
  }
};

// getCoinGameBettingById
module.exports.getCoinGameBettingById = async (serviceData) => {
  try {
    const id = serviceData?.id;
    const result = await coinGameBettingModel
      .findOne({ _id: id })
      .populate({
        path: "customer",
        select: "firstName lastName mobile email",
      })
      .populate({
        path: "coinGame",
        select: "gameStatus gameResult startDate endDate",
      });
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: coinGameBettingService: getCoinGameBettingById`,
      error.message
    );
    throw new Error(error);
  }
};

// getAllCoinGameBettings
module.exports.getAllCoinGameBettings = async (serviceData) => {
  try {
    let conditions = {};
    const {
      limit = 10,
      page = 1,
      status = true,
      isDeleted = false,
      bettingCoin = "All",
      gameResult = "All",
      bettingStatus = "All",
      customer = "",
    } = serviceData;

    // bettingCoin
    if (bettingCoin != "All" && bettingCoin != "") {
      conditions.bettingCoin = bettingCoin;
    }
    // gameResult
    if (gameResult != "All" && gameResult != "") {
      conditions.gameResult = gameResult;
    }
    // bettingStatus
    if (bettingStatus != "All" && bettingStatus != "") {
      conditions.bettingStatus = bettingStatus;
    }

    // customer
    if (customer) {
      conditions.customer = customer;
    }

    // Status
    if (status == "All") {
      delete conditions.status;
    } else {
      conditions.status = status;
    }

    // count record
    const totalRecords = await coinGameBettingModel.countDocuments(conditions);
    // Calculate the total number of pages
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    // DeletedAccount
    conditions.isDeleted = isDeleted;
    const dbResult = await coinGameBettingModel
      .find(conditions)
      .populate({
        path: "customer",
        select: "firstName lastName mobile email",
      })
      .populate({
        path: "coinGame",
        select: "gameStatus gameResult startDate endDate",
      })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .sort({ _id: -1 });
    const res = {
      body: formatMongoData(dbResult),
      page,
      totalPages,
      totalRecords,
    };
    return res;
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: coinGameBettingService: getAllCoinGameBettings`,
      error.message
    );
    throw new Error(error);
  }
};

// updateCoinGameBetting
module.exports.updateCoinGameBetting = async (serviceData) => {
  try {
    const { id, body } = serviceData;
    const result = await coinGameBettingModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: coinGameBettingService: updateCoinGameBetting`,
      error.message
    );
    throw new Error(error);
  }
};

// deleteCoinGameBetting
module.exports.deleteCoinGameBetting = async (serviceData) => {
  try {
    const { id } = serviceData;
    const result = await coinGameBettingModel.findByIdAndUpdate(id, {
      isDeleted: true,
      status: false,
    });
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: coinGameBettingService: deleteCoinGameBetting`,
      error.message
    );
    throw new Error(error);
  }
};

// Customers Section
// ================
// getAllCustomersCoinGameBettings
module.exports.getAllCustomersCoinGameBettings = async (serviceData) => {
  try {
    let conditions = {};
    const {
      limit = 10,
      page = 1,
      status = true,
      isDeleted = false,
      bettingCoin = "All",
      gameResult = "All",
      bettingStatus = "All",
      customerId = "",
      coinGame = "",
    } = serviceData;

    // bettingCoin
    if (bettingCoin != "All" && bettingCoin != "") {
      conditions.bettingCoin = bettingCoin;
    }
    // gameResult
    if (gameResult != "All" && gameResult != "") {
      conditions.gameResult = gameResult;
    }
    // bettingStatus
    if (bettingStatus != "All" && bettingStatus != "") {
      conditions.bettingStatus = bettingStatus;
    }

    // customerId
    if (customerId) {
      conditions.customer = customerId;
    }

    // coinGame
    if (coinGame) {
      conditions.coinGame = coinGame;
    }

    // Status
    if (status == "All") {
      delete conditions.status;
    } else {
      conditions.status = status;
    }

    // count record
    const totalRecords = await coinGameBettingModel.countDocuments(conditions);
    // Calculate the total number of pages
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    // DeletedAccount
    conditions.isDeleted = isDeleted;
    const dbResult = await coinGameBettingModel
      .find(conditions)
      .populate({
        path: "customer",
        select: "firstName lastName mobile email",
      })
      .populate({
        path: "coinGame",
        select: "gameStatus gameResult startDate endDate",
      })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .sort({ _id: -1 });
    const res = {
      body: formatMongoData(dbResult),
      page,
      totalPages,
      totalRecords,
    };
    return res;
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: coinGameBettingService: getAllCustomersCoinGameBettings`,
      error.message
    );
    throw new Error(error);
  }
};

// updateCustomersCoinGameBetting
module.exports.updateCustomersCoinGameBetting = async (serviceData) => {
  try {
    const { id, coinGame, gameResult, customerId } = serviceData;

    // get customer details
    const customerDetails = await customerModel.findOne({ _id: customerId });
    if (!customerDetails) {
      throw new Error("User not found");
    }

    // get coin game details
    // const coinGameDetails = await coinGameModel.findOne({ _id: coinGame });
    // if (!coinGameDetails) {
    //   throw new Error("Coin Game not found");
    // }

    // get coin game betting details
    const coinGameBettingDetails = await coinGameBettingModel.findOne({
      coinGame: coinGame,
      customer: customerId,
    });
    if (!coinGameBettingDetails) {
      throw new Error("Coin game betting not found");
    }

    // update wallet
    let walletAmount = customerDetails.wallet;
    let bettingAmount = coinGameBettingDetails.bettingAmount;
    let isWon = false;
    if (coinGameBettingDetails.bettingCoin == gameResult) {
      walletAmount = walletAmount + bettingAmount;
      isWon = true;
    } else {
      walletAmount = walletAmount - bettingAmount;
    }

    // update wallet
    const updateWallet = await customerModel.findByIdAndUpdate(
      customerId,
      { wallet: walletAmount },
      { new: true }
    );

    // add wallet transaction
    let transactionHistory = await walletTransactionHistoryModel.create({
      customer: customerId,
      transactionType: isWon
        ? transactionType.GAME_DEPOSIT
        : transactionType.GAME_WITHDRAWAL,
      description: isWon
        ? "Coin Game Winning Amount"
        : "Coin Game Losing Amount",
      amount: bettingAmount,
    });

    // update coin game betting
    const result = await coinGameBettingModel.findByIdAndUpdate(
      id,
      {
        bettingStatus: "ACCEPTED",
        gameResult: gameResult,
      },
      {
        new: true,
      }
    );
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: coinGameBettingService: updateCustomersCoinGameBetting`,
      error.message
    );
    throw new Error(error);
  }
};

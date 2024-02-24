const coinGameModel = require("../database/models/coinGameModel");
const { formatMongoData } = require("../helpers/dbHelper");
const _ = require("lodash");
const { coinGameMessage, defaultServerResponse } = require("../constants");
const coinGameBettingModel = require("../database/models/coinGameBettingModel");

// createCoinGame
module.exports.createCoinGame = async (serviceData) => {
  const response = _.cloneDeep(defaultServerResponse);
  try {
    const newData = new coinGameModel(serviceData);
    const result = await newData.save();
    const formatData = formatMongoData(result);
    response.status = 200;
    response.body = formatData;
    response.message = coinGameMessage.COIN_GAME_CREATED;
    return response;
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: coinGameService: createCoinGame`,
      error.message
    );
    throw new Error(error);
  }
};

// getCoinGameById
module.exports.getCoinGameById = async (serviceData) => {
  try {
    const id = serviceData?.id;
    const result = await coinGameModel.findOne({ _id: id });
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: coinGameService: getCoinGameById`,
      error.message
    );
    throw new Error(error);
  }
};

// getCurrentCoinGame
module.exports.getCurrentCoinGame = async (serviceData) => {
  try {
    const gameDetails = await coinGameModel.findOne().sort({ _id: -1 });

    // Count total users
    const totalGameBettingUsers = await coinGameBettingModel.countDocuments({
      coinGame: gameDetails._id,
    });

    // Count total HEAD users
    const totalGameBettingHeadUsers = await coinGameBettingModel.countDocuments(
      {
        coinGame: gameDetails._id,
        bettingCoin: "HEAD",
      }
    );

    // Count total TAIL users
    const totalGameBettingTailUsers = await coinGameBettingModel.countDocuments(
      {
        coinGame: gameDetails._id,
        bettingCoin: "TAIL",
      }
    );

    // Sum of the total betting amounts
    let totalAmounts = 0;
    const totalBettingAmounts = await coinGameBettingModel.aggregate([
      { $match: { coinGame: gameDetails._id } },
      { $group: { _id: null, totalAmount: { $sum: "$bettingAmount" } } },
    ]);
    if (totalBettingAmounts?.length)
      totalAmounts = totalBettingAmounts[0]?.totalAmount;

    // Sum of the total Head betting amounts
    let totalHeadAmounts = 0;
    const totalHeadBettingAmounts = await coinGameBettingModel.aggregate([
      { $match: { coinGame: gameDetails._id, bettingCoin: "HEAD" } },
      { $group: { _id: null, totalAmount: { $sum: "$bettingAmount" } } },
    ]);
    if (totalHeadBettingAmounts?.length)
      totalHeadAmounts = totalHeadBettingAmounts[0]?.totalAmount;

    // Sum of the total Tail betting amounts
    let totalTailAmounts = 0;
    const totalTailBettingAmounts = await coinGameBettingModel.aggregate([
      { $match: { coinGame: gameDetails._id, bettingCoin: "TAIL" } },
      { $group: { _id: null, totalAmount: { $sum: "$bettingAmount" } } },
    ]);
    if (totalTailBettingAmounts?.length)
      totalTailAmounts = totalTailBettingAmounts[0]?.totalAmount;

    const result = {
      ...formatMongoData(gameDetails),
      totalUsers: totalGameBettingUsers,
      totalHeadUsers: totalGameBettingHeadUsers,
      totalTailUsers: totalGameBettingTailUsers,

      totalAmounts: totalAmounts,
      totalHeadAmounts: totalHeadAmounts,
      totalTailAmounts: totalTailAmounts,
    };

    return result;
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: coinGameService: getCurrentCoinGame`,
      error.message
    );
    throw new Error(error);
  }
};

// getAllCoinGames
module.exports.getAllCoinGames = async (serviceData) => {
  try {
    let conditions = {};
    const {
      limit = 10,
      page = 1,
      status = true,
      isDeleted = false,
      gameStatus = "All",
      gameResult = "All",
      startDate = "",
      endDate = "",
    } = serviceData;

    // gameStatus
    if (gameStatus != "All" && gameStatus != "") {
      conditions.gameStatus = gameStatus;
    }
    // gameResult
    if (gameResult != "All" && gameResult != "") {
      conditions.gameResult = gameResult;
    }

    // Status
    if (status == "All") {
      delete conditions.status;
    } else {
      conditions.status = status;
    }

    // count record
    const totalRecords = await coinGameModel.countDocuments(conditions);
    // Calculate the total number of pages
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    // DeletedAccount
    conditions.isDeleted = isDeleted;
    const dbResult = await coinGameModel
      .find(conditions)
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
      `Somthing Went Wrong Service: coinGameService: getAllCoinGames`,
      error.message
    );
    throw new Error(error);
  }
};

// updateCoinGame
module.exports.updateCoinGame = async (serviceData) => {
  try {
    const { id, body } = serviceData;
    const result = await coinGameModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: coinGameService: updateCoinGame`,
      error.message
    );
    throw new Error(error);
  }
};

// deleteCoinGame
module.exports.deleteCoinGame = async (serviceData) => {
  try {
    const { id } = serviceData;
    const result = await coinGameModel.findByIdAndUpdate(id, {
      isDeleted: true,
      status: false,
    });
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: coinGameService: deleteCoinGame`,
      error.message
    );
    throw new Error(error);
  }
};

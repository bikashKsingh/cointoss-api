const coinGameService = require("../services/coinGameService");
const mongoose = require("mongoose");
const cron = require("node-cron");
const wsHelpers = require("../helpers/wsHelpers");
const settingModel = require("../database/models/settingModel");
module.exports.createCoinGame = () => {
  cron.schedule("*/1 * * * *", async () => {
    const mongooseState = mongoose.connection.readyState;
    try {
      if (mongooseState == 1) {
        const result = await coinGameService.createCoinGame();
        console.log("Game created", result._id);
        wsHelpers.emitNewEvent("coinGameCreated", result.body);
        setTimeout(() => {
          this.startCoinGame(result.body._id);
        }, 20000);
        setTimeout(() => {
          this.endCoinGame(result.body._id);
        }, 40000);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  });
};

module.exports.startCoinGame = async (gameId) => {
  const mongooseState = mongoose.connection.readyState;
  try {
    if (mongooseState == 1) {
      const result = await coinGameService.updateCoinGame({
        id: gameId,
        body: { gameStatus: "STARTED", startDate: Date.now() },
      });
      console.log("Game Started", result._id);
      wsHelpers.emitNewEvent("coinGameStarted", result);
    }
  } catch (error) {
    console.log("error", error.message);
  }
};

module.exports.endCoinGame = async (gameId) => {
  const mongooseState = mongoose.connection.readyState;
  try {
    if (mongooseState == 1) {
      // get game details
      let gameDetails = await coinGameService.getCoinGameById({
        id: gameId,
      });

      let gameResult = "HEAD";
      const gameResultDetails = gameDetails.gameResult;

      if (gameResultDetails == "PENDING") {
        // get setting
        const settingDetails = await settingModel.findOne({});
        const gameResultFromSetting = settingDetails.gameResult;

        if (gameResultFromSetting == "HEAD") {
          // calculate game result
          gameResult = gameResultFromSetting;
        } else if (gameResultFromSetting == "TAIL") {
          // calculate game result
          gameResult = gameResultFromSetting;
        } else if (gameResultFromSetting == "RANDOM") {
          // calculate game result
          const randomNumber = Math.ceil(Math.random() * 2);
          if (randomNumber == 1) {
            gameResult = "HEAD";
          } else if (randomNumber == 2) {
            gameResult = "TAIL";
          }
        }
      } else {
        gameResult = gameResultDetails;
      }

      const result = await coinGameService.updateCoinGame({
        id: gameId,
        body: {
          gameStatus: "ENDED",
          endDate: Date.now(),
          gameResult: gameResult,
        },
      });
      console.log("Game Ended", result._id);
      wsHelpers.emitNewEvent("coinGameEnded", result);
    }
  } catch (error) {
    console.log("error", error.message);
  }
};

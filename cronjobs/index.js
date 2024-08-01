const coinGameService = require("../services/coinGameService");
const mongoose = require("mongoose");
const cron = require("node-cron");
const wsHelpers = require("../helpers/wsHelpers");
const settingModel = require("../database/models/settingModel");

module.exports.createCoinGame = () => {
  cron.schedule("* * * * *", async () => {
    const mongooseState = mongoose.connection.readyState;
    try {
      if (mongooseState == 1) {
        const result = await coinGameService.createCoinGame();
        console.log("Game created", result.body._id);
        wsHelpers.emitNewEvent("coinGameCreated", result.body);

        // Start Game
        let startTimeout = setTimeout(() => {
          this.startCoinGame(result.body._id);
          // this.startCoinGame("65f28d38b4140fa5fdb8cd8b");
          clearTimeout(startTimeout);
        }, 30000);

        // End Game
        let endTimeout = setTimeout(() => {
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
      // const currentGame = await coinGameService.getCurrentCoinGame();

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
      // const gameDetails = await coinGameService.getCurrentCoinGame();

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

      // call deleteUnPlayedCoinGame
      const deletedGames = await coinGameService.deleteUnPlayedCoinGame();
      console.log("Deleted Games", deletedGames);

      wsHelpers.emitNewEvent("coinGameEnded", result);
    }
  } catch (error) {
    console.log("error", error.message);
  }
};

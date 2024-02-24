const express = require("express");
const router = express.Router();
const coinGameController = require("../controllers/coinGameController");
const coinGameValidationSchema = require("../apiValidationSchemas/coinGameValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");
const jwtValidation = require("../middlewares/jwtValidation");

// createCoinGame
router.post(
  "/",
  //   joiSchemaValidation.validateBody(coinGameValidationSchema.createCoinGame),
  jwtValidation.validateAdminToken,
  coinGameController.createCoinGame
);

// getAllCoinGames
router.get(
  "/",
  joiSchemaValidation.validateQuery(coinGameValidationSchema.getAllCoinGames),
  jwtValidation.validateAdminToken,
  coinGameController.getAllCoinGames
);

// getAllCoinGames
router.get(
  "/currentGame",
  // jwtValidation.validateAdminToken,
  coinGameController.getCurrentCoinGame
);

// getCoinGameById
router.get(
  "/:id",
  joiSchemaValidation.validateParams(coinGameValidationSchema.getCoinGameById),
  coinGameController.getCoinGameById
);

// updateCoinGame
router.put(
  "/:id",
  joiSchemaValidation.validateParams(coinGameValidationSchema.getCoinGameById),
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(coinGameValidationSchema.updateCoinGame),
  coinGameController.updateCoinGame
);

// deleteCoinGame
router.delete(
  "/:id",
  joiSchemaValidation.validateParams(coinGameValidationSchema.getCoinGameById),
  jwtValidation.validateAdminToken,
  coinGameController.deleteCoinGame
);

module.exports = router;

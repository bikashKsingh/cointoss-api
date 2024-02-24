const express = require("express");
const router = express.Router();
const coinGameBettingController = require("../controllers/coinGameBettingController");
const coinGameBettingValidationSchema = require("../apiValidationSchemas/coinGameBettingValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");
const jwtValidation = require("../middlewares/jwtValidation");

// createCoinGameBetting
router.post(
  "/",
  joiSchemaValidation.validateBody(
    coinGameBettingValidationSchema.createCoinGameBetting
  ),
  jwtValidation.validateCustomerToken,
  coinGameBettingController.createCoinGameBetting
);

// getAllCoinGameCustomersBettings
router.get(
  "/customerBettings",
  joiSchemaValidation.validateQuery(
    coinGameBettingValidationSchema.getAllCoinGameBettings
  ),
  jwtValidation.validateCustomerToken,
  coinGameBettingController.getAllCustomersCoinGameBettings
);

// getCoinGameBettingById
router.get(
  "/:id",
  joiSchemaValidation.validateParams(
    coinGameBettingValidationSchema.getCoinGameBettingById
  ),
  jwtValidation.validateAdminToken,
  coinGameBettingController.getCoinGameBettingById
);

// getAllCoinGameBettings
router.get(
  "/",
  joiSchemaValidation.validateQuery(
    coinGameBettingValidationSchema.getAllCoinGameBettings
  ),
  jwtValidation.validateAdminToken,
  coinGameBettingController.getAllCoinGameBettings
);

// updateCustomersCoinGameBetting
router.put(
  "/customerBettings/:id",
  joiSchemaValidation.validateParams(
    coinGameBettingValidationSchema.getCoinGameBettingById
  ),
  jwtValidation.validateCustomerToken,
  joiSchemaValidation.validateBody(
    coinGameBettingValidationSchema.updateCoinGameBetting
  ),
  coinGameBettingController.updateCustomersCoinGameBetting
);

// updateCoinGameBetting
router.put(
  "/:id",
  joiSchemaValidation.validateParams(
    coinGameBettingValidationSchema.getCoinGameBettingById
  ),
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(
    coinGameBettingValidationSchema.updateCoinGameBetting
  ),
  coinGameBettingController.updateCoinGameBetting
);

// deleteCoinGameBetting
router.delete(
  "/:id",
  joiSchemaValidation.validateParams(
    coinGameBettingValidationSchema.getCoinGameBettingById
  ),
  jwtValidation.validateAdminToken,
  coinGameBettingController.deleteCoinGameBetting
);

module.exports = router;

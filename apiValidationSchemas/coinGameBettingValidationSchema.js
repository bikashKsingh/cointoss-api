const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createCoinGameBetting
module.exports.createCoinGameBetting = Joi.object({
  coinGame: Joi.string().custom(customCallback).required().label("Coin Game"),
  bettingCoin: Joi.string()
    .valid("HEAD", "TAIL")
    .required()
    .label("Game Betting"),
  bettingAmount: Joi.number().required().label("Betting Amount"),
});

// getAllCoinGameBettings
module.exports.getAllCoinGameBettings = Joi.object({
  page: Joi.number().optional().label("Page"),
  limit: Joi.number().optional().label("Limit"),
  status: Joi.string().optional().label("Status"),
  bettingStatus: Joi.string()
    .valid("All", "PENDING", "ACCEPTED", "REJECTED", "FAILED")
    .label("Betting Status"),
  bettingCoin: Joi.string()
    .valid("All", "PENDING", "HEAD", "TAIL")
    .label("Game Betting"),
  gameResult: Joi.string().valid("All", "HEAD", "TAIL").label("Game Result"),
  customer: Joi.string().custom(customCallback).allow("").label("Customer"),
  coinGame: Joi.string().custom(customCallback).allow("").label("Coin Game"),
});

// getCoinGameBettingById
module.exports.getCoinGameBettingById = Joi.object({
  id: Joi.string().custom(customCallback),
});

// updateCoinGameBetting
module.exports.updateCoinGameBetting = Joi.object({
  bettingStatus: Joi.string()
    .valid("PENDING", "ACCEPTED", "REJECTED", "FAILED")
    .label("Betting Status"),
  coinGame: Joi.string().custom(customCallback).required().label("Coin Game"),
  bettingAmount: Joi.number().required().label("Betting Amount"),
  gameResult: Joi.string()
    .valid("HEAD", "TAIL")
    .required()
    .label("Game Result"),
});

// deleteCoinGameBetting
module.exports.deleteCoinGameBetting = Joi.object({
  id: Joi.string().custom(customCallback),
});

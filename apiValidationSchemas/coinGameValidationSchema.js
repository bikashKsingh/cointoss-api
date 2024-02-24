const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");

// createCoinGame
// module.exports.createCoinGame = Joi.object({
//   email: Joi.string().email().required().label("Email"),
// });

// getAllCoinGames
module.exports.getAllCoinGames = Joi.object({
  page: Joi.number().optional().label("Page"),
  limit: Joi.number().optional().label("Limit"),
  status: Joi.string().optional().label("Status"),
  gameStatus: Joi.string()
    .valid("All", "PENDING", "STARTED", "ENDED")
    .label("Game Status"),
  gameResult: Joi.string()
    .valid("", "PENDING", "HEAD", "TAIL")
    .label("Game Result"),
});

// getCoinGameById
module.exports.getCoinGameById = Joi.object({
  id: Joi.string().custom(customCallback),
});

// updateCoinGame
module.exports.updateCoinGame = Joi.object({
  gameStatus: Joi.string()
    .valid("PENDING", "STARTED", "ENDED")
    .label("Game Status"),
  gameResult: Joi.string()
    .valid("PENDING", "HEAD", "TAIL")
    .label("Game Result"),
});

// deleteCoinGame
module.exports.deleteCoinGame = Joi.object({
  id: Joi.string().custom(customCallback),
});

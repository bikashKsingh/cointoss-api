const Joi = require("joi");
const { customCallback } = require("../helpers/joiHelper");
const { transactionType } = require("../helpers/dbHelper");

// createWalletTransaction
module.exports.createWalletTransaction = Joi.object({
  amount: Joi.number().required().label("Amount"),
  utrNumber: Joi.number().required().label("UTR Number"),
  screenshort: Joi.string().allow("").label("Screenshort"),
});

// createWithdrawalRequest
module.exports.createWithdrawalRequest = Joi.object({
  amount: Joi.number().required().label("Amount"),
});

// getAllWalletTransactions
module.exports.getAllWalletTransactions = Joi.object({
  page: Joi.number().optional(),
  limit: Joi.number().optional(),
  status: Joi.string().optional(),
  transactionType: Joi.string().valid(
    transactionType.WITHDRAWAL_REQUEST,
    transactionType.WITHDRAWAL_REQUEST_REJECTED,
    transactionType.DEPOSIT_REQUEST,
    transactionType.DEPOSIT_REQUEST_REJECTED,
    transactionType.WALLET_WITHDRAWAL,
    transactionType.WALLET_DEPOSIT,
    transactionType.GAME_DEPOSIT,
    transactionType.GAME_WITHDRAWAL,
    transactionType.REFERRAL_DEPOSIT,
    transactionType.REFERRED_DEPOSIT,
    transactionType.All
  ),
  transactionTypes: Joi.array().items(
    Joi.string().valid(
      transactionType.WITHDRAWAL_REQUEST,
      transactionType.WITHDRAWAL_REQUEST_REJECTED,
      transactionType.DEPOSIT_REQUEST,
      transactionType.DEPOSIT_REQUEST_REJECTED,
      transactionType.WALLET_WITHDRAWAL,
      transactionType.WALLET_DEPOSIT,
      transactionType.GAME_DEPOSIT,
      transactionType.GAME_WITHDRAWAL,
      transactionType.REFERRAL_DEPOSIT,
      transactionType.REFERRED_DEPOSIT,
      transactionType.All
    )
  ),
  customer: Joi.string().custom(customCallback),
});

// getWalletTransactionById
module.exports.getWalletTransactionById = Joi.object({
  id: Joi.string().custom(customCallback),
});

// updateWalletTransaction
module.exports.updateWalletTransaction = Joi.object({
  transactionType: Joi.string().valid(
    transactionType.WITHDRAWAL_REQUEST_REJECTED,
    transactionType.DEPOSIT_REQUEST_REJECTED,
    transactionType.WALLET_WITHDRAWAL,
    transactionType.WALLET_DEPOSIT
  ),
});

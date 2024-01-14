const walletTransactionHistoryService = require("../services/walletTransactionHistoryService");
const constants = require("../constants");

// createWalletTransaction
module.exports.createWalletTransaction = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse =
      await walletTransactionHistoryService.createWalletTransaction(req.body);
    response.status = 200;
    response.message =
      constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_CREATED;
    response.body = serviceResponse;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : walletTransactionHistoryController: createWalletTransaction`
    );
  }
  res.status(response.status).send(response);
};

// getAllWalletTransactions
module.exports.get = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse =
      await walletTransactionHistoryService.getAllWalletTransactions(req.query);
    response.status = 200;
    response.message = constants.walletTransactionHistoryMessage.COUPON_FETCHED;
    response.body = serviceResponse.body;
    response.page = serviceResponse.page;
    response.totalRecords = serviceResponse.totalRecords;
    response.totalPages = serviceResponse.totalPages;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : walletTransactionHistoryController: getAllWalletTransactions`,
      error.message
    );
  }
  res.status(response.status).send(response);
};

// validateCoupon
module.exports.validateCoupon = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse =
      await walletTransactionHistoryService.validateCoupon(req.params);
    response.status = 200;
    response.message =
      constants.walletTransactionHistoryMessage.COUPON_VERIFIED;
    response.body = serviceResponse;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : walletTransactionHistoryController: validateCoupon`,
      error.message
    );
  }
  res.status(response.status).send(response);
};

// getCouponById
module.exports.getCouponById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await walletTransactionHistoryService.getCouponById(
      req.params
    );

    response.status = 200;
    response.message = constants.walletTransactionHistoryMessage.COUPON_FETCHED;
    response.body = serviceResponse;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : walletTransactionHistoryController : getCouponById`
    );
  }
  res.status(response.status).send(response);
};

// deleteCoupon
module.exports.deleteCoupon = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await walletTransactionHistoryService.deleteCoupon(
      req.params
    );
    response.status = 200;
    response.message = constants.walletTransactionHistoryMessage.COUPON_DELETED;
    response.body = serviceResponse;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : walletTransactionHistoryController:  deleteCcoupon`
    );
  }
  res.status(response.status).send(response);
};

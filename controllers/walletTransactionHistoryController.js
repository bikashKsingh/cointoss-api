const walletTransactionHistoryService = require("../services/walletTransactionHistoryService");
const constants = require("../constants");

/*
 ******************************
 ********CUSTOMER BLOCK********
 ******************************
 */

// createWalletTransaction
module.exports.createWalletTransaction = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse =
      await walletTransactionHistoryService.createWalletTransaction({
        customer: req.params.customerId,
        ...req.body,
      });
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

// createWithdrawalRequest
module.exports.createWithdrawalRequest = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse =
      await walletTransactionHistoryService.createWithdrawalRequest({
        customer: req.params.customerId,
        ...req.body,
      });
    response.status = 200;
    response.message =
      constants.walletTransactionHistoryMessage.WITHDRAWAL_REQUEST_CREATED;
    response.body = serviceResponse;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : walletTransactionHistoryController: createWithdrawalRequest`
    );
  }
  res.status(response.status).send(response);
};

// getCustomerWalletTransactions
module.exports.getCustomerWalletTransactions = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse =
      await walletTransactionHistoryService.getCustomerWalletTransactions({
        ...req.query,
        customerId: req.params.customerId,
      });
    response.status = 200;
    response.message =
      constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_FETCHED;
    response.body = serviceResponse.body;
    response.page = serviceResponse.page;
    response.totalRecords = serviceResponse.totalRecords;
    response.totalPages = serviceResponse.totalPages;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : walletTransactionHistoryController: getCustomerWalletTransactions`,
      error.message
    );
  }
  res.status(response.status).send(response);
};

// getCustomerWalletTransactionById
module.exports.getCustomerWalletTransactionById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse =
      await walletTransactionHistoryService.getCustomerWalletTransactionById(
        req.query
      );
    response.status = 200;
    response.message =
      constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_FETCHED;
    response.body = serviceResponse;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : walletTransactionHistoryController: getCustomerWalletTransactionById`,
      error.message
    );
  }
  res.status(response.status).send(response);
};

/*
 ******************************
 *****END CUSTOMER BLOCK*******
 ******************************
 */

/*
 ******************************
 **********ADMIN BLOCK*********
 ******************************
 */

// getWalletTransactionById
module.exports.getWalletTransactionById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse =
      await walletTransactionHistoryService.getWalletTransactionById(
        req.params
      );
    response.status = 200;
    response.message =
      constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_FETCHED;
    response.body = serviceResponse;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : walletTransactionHistoryController: getWalletTransactionById`,
      error.message
    );
  }
  res.status(response.status).send(response);
};

// getAllWalletTransactions
module.exports.getAllWalletTransactions = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse =
      await walletTransactionHistoryService.getAllWalletTransactions(req.query);
    response.status = 200;
    response.message =
      constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_FETCHED;
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

// updateWalletTransaction
module.exports.updateWalletTransaction = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse =
      await walletTransactionHistoryService.updateWalletTransaction({
        id: req.params.id,
        body: req.body,
      });
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message =
        constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_UPDATED;
    } else {
      response.message =
        constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_NOT_UPDATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: walletTransactionHistoryController: updateWalletTransaction`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// deleteWalletTransaction
module.exports.deleteWalletTransaction = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse =
      await walletTransactionHistoryService.deleteWalletTransaction(req.params);
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message =
        constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_DELETED;
    } else {
      response.message =
        constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_NOT_DELETED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: walletTransactionHistoryController: deleteWalletTransaction`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

/*
 ******************************
 *******END ADMIN BLOCK********
 ******************************
 */

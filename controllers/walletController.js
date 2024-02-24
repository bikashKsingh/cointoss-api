const walletTransactionHistoryService = require("../services/walletTransactionHistoryService");
const walletService = require("../services/walletService");
const constants = require("../constants");

/*
 ******************************
 ********CUSTOMER BLOCK********
 ******************************
 */

// createWalletTransaction
// module.exports.createWalletTransaction = async (req, res) => {
//   const response = { ...constants.defaultServerResponse };
//   try {
//     const serviceResponse =
//       await walletTransactionHistoryService.createWalletTransaction({
//         customer: req.params.customerId,
//         ...req.body,
//       });
//     response.status = 200;
//     response.message =
//       constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_CREATED;
//     response.body = serviceResponse;
//   } catch (error) {
//     response.message = error.message;
//     console.log(
//       `Something went Wrong Controller : walletTransactionHistoryController: createWalletTransaction`
//     );
//   }
//   res.status(response.status).send(response);
// };

// getCustomerWalletTransactions
// module.exports.getCustomerWalletTransactions = async (req, res) => {
//   const response = { ...constants.defaultServerResponse };
//   try {
//     const serviceResponse =
//       await walletTransactionHistoryService.getCustomerWalletTransactions(
//         req.query
//       );
//     response.status = 200;
//     response.message =
//       constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_FETCHED;
//     response.body = serviceResponse.body;
//     response.page = serviceResponse.page;
//     response.totalRecords = serviceResponse.totalRecords;
//     response.totalPages = serviceResponse.totalPages;
//   } catch (error) {
//     response.message = error.message;
//     console.log(
//       `Something went Wrong Controller : walletTransactionHistoryController: getCustomerWalletTransactions`,
//       error.message
//     );
//   }
//   res.status(response.status).send(response);
// };

// getCustomerWalletTransactionById
// module.exports.getCustomerWalletTransactionById = async (req, res) => {
//   const response = { ...constants.defaultServerResponse };
//   try {
//     const serviceResponse =
//       await walletTransactionHistoryService.getCustomerWalletTransactionById(
//         req.query
//       );
//     response.status = 200;
//     response.message =
//       constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_FETCHED;
//     response.body = serviceResponse;
//   } catch (error) {
//     response.message = error.message;
//     console.log(
//       `Something went Wrong Controller : walletTransactionHistoryController: getCustomerWalletTransactionById`,
//       error.message
//     );
//   }
//   res.status(response.status).send(response);
// };

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
// module.exports.getWalletTransactionById = async (req, res) => {
//   const response = { ...constants.defaultServerResponse };
//   try {
//     const serviceResponse =
//       await walletTransactionHistoryService.getWalletTransactionById(req.query);
//     response.status = 200;
//     response.message =
//       constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_FETCHED;
//     response.body = serviceResponse;
//   } catch (error) {
//     response.message = error.message;
//     console.log(
//       `Something went Wrong Controller : walletTransactionHistoryController: getWalletTransactionById`,
//       error.message
//     );
//   }
//   res.status(response.status).send(response);
// };

// getAllWallets
module.exports.getAllWallets = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await walletService.getAllWallets(req.query);
    response.status = 200;
    response.message = constants.walletMessage.WALLET_FETCHED;
    response.body = serviceResponse.body;
    response.page = serviceResponse.page;
    response.totalRecords = serviceResponse.totalRecords;
    response.totalPages = serviceResponse.totalPages;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : walletController: getAllWallets`,
      error.message
    );
  }
  res.status(response.status).send(response);
};

// deleteWalletTransaction
// module.exports.deleteWalletTransaction = async (req, res) => {
//   const response = { ...constants.defaultServerResponse };
//   try {
//     const serviceResponse =
//       await walletTransactionHistoryService.deleteWalletTransaction(req.params);
//     if (serviceResponse) {
//       response.body = serviceResponse;
//       response.status = 200;
//       response.message =
//         constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_DELETED;
//     } else {
//       response.message =
//         constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_NOT_DELETED;
//     }
//   } catch (error) {
//     console.log(
//       `Somthing Went Wrong Controller: walletTransactionHistoryController: deleteWalletTransaction`,
//       error.message
//     );
//     response.message = error.message;
//   }
//   res.status(response.status).send(response);
// };

/*
 ******************************
 *******END ADMIN BLOCK********
 ******************************
 */

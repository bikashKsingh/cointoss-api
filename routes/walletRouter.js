const express = require("express");
const router = express.Router();
const walletTransactionHistoryController = require("../controllers/walletTransactionHistoryController");
const walletController = require("../controllers/walletController");
const walletTransactionHistoryValidationSchema = require("../apiValidationSchemas/walletTransactionHistoryValidationSchema");
const walletValidationSchema = require("../apiValidationSchemas/walletValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");
const jwtValidation = require("../middlewares/jwtValidation");

// createWalletTransaction
// router.post(
//   "/",
//   joiSchemaValidation.validateBody(
//     walletTransactionHistoryValidationSchema.createWalletTransaction
//   ),
//   jwtValidation.validateCustomerToken,
//   walletTransactionHistoryController.createWalletTransaction
// );

// getAllWallets
router.get(
  "/",
  joiSchemaValidation.validateQuery(walletValidationSchema.getAllWallets),
  jwtValidation.validateAdminToken,
  walletController.getAllWallets
);

// getCustomerWalletTransactions
// router.get(
//   "/users",
//   joiSchemaValidation.validateQuery(
//     walletTransactionHistoryValidationSchema.getAllWalletTransactions
//   ),
//   jwtValidation.validateCustomerToken,
//   walletTransactionHistoryController.getCustomerWalletTransactions
// );

// getCustomerWalletTransactions
// router.get(
//   "/users/:id",
//   joiSchemaValidation.validateQuery(
//     walletTransactionHistoryValidationSchema.getWalletTransactionById
//   ),
//   jwtValidation.validateCustomerToken,
//   walletTransactionHistoryController.getCustomerWalletTransactionById
// );

// getWalletTransactionById
// router.get(
//   "/:id",
//   joiSchemaValidation.validateParams(
//     walletTransactionHistoryValidationSchema.getWalletTransactionById
//   ),
//   jwtValidation.validateAdminToken,
//   walletTransactionHistoryController.getWalletTransactionById
// );

// deleteWalletTransaction
// router.delete(
//   "/:id",
//   joiSchemaValidation.validateParams(
//     walletTransactionHistoryValidationSchema.getWalletTransactionById
//   ),
//   jwtValidation.validateAdminToken,
//   walletTransactionHistoryController.deleteWalletTransaction
// );

module.exports = router;

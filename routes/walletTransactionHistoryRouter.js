const express = require("express");
const router = express.Router();
const walletTransactionHistoryController = require("../controllers/walletTransactionHistoryController");
const walletTransactionHistoryValidationSchema = require("../apiValidationSchemas/walletTransactionHistoryValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");
const jwtValidation = require("../middlewares/jwtValidation");

// createWalletTransaction
router.post(
  "/",
  joiSchemaValidation.validateBody(
    walletTransactionHistoryValidationSchema.createWalletTransaction
  ),
  jwtValidation.validateCustomerToken,
  walletTransactionHistoryController.createWalletTransaction
);

// createWalletTransaction
router.post(
  "/withdrawRequest",
  joiSchemaValidation.validateBody(
    walletTransactionHistoryValidationSchema.createWithdrawalRequest
  ),
  jwtValidation.validateCustomerToken,
  walletTransactionHistoryController.createWithdrawalRequest
);

// getAllWalletTransactions
router.get(
  "/",
  joiSchemaValidation.validateQuery(
    walletTransactionHistoryValidationSchema.getAllWalletTransactions
  ),
  jwtValidation.validateAdminToken,
  walletTransactionHistoryController.getAllWalletTransactions
);

// getCustomerWalletTransactions
router.get(
  "/users",
  joiSchemaValidation.validateQuery(
    walletTransactionHistoryValidationSchema.getAllWalletTransactions
  ),
  jwtValidation.validateCustomerToken,
  walletTransactionHistoryController.getCustomerWalletTransactions
);

// getCustomerWalletTransactions
router.get(
  "/users/:id",
  joiSchemaValidation.validateQuery(
    walletTransactionHistoryValidationSchema.getWalletTransactionById
  ),
  jwtValidation.validateCustomerToken,
  walletTransactionHistoryController.getCustomerWalletTransactionById
);

// getWalletTransactionById
router.get(
  "/:id",
  joiSchemaValidation.validateParams(
    walletTransactionHistoryValidationSchema.getWalletTransactionById
  ),
  jwtValidation.validateAdminToken,
  walletTransactionHistoryController.getWalletTransactionById
);

// getWalletTransactionById
router.put(
  "/:id",
  joiSchemaValidation.validateParams(
    walletTransactionHistoryValidationSchema.getWalletTransactionById
  ),
  joiSchemaValidation.validateBody(
    walletTransactionHistoryValidationSchema.updateWalletTransaction
  ),
  jwtValidation.validateAdminToken,
  walletTransactionHistoryController.updateWalletTransaction
);

// deleteWalletTransaction
router.delete(
  "/:id",
  joiSchemaValidation.validateParams(
    walletTransactionHistoryValidationSchema.getWalletTransactionById
  ),
  jwtValidation.validateAdminToken,
  walletTransactionHistoryController.deleteWalletTransaction
);

module.exports = router;

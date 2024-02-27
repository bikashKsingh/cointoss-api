const walletTransactionHistoryModel = require("../database/models/walletTransactionHistoryModel");
const constants = require("../constants");
const dbHelpers = require("../helpers/dbHelper");
const customerModel = require("../database/models/customerModel");
const wsHelpers = require("../helpers/wsHelpers");
/*
 ******************************
 ********CUSTOMER BLOCK********
 ******************************
 */

// createWalletTransaction
module.exports.createWalletTransaction = async (serviceData) => {
  try {
    serviceData.description = "User Added Amount";
    serviceData.transactionType = dbHelpers.transactionType.DEPOSIT_REQUEST;
    const newData = new walletTransactionHistoryModel(serviceData);
    const result = await newData.save();
    if (result) {
      wsHelpers.emitNewEvent("transactionAdded", result._id);
      return dbHelpers.formatMongoData(result);
    } else {
      throw new Error(
        constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_CREATED
      );
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: walletTransactionHistoryService:  createWalletTransaction`,
      error.message
    );
    throw new Error(error);
  }
};

// createWithdrawalRequest
module.exports.createWithdrawalRequest = async (serviceData) => {
  try {
    // get customer details
    const customerDetails = await customerModel.findOne({
      _id: serviceData.customer,
    });
    const walletAmount = customerDetails.wallet;
    if (walletAmount < serviceData.amount) {
      throw new Error("You have not sufficient amount");
    }

    serviceData.transactionType = "WITHDRAWAL_REQUEST";
    const newData = new walletTransactionHistoryModel(serviceData);
    const result = await newData.save();

    if (result) {
      // withdrawal money from the wallet
      const afterWithdrawalWalletAmount = walletAmount - serviceData.amount;

      // update wallet amount
      const updateWalletAmount = await customerModel.findByIdAndUpdate(
        serviceData.customer,
        {
          wallet: afterWithdrawalWalletAmount,
        }
      );

      wsHelpers.emitNewEvent(
        wsHelpers.events.WITHDRAWAL_REQUEST_CREATED,
        result._id
      );
      return dbHelpers.formatMongoData(result);
    } else {
      throw new Error(
        constants.walletTransactionHistoryMessage.WITHDRAWAL_REQUEST_CREATED
      );
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: walletTransactionHistoryService:  createWithdrawalRequest`,
      error.message
    );
    throw new Error(error);
  }
};

// getCustomerWalletTransactions
module.exports.getCustomerWalletTransactions = async (serviceData) => {
  try {
    const {
      limit = 10,
      page = 1,
      transactionType,
      transactionTypes = [],
    } = serviceData;

    let conditions = {
      customer: serviceData.customerId,
    };

    // Check Subscription Status
    if (transactionType) conditions.transactionType = transactionType;
    if (transactionType == "All") delete conditions.transactionType;

    // transactionTypes
    if (transactionTypes.length) {
      conditions.transactionType = { $in: transactionTypes };
    }

    // count record
    const totalRecords = await walletTransactionHistoryModel.countDocuments(
      conditions
    );
    // Calculate the total number of pages
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const result = await walletTransactionHistoryModel
      .find(conditions)
      .populate({ path: "customer", select: "firstName" })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    if (result) {
      const res = {
        body: dbHelpers.formatMongoData(result),
        page,
        totalPages,
        totalRecords,
      };
      return res;
    } else {
      throw new Error(
        constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_NOT_FETCHED
      );
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: walletTransactionHistoryService: getCustomerWalletTransactions`,
      error.message
    );
    throw new Error(error);
  }
};

// getCustomerWalletTransactionById
module.exports.getCustomerWalletTransactionById = async (serviceData) => {
  try {
    const { id, customerId } = serviceData;
    let conditions = {
      customer: customerId,
      _id: id,
    };

    const result = await walletTransactionHistoryModel
      .findOne(conditions)
      .populate({ path: "customer", select: "firstName" });

    if (result) {
      return dbHelpers.formatMongoData(result);
    } else {
      throw new Error(
        constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_NOT_FETCHED
      );
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: walletTransactionHistoryService: getCustomerWalletTransactionById`,
      error.message
    );
    throw new Error(error);
  }
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
module.exports.getWalletTransactionById = async (serviceData) => {
  try {
    const result = await walletTransactionHistoryModel
      .findOne({ _id: serviceData.id })
      .populate({ path: "customer", select: "firstName" });

    if (result) {
      return dbHelpers.formatMongoData(result);
    } else {
      throw new Error(
        constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_NOT_FETCHED
      );
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: walletTransactionHistoryService: getWalletTransactionById`,
      error.message
    );
    throw new Error(error);
  }
};

// getAllWalletTransactions
module.exports.getAllWalletTransactions = async (serviceData) => {
  const {
    limit = 10,
    page = 1,
    isDeleted = false,
    transactionType = "All",
    customer,
  } = serviceData;

  let conditions = { isDeleted };

  // Check Subscription Status
  if (transactionType) conditions.transactionType = transactionType;
  if (transactionType == "All") delete conditions.transactionType;
  if (customer) conditions.customer = customer;

  try {
    // count record
    const totalRecords = await walletTransactionHistoryModel.countDocuments(
      conditions
    );
    // Calculate the total number of pages
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const result = await walletTransactionHistoryModel
      .find(conditions)
      .limit(parseInt(limit))
      .populate({ path: "customer", select: "firstName lastName" })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ _id: -1 });

    if (result) {
      const res = {
        body: dbHelpers.formatMongoData(result),
        page,
        totalPages,
        totalRecords,
      };
      return res;
    } else {
      throw new Error(
        constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_NOT_FETCHED
      );
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: walletTransactionHistoryService: getAllWalletTransactions`,
      error.message
    );
    throw new Error(error);
  }
};

// updateWalletTransaction
module.exports.updateWalletTransaction = async (serviceData) => {
  try {
    const { id, body } = serviceData;

    // WALLET_DEPOSIT || WITHDRAWAL_REQUEST_REJECTED
    if (
      body.transactionType === dbHelpers.transactionType.WALLET_DEPOSIT ||
      body.transactionType ===
        dbHelpers.transactionType.WITHDRAWAL_REQUEST_REJECTED
    ) {
      // get transaction history details
      const transactionHistory = await walletTransactionHistoryModel.findById(
        id
      );

      // get customer details
      const customerDetails = await customerModel.findById(
        transactionHistory.customer
      );

      // update wallet amount
      const updateWallet = await customerModel.findOneAndUpdate(
        { _id: customerDetails._id },
        { wallet: customerDetails.wallet + transactionHistory.amount },
        { new: true }
      );
    }

    // WALLET_WITHDRAWAL : DO NOTHING
    // DEPOSIT_REQUEST_REJECTED : DO NOTHING

    // set description
    if (
      body.transactionType ===
      dbHelpers.transactionType.WITHDRAWAL_REQUEST_REJECTED
    ) {
      body.description = "Withdrawal Rejected by Admin";
    } else if (
      body.transactionType ===
      dbHelpers.transactionType.DEPOSIT_REQUEST_REJECTED
    ) {
      body.description = "Deposit Rejected by Admin";
    }

    const result = await walletTransactionHistoryModel.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );
    return dbHelpers.formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: walletTransactionHistoryService: updateWalletTransaction`,
      error.message
    );
    throw new Error(error);
  }
};

// deleteWalletTransaction
module.exports.deleteWalletTransaction = async (serviceData) => {
  const { id } = serviceData;
  try {
    const result = await walletTransactionHistoryModel.findOneAndUpdate(
      { _id: id },
      {
        isDeleted: true,
        status: false,
      },
      { new: true }
    );

    if (result) {
      return dbHelpers.formatMongoData(result);
    } else {
      throw new Error(
        constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_NOT_DELETED
      );
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: walletTransactionHistoryService: deleteWalletTransaction`,
      error.message
    );
    throw new Error(error);
  }
};
/*
 ******************************
 *******END ADMIN BLOCK********
 ******************************
 */

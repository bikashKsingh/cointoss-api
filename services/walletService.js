const walletTransactionHistoryModel = require("../database/models/walletTransactionHistoryModel");
const customerModel = require("../database/models/customerModel");
const constants = require("../constants");
const dbHelpers = require("../helpers/dbHelper");

/*
 ******************************
 ********CUSTOMER BLOCK********
 ******************************
 */

// createWalletTransaction
// module.exports.createWalletTransaction = async (serviceData) => {
//   try {
//     serviceData.description = "User Added Amount";
//     serviceData.transactionType = "REQUEST";
//     const newData = new walletTransactionHistoryModel(serviceData);
//     const result = await newData.save();
//     if (result) {
//       return dbHelpers.formatMongoData(result);
//     } else {
//       throw new Error(
//         constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_CREATED
//       );
//     }
//   } catch (error) {
//     console.log(
//       `Somthing Went Wrong Service: walletTransactionHistoryService:  createWalletTransaction`,
//       error.message
//     );
//     throw new Error(error);
//   }
// };

// getCustomerWalletTransactions
// module.exports.getCustomerWalletTransactions = async (serviceData) => {
//   try {
//     const { limit = 10, page = 1, transactionType } = serviceData;
//     let conditions = {
//       customer: serviceData.customerId,
//     };

//     // Check Subscription Status
//     if (transactionType) conditions.transactionType = transactionType;
//     if (transactionType == "All") delete conditions.transactionType;

//     // count record
//     const totalRecords = await walletTransactionHistoryModel.countDocuments(
//       conditions
//     );
//     // Calculate the total number of pages
//     const totalPages = Math.ceil(totalRecords / parseInt(limit));

//     const result = await walletTransactionHistoryModel
//       .find(conditions)
//       .populate({ path: "customer", select: "firstName" })
//       .skip((parseInt(page) - 1) * parseInt(limit))
//       .limit(parseInt(limit))
//       .sort({ createdAt: -1 });

//     if (result) {
//       const res = {
//         body: dbHelpers.formatMongoData(result),
//         page,
//         totalPages,
//         totalRecords,
//       };
//       return res;
//     } else {
//       throw new Error(
//         constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_NOT_FETCHED
//       );
//     }
//   } catch (error) {
//     console.log(
//       `Somthing Went Wrong Service: walletTransactionHistoryService: getCustomerWalletTransactions`,
//       error.message
//     );
//     throw new Error(error);
//   }
// };

// getCustomerWalletTransactionById
// module.exports.getCustomerWalletTransactionById = async (serviceData) => {
//   try {
//     const { id, customerId } = serviceData;
//     let conditions = {
//       customer: customerId,
//       _id: id,
//     };

//     const result = await walletTransactionHistoryModel
//       .findOne(conditions)
//       .populate({ path: "customer", select: "firstName" });

//     if (result) {
//       return dbHelpers.formatMongoData(result);
//     } else {
//       throw new Error(
//         constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_NOT_FETCHED
//       );
//     }
//   } catch (error) {
//     console.log(
//       `Somthing Went Wrong Service: walletTransactionHistoryService: getCustomerWalletTransactionById`,
//       error.message
//     );
//     throw new Error(error);
//   }
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
// module.exports.getWalletTransactionById = async (serviceData) => {
//   try {
//     const result = await walletTransactionHistoryModel
//       .findOne({ _id: serviceData.id })
//       .populate({ path: "customer", select: "firstName" });

//     if (result) {
//       return dbHelpers.formatMongoData(result);
//     } else {
//       throw new Error(
//         constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_NOT_FETCHED
//       );
//     }
//   } catch (error) {
//     console.log(
//       `Somthing Went Wrong Service: walletTransactionHistoryService: getWalletTransactionById`,
//       error.message
//     );
//     throw new Error(error);
//   }
// };

// getAllWallets
module.exports.getAllWallets = async (serviceData) => {
  const {
    limit = 10,
    page = 1,
    isDeleted = false,
    searchQuery = "",
    customer,
  } = serviceData;

  let conditions = { isDeleted };

  if (customer) conditions.customer = customer;

  // SearchQuery
  if (searchQuery) {
    conditions = {
      $or: [
        { firstName: { $regex: searchQuery, $options: "i" } },
        { lastName: { $regex: searchQuery, $options: "i" } },
        { mobile: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
      ],
    };
  }

  try {
    // count record
    const totalRecords = await customerModel.countDocuments(conditions);
    // Calculate the total number of pages
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const result = await customerModel
      .find(conditions)
      .select({
        firstName: 1,
        lastName: 1,
        mobile: 1,
        email: 1,
        wallet: 1,
        createdAt: 1,
      })
      .limit(parseInt(limit))
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
      throw new Error(constants.walletMessage.WALLET_NOT_FETCHED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: walletService: getAllWallets`,
      error.message
    );
    throw new Error(error);
  }
};

// deleteWalletTransaction
// module.exports.deleteWalletTransaction = async (serviceData) => {
//   const { id } = serviceData;
//   try {
//     const result = await walletTransactionHistoryModel.findOneAndUpdate(
//       { _id: id },
//       {
//         isDeleted: true,
//         status: false,
//       },
//       { new: true }
//     );

//     if (result) {
//       return dbHelpers.formatMongoData(result);
//     } else {
//       throw new Error(
//         constants.walletTransactionHistoryMessage.WALLET_TRANSACTION_NOT_DELETED
//       );
//     }
//   } catch (error) {
//     console.log(
//       `Somthing Went Wrong Service: walletTransactionHistoryService: deleteWalletTransaction`,
//       error.message
//     );
//     throw new Error(error);
//   }
// };
/*
 ******************************
 *******END ADMIN BLOCK********
 ******************************
 */

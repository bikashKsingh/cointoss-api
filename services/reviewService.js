const reviewModel = require("../database/models/reviewModel");
const { formatMongoData } = require("../helpers/dbHelper");
const constants = require("../constants");
const _ = require("lodash");
const mongoose = require("mongoose");

// createReview
module.exports.createReview = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    serviceData.body.customer = serviceData.customerId;
    const newData = new reviewModel(serviceData.body);
    const dbResponse = await newData.save();
    if (dbResponse) {
      response.body = formatMongoData(dbResponse);
      response.status = 200;
    } else {
      response.errors = {
        error: constants.reviewsMessage.REVIEWS_NOT_CREATED,
      };
      response.message = constants.reviewsMessage.REVIEWS_NOT_CREATED;
    }
    return response;
  } catch (error) {
    console.log(
      `Something went wrong service : reviewService : createReview\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};

// getAllReviews
module.exports.getAllReviews = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const {
      limit = 10,
      page = 1,
      status = "true",
      searchQuery,
      reviewStatus = "PENDING",
      product,
      ratings,
    } = serviceData;
    let conditions = {};
    conditions.isDeleted = false;

    if (status == "true" || status == "false") {
      conditions.status = status;
    }

    if (reviewStatus == "PENDING" || reviewStatus == "APPROVED") {
      conditions.reviewStatus = reviewStatus;
    }

    if (product) {
      conditions.product = product;
    }

    if (ratings) {
      conditions.ratings = ratings;
    }

    // search query
    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i");
      conditions.$or = [{ comment: regex }];
    }

    // count document
    const totalRecords = await reviewModel.countDocuments(conditions);
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    // Calculate Avarage Retings
    const matchConditions = {
      reviewStatus: "APPROVED",
      status: true,
      isDeleted: false,
    };
    if (product) matchConditions.product = new mongoose.Types.ObjectId(product);
    const aggregationPipeline = [
      { $match: matchConditions },
      { $group: { _id: null, averageRating: { $avg: "$ratings" } } },
    ];

    const averageRatings = await reviewModel.aggregate(aggregationPipeline);

    const averageRating =
      averageRatings.length > 0 ? averageRatings[0].averageRating : 0;

    const dbResponse = await reviewModel
      .find(conditions)
      .populate({ path: "product", select: "name _id" })
      .populate({ path: "customer", select: "firstName _id" })
      .skip(parseInt(page - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    if (!dbResponse) {
      response.errors = {
        error: constants.reviewsMessage.REVIEWS_NOT_FOUND,
      };
      response.message = constants.reviewsMessage.REVIEWS_NOT_FOUND;
      return response;
    }

    response.status = 200;
    const formatData = formatMongoData(dbResponse);

    return {
      body: formatData,
      totalPages,
      totalRecords,
      page,
      averageRating,
    };
  } catch (error) {
    console.log(
      `Something went wrong: Service: reviewService: getAllReviews\nError: ${error.message}`
    );
    throw new Error(error);
  }
};

// getMyReviews
module.exports.getMyReview = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const {
      limit = 10,
      page = 1,
      status = "true",
      searchQuery,
      reviewStatus = "PENDING",
      product,
      ratings,
    } = serviceData;

    let conditions = {};
    conditions.isDeleted = false;
    conditions.customer = serviceData.customerId; // Filter reviews for the specific user

    if (status == "true" || status == "false") {
      conditions.status = status;
    }

    if (reviewStatus == "PENDING" || reviewStatus == "APPROVED") {
      conditions.reviewStatus = reviewStatus;
    }

    if (product) {
      conditions.product = product;
    }

    if (ratings) {
      conditions.ratings = ratings;
    }

    // search query
    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i");
      conditions.$or = [{ comment: regex }];
    }

    // count document
    const totalRecords = await reviewModel.countDocuments(conditions);
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const aggregationPipeline = [
      { $group: { _id: null, averageRating: { $avg: "$ratings" } } },
    ];

    const averageRatings = await reviewModel.aggregate(aggregationPipeline);

    const averageRating =
      averageRatings.length > 0 ? averageRatings[0].averageRating : 0;

    const dbResponse = await reviewModel
      .find(conditions)
      .skip(parseInt(page - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .populate({ path: "product", select: "name _id" })
      .populate({ path: "customer", select: "firstName _id" });

    if (!dbResponse) {
      response.errors = {
        error: constants.reviewsMessage.REVIEWS_NOT_FOUND,
      };
      response.message = constants.reviewsMessage.REVIEWS_NOT_FOUND;
      return response;
    }

    response.status = 200;
    const formatData = formatMongoData(dbResponse);

    return {
      body: formatData,
      totalPages,
      totalRecords,
      page,
      averageRating,
    };
  } catch (error) {
    console.log(
      `Something went wrong: Service: reviewService: getMyReview\nError: ${error.message}`
    );
    throw new Error(error);
  }
};

// getReviewById
module.exports.getReviewById = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const dbResponse = await reviewModel
      .findOne({
        _id: serviceData.id,
        isDeleted: false,
      })
      .populate({ path: "product", select: "name _id" })
      .populate({ path: "customer", select: "firstName _id" });

    if (!dbResponse) {
      response.errors = {
        error: constants.reviewsMessage.REVIEWS_NOT_FOUND,
      };
      response.message = constants.reviewsMessage.REVIEWS_NOT_FOUND;
      return response;
    }
    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Something went wrong: service : ReviewService : getReviewById`
    );
    throw new Error(error);
  }
};

// updateReview By Admin
module.exports.updateReview = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const { id, body } = serviceData;
    const dbResponse = await reviewModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!dbResponse) {
      response.errors = {
        error: constants.reviewsMessage.REVIEWS_NOT_UPDATED,
      };
      response.message = constants.reviewsMessage.REVIEWS_NOT_UPDATED;
    } else {
      response.body = formatMongoData(dbResponse);
      response.status = 200;
    }
    return response;
  } catch (error) {
    console.log(
      `Something went wrong: Service : reviewService : updateReview ${error.message}`
    );
    throw new Error(error);
  }
};

// updateReview By User
module.exports.updateReviewByUser = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const { id, body } = serviceData;
    const dbResponse = await reviewModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!dbResponse) {
      response.errors = {
        error: constants.reviewsMessage.REVIEWS_NOT_UPDATED,
      };
      response.message = constants.reviewsMessage.REVIEWS_NOT_UPDATED;
      return response;
    }
    response.body = formatMongoData(dbResponse);
    response.status = 200;
  } catch (error) {
    console.log(
      `Something went wrong: Service : reviewService : updateReviewByUser ${error.message}`
    );
    throw new Error(error);
  }
};

// deleteReview
module.exports.deleteReview = async (serviceData) => {
  try {
    const response = _.cloneDeep(constants.defaultServerResponse);
    const isReviewExist = await reviewModel.findOne({
      _id: serviceData.id,
      isDeleted: true,
    });
    if (isReviewExist) {
      response.errors = {
        name: constants.reviewsMessage.REVIEWS_NOT_EXISTS,
      };
      return response;
    }

    const dbResponse = await reviewModel.findOneAndUpdate(
      { _id: serviceData.id },
      { isDeleted: true },
      { new: true }
    );

    if (!dbResponse) {
      response.errors = {
        error: constants.reviewsMessage.REVIEWS_NOT_DELETED,
      };
      return response;
    }

    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(`Something went wrong: service : reviewService : deleteReview`);
    throw new Error(error);
  }
};

const constants = require("../constants");
const reviewService = require("../services/reviewService");
const _ = require("lodash");

// createReview
module.exports.createReview = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const reveiwResponse = await reviewService.createReview({
      customerId: req.params.customerId,
      body: req.body,
    });

    if (reveiwResponse.status === 400) {
      response.errors = reveiwResponse.errors;
      response.message = reveiwResponse.message;
    } else {
      response.body = reveiwResponse.body;
      response.message = constants.reviewsMessage.REVIEWS_CREATED;
      response.status = 200;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:reviewsController: createReviews
    Error:${error.message}`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// getAllReviews
module.exports.getAllReviews = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await reviewService.getAllReviews(req.query);

    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    } else {
      response.body = serviceResponse.body;
      response.totalPages = serviceResponse.totalPages;
      response.totalRecords = serviceResponse.totalRecords;
      response.averageRating = serviceResponse.averageRating;
      response.page = serviceResponse.page;
      response.status = 200;
      response.message = constants.reviewsMessage.REVIEWS_FETCHED;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:reviewController: getAllReviews
    Error:${error.message}`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};
// getMyReview
module.exports.getMyReview = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await reviewService.getMyReview({
      ...req.params,
      ...req.query,
    });

    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    } else {
      response.body = serviceResponse.body;
      response.totalPages = serviceResponse.totalPages;
      response.totalRecords = serviceResponse.totalRecords;
      response.averageRating = serviceResponse.averageRating;
      response.page = serviceResponse.page;
      response.status = 200;
      response.message = constants.reviewsMessage.REVIEWS_FETCHED;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:reviewController: getMyReview
    Error:${error.message}`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// deleteReview
module.exports.deleteReview = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await reviewService.deleteReview(req.params);
    if (serviceResponse.status == 400) {
      response.message = serviceResponse.message;
      response.errors = serviceResponse.errors;
    } else {
      response.body = serviceResponse.body;
      response.message = constants.reviewsMessage.REVIEWS_DELETED;
      response.status = 200;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:reviewController: deleteReviews
      Error:${error.message}`);

    response.message = error.message;
    response.errors = {
      error: error.message,
    };
  }
  res.status(response.status).send(response);
};

// getReviewById
module.exports.getReviewById = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await reviewService.getReviewById(req.params);

    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    } else {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = constants.reviewsMessage.REVIEWS_FETCHED;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:ReviewController: getReviewById
    Error:${error.message}`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// updateReview
module.exports.updateReview = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await reviewService.updateReview({
      id: req.params.id,
      body: req.body,
    });

    if (serviceResponse.status === 400) {
      response.message = serviceResponse.message;
      response.errors = serviceResponse.errors;
    } else {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = constants.reviewsMessage.REVIEWS_UPDATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: reviewController: updateReview`,
      error.message
    );
    response.errors = error;
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// updateReviewByUser
module.exports.updateReviewByUser = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await reviewService.updateReviewByUser({
      id: req.params.id,
      body: req.body,
    });

    if (serviceResponse.status === 400) {
      response.message = serviceResponse.message;
      response.error = serviceResponse.errors;
    } else {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = constants.reviewsMessage.REVIEWS_UPDATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: reviewController: updateReviewByUser`,
      error.message
    );

    response.errors = error;
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

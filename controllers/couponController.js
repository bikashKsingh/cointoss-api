const couponService = require("../services/couponService");
const constants = require("../constants");

// createCoupon
module.exports.createCoupon = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await couponService.createCoupon(req.body);
    response.status = 200;
    response.message = constants.couponMessage.COUPON_CREATED;
    response.body = serviceResponse;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : couponController: createCoupon`
    );
  }
  res.status(response.status).send(response);
};

// updateCoupon
module.exports.updateCoupon = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await couponService.updateCoupon({
      ...req.params,
      body: req.body,
    });

    response.status = 200;
    response.message = constants.couponMessage.COUPON_UPDATED;
    response.body = serviceResponse;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : couponController:  updateCoupon`
    );
  }
  res.status(response.status).send(response);
};

// getAllCoupons
module.exports.getAllCoupons = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await couponService.getAllCoupons(req.query);
    response.status = 200;
    response.message = constants.couponMessage.COUPON_FETCHED;
    response.body = serviceResponse.body;
    response.page = serviceResponse.page;
    response.totalRecords = serviceResponse.totalRecords;
    response.totalPages = serviceResponse.totalPages;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : couponontroller: getAllCoupons`,
      error.message
    );
  }
  res.status(response.status).send(response);
};

// validateCoupon
module.exports.validateCoupon = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await couponService.validateCoupon(req.params);
    response.status = 200;
    response.message = constants.couponMessage.COUPON_VERIFIED;
    response.body = serviceResponse;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : couponontroller: validateCoupon`,
      error.message
    );
  }
  res.status(response.status).send(response);
};

// getCouponById
module.exports.getCouponById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await couponService.getCouponById(req.params);

    response.status = 200;
    response.message = constants.couponMessage.COUPON_FETCHED;
    response.body = serviceResponse;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : couponController : getCouponById`
    );
  }
  res.status(response.status).send(response);
};

// deleteCoupon
module.exports.deleteCoupon = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await couponService.deleteCoupon(req.params);
    response.status = 200;
    response.message = constants.couponMessage.COUPON_DELETED;
    response.body = serviceResponse;
  } catch (error) {
    response.message = error.message;
    console.log(
      `Something went Wrong Controller : couponController:  deleteCcoupon`
    );
  }
  res.status(response.status).send(response);
};

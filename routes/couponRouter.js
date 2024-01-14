const express = require("express");
const couponRouter = express.Router();
const couponController = require("../controllers/couponController");
const couponValidationSchema = require("../apiValidationSchemas/couponValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");

const jwtValidation = require("../middlewares/jwtValidation");

// createCoupon
couponRouter.post(
  "/",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(couponValidationSchema.createCoupon),
  couponController.createCoupon
);

// updateCoupon
couponRouter.put(
  "/:id",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(couponValidationSchema.updateCoupon),
  couponController.updateCoupon
);

// Get all coupons
couponRouter.get(
  "/",
  joiSchemaValidation.validateQuery(couponValidationSchema.getAllCoupons),
  couponController.getAllCoupons
);

// validateCoupon
couponRouter.get(
  "/validate/:couponCode",
  joiSchemaValidation.validateParams(couponValidationSchema.validateCoupon),
  jwtValidation.validateCustomerToken,
  couponController.validateCoupon
);

// Get coupon by ID
couponRouter.get(
  "/:id",
  joiSchemaValidation.validateParams(couponValidationSchema.getCouponById),
  couponController.getCouponById
);

// Get coupon by ID
couponRouter.delete(
  "/:id",
  jwtValidation.validateAdminToken,
  couponController.deleteCoupon
);
module.exports = couponRouter;

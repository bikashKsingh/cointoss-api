const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const customerValidationSchema = require("../apiValidationSchemas/customerValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");
const jwtValidation = require("../middlewares/jwtValidation");

// registerCustomer
router.post(
  "/register",
  joiSchemaValidation.validateBody(customerValidationSchema.registerCustomer),
  customerController.registerCustomer
);

// verifyAccount
router.post(
  "/verifyAccount",
  joiSchemaValidation.validateBody(customerValidationSchema.verifyAccount),
  customerController.verifyAccount
);

// resendOTP
router.post(
  "/resendOTP",
  joiSchemaValidation.validateBody(customerValidationSchema.resendOTP),
  customerController.resendOTP
);

// loginCustomer
router.post(
  "/login",
  joiSchemaValidation.validateBody(customerValidationSchema.loginCustomer),
  customerController.loginCustomer
);

// findAccount
router.post(
  "/findAccount",
  joiSchemaValidation.validateBody(customerValidationSchema.findAccount),
  customerController.findAccount
);

// verifyOTP
router.post(
  "/verifyOTP",
  joiSchemaValidation.validateBody(customerValidationSchema.verifyOTP),
  customerController.verifyOTP
);

// getProfile
router.get(
  "/profile",
  jwtValidation.validateCustomerToken,
  customerController.getProfile
);

// myReferrals
router.get(
  "/myReferrals",
  joiSchemaValidation.validateQuery(
    customerValidationSchema.getCustomerReferrals
  ),
  jwtValidation.validateCustomerToken,
  customerController.getCustomerReferrals
);

// createNewPassword
router.put(
  "/createNewPassword",
  jwtValidation.validateCustomerToken,
  joiSchemaValidation.validateBody(customerValidationSchema.createNewPassword),
  customerController.createNewPassword
);

// updateProfile
router.put(
  "/profile",
  jwtValidation.validateCustomerToken,
  joiSchemaValidation.validateBody(customerValidationSchema.updateProfile),
  customerController.updateProfile
);

// getCustomerById
router.get(
  "/:id",
  joiSchemaValidation.validateParams(customerValidationSchema.getCustomerById),
  jwtValidation.validateAdminToken,
  customerController.getCustomerById
);

// getAllCustomers
router.get(
  "/",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateQuery(customerValidationSchema.getAllCustomers),
  customerController.getAllCustomers
);

// updateCustomer
router.put(
  "/:id",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(customerValidationSchema.updateCustomer),
  customerController.updateCustomer
);

// deleteCustomer
router.delete(
  "/:id",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(customerValidationSchema.getCustomerById),
  customerController.deleteCustomer
);

module.exports = router;

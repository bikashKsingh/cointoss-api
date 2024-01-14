const express = require("express");
const router = express.Router();
const inquiryController = require("../controllers/inquiryController");
const inquiryValidationSchema = require("../apiValidationSchemas/inquiryValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");
const jwtValidation = require("../middlewares/jwtValidation");

// createInquiry
router.post(
  "/",
  joiSchemaValidation.validateBody(inquiryValidationSchema.createInquiry),
  inquiryController.createInquiry
);

// getInquiryById
router.get(
  "/:id",
  joiSchemaValidation.validateParams(inquiryValidationSchema.getInquiryById),
  jwtValidation.validateAdminToken,
  inquiryController.getInquiryById
);

// getAllInquiries
router.get(
  "/",
  joiSchemaValidation.validateQuery(inquiryValidationSchema.getAllInquiries),
  jwtValidation.validateAdminToken,
  inquiryController.getAllInquiries
);

// updateInquiry
router.put(
  "/:id",
  joiSchemaValidation.validateParams(inquiryValidationSchema.getInquiryById),
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(inquiryValidationSchema.updateInquiry),
  inquiryController.updateInquiry
);

// deleteInquiry
router.delete(
  "/:id",
  joiSchemaValidation.validateParams(inquiryValidationSchema.getInquiryById),
  jwtValidation.validateAdminToken,
  inquiryController.deleteInquiry
);

module.exports = router;

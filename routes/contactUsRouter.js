const express = require("express");
const router = express.Router();
const contactUsController = require("../controllers/contactUsController");
const contactUsValidationSchema = require("../apiValidationSchemas/contactUsValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");
const jwtValidation = require("../middlewares/jwtValidation");

// createContactUs
router.post(
  "/",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(contactUsValidationSchema.createContactUs),
  contactUsController.createContactUs
);

// getContactUs
router.get("/", contactUsController.getContactUs);

// updateContactUs
router.put(
  "/:id",
  joiSchemaValidation.validateParams(
    contactUsValidationSchema.getContactUsById
  ),
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(contactUsValidationSchema.createContactUs),
  contactUsController.updateContactUs
);

module.exports = router;

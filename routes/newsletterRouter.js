const express = require("express");
const router = express.Router();
const newsletterController = require("../controllers/newsletterController");
const newsletterValidationSchema = require("../apiValidationSchemas/newsletterValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");
const jwtValidation = require("../middlewares/jwtValidation");

// createNewsletter
router.post(
  "/",
  joiSchemaValidation.validateBody(newsletterValidationSchema.createNewsletter),
  newsletterController.createNewsletter
);

// getNewsletterById
router.get(
  "/:id",
  joiSchemaValidation.validateParams(
    newsletterValidationSchema.getNewsletterById
  ),
  jwtValidation.validateAdminToken,
  newsletterController.getNewsletterById
);

// getAllNewsletters
router.get(
  "/",
  joiSchemaValidation.validateQuery(
    newsletterValidationSchema.getAllNewsletters
  ),
  jwtValidation.validateAdminToken,
  newsletterController.getAllNewsletters
);

// updateNewsletter
router.put(
  "/:id",
  joiSchemaValidation.validateParams(
    newsletterValidationSchema.getNewsletterById
  ),
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(newsletterValidationSchema.updateNewsletter),
  newsletterController.updateNewsletter
);

// deleteNewsletter
router.delete(
  "/:id",
  joiSchemaValidation.validateParams(
    newsletterValidationSchema.getNewsletterById
  ),
  jwtValidation.validateAdminToken,
  newsletterController.deleteNewsletter
);

module.exports = router;

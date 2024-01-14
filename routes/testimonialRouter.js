const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonialController");
const testimonialValidationSchema = require("../apiValidationSchemas/testimonialValidationSchema");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");
const jwtValidation = require("../middlewares/jwtValidation");

// createTestimonial
router.post(
  "/",
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(
    testimonialValidationSchema.createTestimonial
  ),
  testimonialController.createTestimonial
);

// getTestimonialById
router.get(
  "/:id",
  joiSchemaValidation.validateParams(
    testimonialValidationSchema.getTestimonialById
  ),
  jwtValidation.validateAdminToken,
  testimonialController.getTestimonialById
);

// getAllTestimonials
router.get(
  "/",
  joiSchemaValidation.validateQuery(
    testimonialValidationSchema.getAllTestimonials
  ),
  // jwtValidation.validateAdminToken,
  testimonialController.getAllTestimonials
);

// updateTestimonial
router.put(
  "/:id",
  joiSchemaValidation.validateParams(
    testimonialValidationSchema.getTestimonialById
  ),
  jwtValidation.validateAdminToken,
  joiSchemaValidation.validateBody(
    testimonialValidationSchema.updateTestimonial
  ),
  testimonialController.updateTestimonial
);

// deleteTestimonial
router.delete(
  "/:id",
  joiSchemaValidation.validateParams(
    testimonialValidationSchema.getTestimonialById
  ),
  jwtValidation.validateAdminToken,
  testimonialController.deleteTestimonial
);

module.exports = router;

const testimonialService = require("../services/testimonialService");
const { defaultServerResponse, testimonialMessage } = require("../constants");

// createTestimonial
module.exports.createTestimonial = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await testimonialService.createTestimonial(
      req.body
    );
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = testimonialMessage.TESTIMONIAL_CREATED;
    } else {
      response.message = testimonialMessage.TESTIMONIAL_NOT_CREATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: testimonialController: createTestimonial`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// getTestimonialById
module.exports.getTestimonialById = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await testimonialService.getTestimonialById(
      req.params
    );
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = testimonialMessage.TESTIMONIAL_FETCHED;
    } else {
      response.message = testimonialMessage.TESTIMONIAL_NOT_FETCHED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: testimonialController: getTestimonialById`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// getAllTestimonials
module.exports.getAllTestimonials = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await testimonialService.getAllTestimonials(
      req.query
    );
    if (serviceResponse) {
      response.body = serviceResponse.body;
      response.page = serviceResponse.page;
      response.totalRecords = serviceResponse.totalRecords;
      response.totalPages = serviceResponse.totalPages;
      response.status = 200;
      response.message = testimonialMessage.TESTIMONIAL_FETCHED;
    } else {
      response.message = testimonialMessage.TESTIMONIAL_NOT_FETCHED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: testimonialController: getAllTestimonials`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// updateTestimonial
module.exports.updateTestimonial = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await testimonialService.updateTestimonial({
      id: req.params.id,
      body: req.body,
    });
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = testimonialMessage.TESTIMONIAL_UPDATED;
    } else {
      response.message = testimonialMessage.TESTIMONIAL_NOT_UPDATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: testimonialController: updateTestimonial`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// deleteTestimonial
module.exports.deleteTestimonial = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await testimonialService.deleteTestimonial(
      req.params
    );
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = testimonialMessage.TESTIMONIAL_DELETED;
    } else {
      response.message = testimonialMessage.TESTIMONIAL_NOT_DELETED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: testimonialController: deleteTestimonial`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

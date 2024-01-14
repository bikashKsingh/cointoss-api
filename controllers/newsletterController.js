const newsLetterService = require("../services/newsLetterService");
const { defaultServerResponse, newsletterMessage } = require("../constants");

// createNewsletter
module.exports.createNewsletter = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await newsLetterService.createNewsletter(req.body);
    if (serviceResponse.status === 200) {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = serviceResponse.message;
    } else {
      response.message = serviceResponse.message;
      response.errors = serviceResponse.errors;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: newsletterController: createNewsletter`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// getNewsletterById
module.exports.getNewsletterById = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await newsLetterService.getNewsletterById(
      req.params
    );
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = newsletterMessage.NEWSLETTER_FETCHED;
    } else {
      response.message = newsletterMessage.NEWSLETTER_NOT_FETCHED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: newsletterController: getNewsletterById`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// getAllNewsletters
module.exports.getAllNewsletters = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await newsLetterService.getAllNewsletters(
      req.query
    );
    if (serviceResponse) {
      response.body = serviceResponse.body;
      response.page = serviceResponse.page;
      response.totalRecords = serviceResponse.totalRecords;
      response.totalPages = serviceResponse.totalPages;
      response.status = 200;
      response.message = newsletterMessage.NEWSLETTER_FETCHED;
    } else {
      response.message = newsletterMessage.NEWSLETTER_NOT_FETCHED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: newsletterController: getAllNewsletters`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// updateNewsletter
module.exports.updateNewsletter = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await newsLetterService.updateNewsletter({
      id: req.params.id,
      body: req.body,
    });
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = newsletterMessage.NEWSLETTER_UPDATED;
    } else {
      response.message = newsletterMessage.NEWSLETTER_NOT_UPDATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: newsletterController: updateNewsletter`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// deleteNewsletter
module.exports.deleteNewsletter = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await newsLetterService.deleteNewsletter(
      req.params
    );
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = newsletterMessage.NEWSLETTER_DELETED;
    } else {
      response.message = newsletterMessage.NEWSLETTER_NOT_DELETED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: newsletterController: deleteNewsletter`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

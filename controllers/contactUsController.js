const contactUsService = require("../services/contactUsService");
const { defaultServerResponse, contactUsMessage } = require("../constants");

// createContactUs
module.exports.createContactUs = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await contactUsService.createContactUs(req.body);
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = contactUsMessage.CONTACT_US_CREATED;
    } else {
      response.message = contactUsMessage.CONTACT_US_NOT_CREATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: contactUsController: createContactUs`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// getContactUs
module.exports.getContactUs = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await contactUsService.getContactUs(req.query);
    if (serviceResponse) {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = contactUsMessage.CONTACT_US_FETCHED;
    } else {
      response.message = contactUsMessage.CONTACT_US_NOT_FETCHED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: contactUsController: getContactUs`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// updateContactUs
module.exports.updateContactUs = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await contactUsService.updateContactUs({
      id: req.params.id,
      body: req.body,
    });
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = contactUsMessage.CONTACT_US_UPDATED;
    } else {
      response.message = contactUsMessage.CONTACT_US_NOT_UPDATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: contactUsController: updateContactUs`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

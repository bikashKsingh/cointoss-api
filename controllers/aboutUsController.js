const aboutUsService = require("../services/aboutUsService");
const { defaultServerResponse, aboutUsMessage } = require("../constants");

// createAboutUs
module.exports.createAboutUs = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await aboutUsService.createAboutUs(req.body);
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = aboutUsMessage.ABOUT_US_CREATED;
    } else {
      response.message = aboutUsMessage.ABOUT_US_NOT_CREATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: aboutUsController: createAboutUs`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// getAboutUs
module.exports.getAboutUs = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await aboutUsService.getAboutUs(req.query);
    if (serviceResponse) {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = aboutUsMessage.ABOUT_US_FETCHED;
    } else {
      response.message = aboutUsMessage.ABOUT_US_NOT_FETCHED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: aboutUsController: getAboutUs`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// updateAboutUs
module.exports.updateAboutUs = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await aboutUsService.updateAboutUs({
      id: req.params.id,
      body: req.body,
    });
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = aboutUsMessage.ABOUT_US_UPDATED;
    } else {
      response.message = aboutUsMessage.ABOUT_US_NOT_UPDATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: aboutUsController: updateAboutUs`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

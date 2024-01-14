const termsConditionsService = require("../services/termsConditionsService");
const {
  defaultServerResponse,
  termsConditionsMessage,
} = require("../constants");

// createTermsConditions
module.exports.createTermsConditions = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await termsConditionsService.createTermsConditions(
      req.body
    );
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = termsConditionsMessage.TERMS_CONDITIONS_CREATED;
    } else {
      response.message = termsConditionsMessage.TERMS_CONDITIONS_NOT_CREATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: privacyPolicyController: createTermsConditions`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// getTermsConditions
module.exports.getTermsConditions = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await termsConditionsService.getTermsConditions(
      req.query
    );
    if (serviceResponse) {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = termsConditionsMessage.TERMS_CONDITIONS_FETCHED;
    } else {
      response.message = termsConditionsMessage.TERMS_CONDITIONS_NOT_FETCHED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: privacyPolicyController: getTermsConditions`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// updateTermsConditions
module.exports.updateTermsConditions = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await termsConditionsService.updateTermsConditions({
      id: req.params.id,
      body: req.body,
    });
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = termsConditionsMessage.TERMS_CONDITIONS_UPDATED;
    } else {
      response.message = termsConditionsMessage.TERMS_CONDITIONS_NOT_UPDATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: privacyPolicyController: updateTermsConditions`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

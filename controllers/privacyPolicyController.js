const privacyPolicyService = require("../services/privacyPolicyService");
const { defaultServerResponse, privacyPolicyMessage } = require("../constants");

// createPrivacyPolicy
module.exports.createPrivacyPolicy = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await privacyPolicyService.createPrivacyPolicy(
      req.body
    );
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = privacyPolicyMessage.PRIVACY_POLICY_CREATED;
    } else {
      response.message = privacyPolicyMessage.PRIVACY_POLICY_NOT_CREATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: privacyPolicyController: createPrivacyPolicy`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// getPrivacyPolicy
module.exports.getPrivacyPolicy = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await privacyPolicyService.getPrivacyPolicy(
      req.query
    );
    if (serviceResponse) {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = privacyPolicyMessage.PRIVACY_POLICY_FETCHED;
    } else {
      response.message = privacyPolicyMessage.PRIVACY_POLICY_NOT_FETCHED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: privacyPolicyController: getPrivacyPolicy`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// updatePrivacyPolicy
module.exports.updatePrivacyPolicy = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await privacyPolicyService.updatePrivacyPolicy({
      id: req.params.id,
      body: req.body,
    });
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = privacyPolicyMessage.PRIVACY_POLICY_UPDATED;
    } else {
      response.message = privacyPolicyMessage.PRIVACY_POLICY_NOT_UPDATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: privacyPolicyController: updatePrivacyPolicy`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

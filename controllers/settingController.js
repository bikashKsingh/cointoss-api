const settingService = require("../services/settingService");
const { defaultServerResponse, settingMessage } = require("../constants");

// createUpdateSetting
module.exports.createUpdateSetting = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await settingService.createUpdateSetting(req.body);
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
      `Somthing Went Wrong Controller: settingController: createUpdateSetting`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// getSetting
module.exports.getSetting = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await settingService.getSetting(req.query);
    if (serviceResponse) {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = settingMessage.SETTING_FETCHED;
    } else {
      response.message = settingMessage.SETTING_NOT_FETCHED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: settingController: getSetting`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

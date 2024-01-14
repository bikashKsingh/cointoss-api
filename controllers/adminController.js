const adminService = require("../services/adminService");
const {
  defaultServerResponse,
  authMessage,
  adminMessage,
} = require("../constants");

// registerAdmin
module.exports.registerAdmin = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await adminService.registerAdmin(req.body);
    if (serviceResponse.body) {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = authMessage.REGISTRATION_SUCCESS;
    } else {
      response.errors = serviceResponse.errors;
      response.message = authMessage.REGISTRATION_FAILED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: adminController: registerAdmin`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// loginAdmin
module.exports.loginAdmin = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await adminService.loginAdmin(req.body);
    if (serviceResponse.body) {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = authMessage.LOGIN_SUCCESS;
    } else {
      response.errors = serviceResponse.errors;
      response.message = authMessage.LOGIN_FAILED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: adminController: loginAdmin`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// getProfile
module.exports.getProfile = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await adminService.getProfile(req.params);
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = adminMessage.PROFILE_FETCHED;
    } else {
      response.message = adminMessage.PROFILE_NOT_FETCHED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: adminController: getProfile`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// updateProfile
module.exports.updateProfile = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await adminService.updateProfile({
      adminId: req.params.adminId,
      body: req.body,
    });
    if (serviceResponse.body) {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = adminMessage.PROFILE_UPDATED;
    } else {
      response.message = adminMessage.PROFILE_NOT_UPDATED;
      response.errors = serviceResponse.errors;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: adminController: updateProfile`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// findAccount
module.exports.findAccount = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await adminService.findAccount(req.body);
    if (serviceResponse.body) {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = "Account found and OTP send to your Email";
    } else {
      response.message = "Oops Something went wrong";
      response.errors = serviceResponse.errors;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: adminController: findAccount`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// verifyOTP
module.exports.verifyOTP = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await adminService.verifyOTP(req.body);
    if (serviceResponse.body) {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = "OTP Verify Successfully";
    } else {
      response.message = "Oops Something went wrong";
      response.errors = serviceResponse.errors;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: adminController: verifyOTP`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// createNewPassword
module.exports.createNewPassword = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await adminService.createNewPassword({
      ...req.body,
      ...req.params,
    });
    if (serviceResponse.body) {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = "Password Created successfully";
    } else {
      response.message = "Oops Something went wrong";
      response.errors = serviceResponse.errors;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: adminController: createNewPassword`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

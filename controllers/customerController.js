const customerService = require("../services/customerService");
const {
  defaultServerResponse,
  authMessage,
  customerMessage,
} = require("../constants");
const _ = require("lodash");

// registerCustomer
module.exports.registerCustomer = async (req, res) => {
  const response = _.cloneDeep(defaultServerResponse);
  try {
    const serviceResponse = await customerService.registerCustomer(req.body);
    if (serviceResponse.status == 200) {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = customerMessage.CUSTOMER_CREATED;
    } else {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: customerController: registerCustomer`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// verifyAccount
module.exports.verifyAccount = async (req, res) => {
  const response = _.cloneDeep(defaultServerResponse);
  try {
    const serviceResponse = await customerService.verifyAccount(req.body);
    if (serviceResponse.status == 200) {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = customerMessage.ACCOUNT_VERIFIED;
    } else {
      response.errors = serviceResponse.errors;
      response.message = customerMessage.ACCOUNT_NOT_VERIFIED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: customerController: verifyAccount`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// loginCustomer
module.exports.loginCustomer = async (req, res) => {
  const response = _.cloneDeep(defaultServerResponse);
  try {
    const serviceResponse = await customerService.loginCustomer(req.body);
    if (serviceResponse.status == 200) {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = serviceResponse.message;
    } else {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: customerController: loginCustomer`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// getProfile
module.exports.getProfile = async (req, res) => {
  const response = _.cloneDeep(defaultServerResponse);
  try {
    const serviceResponse = await customerService.getProfile(req.params);
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = customerMessage.PROFILE_FETCHED;
    } else {
      response.message = customerMessage.PROFILE_NOT_FETCHED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: customerController: getProfile`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// updateProfile
module.exports.updateProfile = async (req, res) => {
  const response = _.cloneDeep(defaultServerResponse);
  try {
    const serviceResponse = await customerService.updateProfile({
      customerId: req.params.customerId,
      body: req.body,
    });

    if (serviceResponse.body) {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = customerMessage.PROFILE_UPDATED;
    } else {
      response.message = customerMessage.PROFILE_NOT_UPDATED;
      response.errors = serviceResponse.errors;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: customerController: updateProfile`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// findAccount
module.exports.findAccount = async (req, res) => {
  const response = _.cloneDeep(defaultServerResponse);
  try {
    // Status : OK, ACCOUNT_NOT_VERIFIED, ACCOUNT_DISABLED, INVALID_EMAIL
    const serviceResponse = await customerService.findAccount(req.body);
    if (serviceResponse.status == "OK") {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = "Account found and OTP send to your Email";
    } else if (serviceResponse.status == "ACCOUNT_NOT_VERIFIED") {
      response.status = 401;
      response.errors = serviceResponse.errors;
      response.message = authMessage.ACCOUNT_NOT_VERIFIED;
    } else if (serviceResponse.status == "ACCOUNT_DISABLED") {
      response.status = 403;
      response.errors = serviceResponse.errors;
      response.message = authMessage.ACCOUNT_DISABLED;
    } else if (serviceResponse.status == "INVALID_EMAIL") {
      response.status = 400;
      response.errors = serviceResponse.errors;
      response.message = authMessage.INVALID_EMAIL;
    } else {
      response.message = "Oops Something went wrong";
      response.errors = serviceResponse.errors;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: customerController: findAccount`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// verifyOTP
module.exports.verifyOTP = async (req, res) => {
  const response = _.cloneDeep(defaultServerResponse);
  try {
    const serviceResponse = await customerService.verifyOTP(req.body);
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
      `Somthing Went Wrong Controller: customerController: verifyOTP`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// createNewPassword
module.exports.createNewPassword = async (req, res) => {
  const response = _.cloneDeep(defaultServerResponse);
  try {
    const serviceResponse = await customerService.createNewPassword({
      ...req.body,
      ...req.params,
    });
    if (serviceResponse.body) {
      response.body = {
        firstName: serviceResponse.body.firstName,
        _id: serviceResponse.body._id,
      };
      response.status = 200;
      response.message = "Password Created successfully";
    } else {
      response.message = "Oops Something went wrong";
      response.errors = serviceResponse.errors;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: customerController: createNewPassword`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// getCustomerById
module.exports.getCustomerById = async (req, res) => {
  const response = _.cloneDeep(defaultServerResponse);
  try {
    const serviceResponse = await customerService.getCustomerById(req.params);
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = customerMessage.CUSTOMER_FETCHED;
    } else {
      response.message = customerMessage.CUSTOMER_NOT_FETCHED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: customerController: getCustomerById`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// getAllCustomers
module.exports.getAllCustomers = async (req, res) => {
  const response = _.cloneDeep(defaultServerResponse);
  try {
    const serviceResponse = await customerService.getAllCustomers(req.query);
    if (serviceResponse) {
      response.body = serviceResponse.body;
      response.page = serviceResponse.page;
      response.totalRecords = serviceResponse.totalRecords;
      response.totalPages = serviceResponse.totalPages;
      response.status = 200;
      response.message = customerMessage.CUSTOMER_FETCHED;
    } else {
      response.message = customerMessage.CUSTOMER_NOT_FETCHED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: customerController: getAllCustomers`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// updateCustomer
module.exports.updateCustomer = async (req, res) => {
  const response = _.cloneDeep(defaultServerResponse);
  try {
    const serviceResponse = await customerService.updateCustomer({
      id: req.params.id,
      body: req.body,
    });
    if (serviceResponse) {
      response.body = {
        firstName: serviceResponse.firstName,
        _id: serviceResponse._id,
      };
      response.status = 200;
      response.message = customerMessage.CUSTOMER_UPDATED;
    } else {
      response.message = customerMessage.CUSTOMER_NOT_UPDATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: customerController: updateCustomer`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// deleteCustomer
module.exports.deleteCustomer = async (req, res) => {
  const response = _.cloneDeep(defaultServerResponse);
  try {
    const serviceResponse = await customerService.deleteCustomer(req.params);
    if (serviceResponse) {
      response.body = {
        firstName: serviceResponse.firstName,
        _id: serviceResponse._id,
      };
      response.status = 200;
      response.message = customerMessage.CUSTOMER_DELETED;
    } else {
      response.message = customerMessage.CUSTOMER_NOT_DELETED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: customerController: deleteCustomer`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

const inquiryService = require("../services/inquiryService");
const { defaultServerResponse, inquiryMessage } = require("../constants");

// createInquiry
module.exports.createInquiry = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await inquiryService.createInquiry(req.body);
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = inquiryMessage.INQUIRY_CREATED;
    } else {
      response.message = inquiryMessage.INQUIRY_NOT_CREATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: inquiryController: createInquiry`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// getInquiryById
module.exports.getInquiryById = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await inquiryService.getInquiryById(req.params);
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = inquiryMessage.INQUIRY_FETCHED;
    } else {
      response.message = inquiryMessage.INQUIRY_NOT_FETCHED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: inquiryController: getInquiryById`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// getAllInquiries
module.exports.getAllInquiries = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await inquiryService.getAllInquiries(req.query);
    if (serviceResponse) {
      response.body = serviceResponse.body;
      response.page = serviceResponse.page;
      response.totalRecords = serviceResponse.totalRecords;
      response.totalPages = serviceResponse.totalPages;
      response.status = 200;
      response.message = inquiryMessage.INQUIRY_FETCHED;
    } else {
      response.message = inquiryMessage.INQUIRY_NOT_FETCHED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: inquiryController: getAllInquiries`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// updateInquiry
module.exports.updateInquiry = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await inquiryService.updateInquiry({
      id: req.params.id,
      body: req.body,
    });
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = inquiryMessage.INQUIRY_UPDATED;
    } else {
      response.message = inquiryMessage.INQUIRY_NOT_UPDATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: inquiryController: updateInquiry`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// deleteInquiry
module.exports.deleteInquiry = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await inquiryService.deleteInquiry(req.params);
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = inquiryMessage.INQUIRY_DELETED;
    } else {
      response.message = inquiryMessage.INQUIRY_NOT_DELETED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: inquiryController: deleteInquiry`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

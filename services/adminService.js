const adminModel = require("../database/models/adminModel");
const constant = require("../constants");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbHelper = require("../helpers/dbHelper");
const smsHelper = require("../helpers/smsHelper");
const moment = require("moment");

// registerAdmin
module.exports.registerAdmin = async (serviceData) => {
  const response = {};
  try {
    // Check Email is already exist or not
    const adminData = await adminModel.findOne({ email: serviceData.email });
    if (adminData) {
      response.errors = {
        email: constant.authMessage.EMAIL_EXISTS,
      };
      return response;
    }
    // Hash Password
    serviceData.password = await bcryptjs.hash(serviceData.password, 12);

    const admin = new adminModel(serviceData);

    const result = await admin.save();

    if (result) {
      // generate jwt token
      const token = jwt.sign(
        { id: result._id },
        process.env.JWT_ADMIN_SECRET_KEY,
        { expiresIn: "2 days" }
      );
      const formatData = dbHelper.formatMongoData(result);
      response.body = { ...formatData, token };
    } else {
      throw new Error("Oops! Something went wrong");
    }
  } catch (error) {
    console.log(
      `Something went wrong Service: adminService: registerAdmin`,
      error.message
    );
    throw new Error(error.message);
  }
  return response;
};

// loginAdmin
module.exports.loginAdmin = async (serviceData) => {
  const response = {
    errors: {},
  };
  try {
    // Find admin
    const adminData = await adminModel.findOne({ email: serviceData.email });
    if (adminData) {
      // Check password is matched or not
      const isCorrect = await bcryptjs.compare(
        serviceData.password,
        adminData.password
      );
      if (isCorrect) {
        // Sign jwt token
        const token = jwt.sign(
          { id: adminData._id },
          process.env.JWT_ADMIN_SECRET_KEY,
          { expiresIn: "2 days" }
        );
        const formatData = adminData.toObject();
        response.body = { ...formatData, token };
      } else {
        response.errors.password = constant.authMessage.INVALID_PASSWORD;
      }
    } else {
      response.errors.email = constant.authMessage.INVALID_EMAIL;
    }
  } catch (error) {
    console.log(`Something went wrong Service: adminService: loginAdmin`);
    throw new Error(error.message);
  }
  return response;
};

// getProfile
module.exports.getProfile = async (serviceData) => {
  try {
    const result = await adminModel.findOne({ _id: serviceData.adminId });
    return dbHelper.formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: adminService: getAdminProfile`,
      error.message
    );
    throw new Error(error);
  }
};

// updateProfile
module.exports.updateProfile = async (serviceData) => {
  const response = {
    errors: {},
  };
  try {
    const { adminId, body } = serviceData;
    // If Password available
    if (body.password) {
      if (!body.oldPassword) {
        response.errors.oldPassword = "Old Password is required";
        return response;
      }

      const adminData = await adminModel.findOne({ _id: adminId });
      if (adminData) {
        const isCorrect = await bcryptjs.compare(
          body.oldPassword,
          adminData.password
        );
        if (isCorrect) {
          body.password = await bcryptjs.hash(body.password, 12);
        } else {
          response.errors.oldPassword = constant.authMessage.INVALID_PASSWORD;
          return response;
        }
      } else {
        // Profile not found
        throw new Error("Profile not found");
      }
    }

    const result = await adminModel.findByIdAndUpdate(adminId, body, {
      new: true,
    });

    response.body = dbHelper.formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: adminService:  updateProfile`,
      error.message
    );
    throw new Error(error);
  }
  return response;
};

// findAccount
module.exports.findAccount = async (serviceData) => {
  const response = {
    errors: {},
  };

  try {
    // Check Email exist or not
    const adminData = await adminModel.findOne({ email: serviceData.email });
    const otp = smsHelper.createOTP();
    if (adminData) {
      // Send Email
      const mailResponse = await smsHelper.sendOTPEmail({
        emailTo: serviceData.email,
        subject: "Reset Password OTP",
        name: adminData.name,
        otp: otp,
      });

      if (!mailResponse.status) {
        throw new Error(
          `Account Found ! But some Error occured ${mailResponse.message}`
        );
      }

      // Save OTP To Database
      const date = moment.utc().toDate();
      const otpExpiredAt = date.setMinutes(date.getMinutes() + 3);

      const updateData = await adminModel.findByIdAndUpdate(adminData._id, {
        otp,
        otpExpiredAt,
      });

      if (updateData) {
        response.body = serviceData;
      } else {
        throw new Error(`Account Found but OTP Data Not Updated to Table`);
      }
    } else {
      response.errors.email = constant.adminMessage.ACCOUNT_NOT_FOUND;
    }
  } catch (error) {
    console.log(`Something went wrong Service: adminService: findAccount`);
    throw new Error(error.message);
  }
  return response;
};

// verifyOTP
module.exports.verifyOTP = async (serviceData) => {
  const response = {
    errors: {},
  };

  try {
    // Verify OTP
    const currentTime = new Date().toISOString();
    const adminData = await adminModel.findOne({
      email: serviceData.email,
      otp: serviceData.otp,
      otpExpiredAt: { $gte: currentTime },
    });

    if (adminData) {
      // generate token
      const token = jwt.sign(
        { id: adminData._id },
        process.env.JWT_ADMIN_SECRET_KEY,
        { expiresIn: "3m" }
      );

      response.body = {
        token,
      };
    } else {
      response.errors.otp = "Wrong or Expired OTP";
    }
  } catch (error) {
    console.log(`Something went wrong Service: adminService: verifyOTP`);
    throw new Error(error.message);
  }
  return response;
};

// createNewPassword
module.exports.createNewPassword = async (serviceData) => {
  const response = {
    errors: {},
  };

  try {
    const password = await bcryptjs.hash(serviceData.password, 12);
    const adminId = serviceData.adminId;

    const result = await adminModel.findOneAndUpdate(
      { _id: adminId },
      { password: password },
      {
        new: true,
      }
    );

    if (result) {
      response.body = dbHelper.formatMongoData(result);
    } else {
      throw new Error(constant.adminMessage.PASSWORD_NOT_UPDATED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: adminService:  createNewPassword`,
      error.message
    );
    throw new Error(error);
  }

  return response;
};

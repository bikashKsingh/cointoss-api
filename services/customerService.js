const customerModel = require("../database/models/customerModel");
const constants = require("../constants");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbHelper = require("../helpers/dbHelper");
const smsHelper = require("../helpers/smsHelper");
const _ = require("lodash");
const moment = require("moment");
const settingModel = require("../database/models/settingModel");

// registerCustomer
module.exports.registerCustomer = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    // Check Email is already exist or not
    const data = await customerModel.findOne({
      email: serviceData.email,
    });

    if (data) {
      if (data.isDeleted) {
        response.errors.email = "Account is deleted permanently";
        return response;
      } else if (!data.isVerified) {
        // Send otp
        const otp = smsHelper.createOTP();
        const mailResponse = await smsHelper.sendOTPEmail({
          emailTo: serviceData.email,
          subject: "Account Verification OTP",
          name: data.firstName,
          otp: otp,
        });

        if (!mailResponse.status) {
          throw new Error(
            `Email Exist But some Error occured ${mailResponse.message}`
          );
        }

        // Save OTP To Database
        const date = moment.utc().toDate();
        const otpExpiredAt = date.setMinutes(date.getMinutes() + 3);

        const updateData = await customerModel.findByIdAndUpdate(data._id, {
          otp,
          otpExpiredAt,
        });
        response.status = 200;
        response.message = constants.customerMessage.CUSTOMER_CREATED;
        return response;
      } else if (!data.status) {
        response.errors = {
          email: "Email disabled, talk to Admin",
        };
        return response;
      } else {
        response.errors = {
          email: "Email already exists, Need login to continue",
        };
        return response;
      }
    }

    // Hash Password
    serviceData.password = await bcryptjs.hash(serviceData.password, 12);

    // generate otp
    const otp = smsHelper.createOTP();
    const date = moment.utc().toDate();
    const otpExpiredAt = date.setMinutes(date.getMinutes() + 3);
    serviceData.otp = otp;
    serviceData.otpExpiredAt = otpExpiredAt;

    // If refferal code is available
    if (serviceData.referralCode) {
      const setting = await settingModel.findOne().sort({ _id: -1 });
      if (setting) {
        const referralAmount = setting.referralAmount;
        const referredAmount = setting.referredAmount;

        // Update Refer User Wallet
        const refferUser = await customerModel.findOne({
          referralCode: serviceData.referralCode,
        });

        await customerModel.findByIdAndUpdate(refferUser._id, {
          wallet: refferUser.wallet + referralAmount,
        });

        serviceData.wallet = referredAmount;
        serviceData.referredByCode = serviceData.referralCode;
      }
    }

    // Generate My Referral Code
    const lastUser = await customerModel.findOne().sort({ _id: -1 });
    if (lastUser) {
      serviceData.referralCode = lastUser.referralCode + 1;
    } else {
      serviceData.referralCode = 1001;
    }

    const newData = new customerModel(serviceData);
    const result = await newData.save();

    // SEND OTP
    const mailResponse = await smsHelper.sendOTPEmail({
      emailTo: serviceData.email,
      subject: "Account Verification OTP",
      name: serviceData.firstName,
      otp: otp,
    });

    if (!mailResponse.status) {
      throw new Error(
        `Email Exist But some Error occured ${mailResponse.message}`
      );
    }

    if (result) {
      const formatData = dbHelper.formatMongoData(result);
      response.status = 200;
      response.body = formatData;
      response.message = constants.customerMessage.CUSTOMER_CREATED;
    } else {
      response.message = "Oops! Something went wrong";
      response.errors.email = "Oops! Something went wrong";
      return response;
    }
  } catch (error) {
    response.message = error.message;
    response.errors.email = error.message;
    return response;
  }
  return response;
};

// verifyAccount
module.exports.verifyAccount = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    // Verify Account
    const currentTime = new Date().toISOString();
    const data = await customerModel.findOne({
      email: serviceData.email,
      otp: serviceData.otp,
      otpExpiredAt: { $gte: currentTime },
    });

    if (data) {
      // generate token
      const token = jwt.sign(
        { id: data._id },
        process.env.JWT_CUSTOMER_SECRET_KEY,
        { expiresIn: "2 days" }
      );

      // Update status
      const result = await customerModel.findByIdAndUpdate(data._id, {
        status: true,
        isVerified: true,
      });
      response.status = 200;
      response.body = {
        token,
      };
    } else {
      response.errors.otp = "Wrong or Expired OTP";
    }
  } catch (error) {
    console.log(`Something went wrong Service: customerService: verifyAccount`);
    throw new Error(error.message);
  }
  return response;
};

// loginCustomer
module.exports.loginCustomer = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    // Find account
    const data = await customerModel.findOne({
      email: serviceData.email,
    });

    if (data) {
      // When account is deleted
      if (data.isDeleted) {
        response.errors.email = "Account is deleted permanently";
        response.message = "Account is deleted permanently";
        return response;
      }

      // When account is not verified
      if (!data.isVerified) {
        response.errors.email = "Email already exists need Verification";
        response.message = "Email already exists need Verification";

        // Send otp
        // const otp = smsHelper.createOTP();

        // const mailResponse = await smsHelper.sendOTPEmail({
        //   emailTo: serviceData.email,
        //   subject: "Account Activation OTP",
        //   name: data.firstName,
        //   otp: otp,
        // });
        // if (!mailResponse.status) {
        //   throw new Error(
        //     `Email Exist But some Error occured ${mailResponse.message}`
        //   );
        // }

        // // Save OTP To Database
        // const date = moment.utc().toDate();
        // const otpExpiredAt = date.setMinutes(date.getMinutes() + 3);

        // const updateData = await customerModel.findByIdAndUpdate(data._id, {
        //   otp,
        //   otpExpiredAt,
        // });

        return response;
      }

      // When account is disabled
      if (!data.status) {
        response.errors.email = "Account disabled, talk to Admin";
        response.message = "Account disabled, talk to Admin";
        return response;
      }

      // ===========================================
      // Now checking the password
      // Check password is matched or not
      const isCorrect = await bcryptjs.compare(
        serviceData.password,
        data.password
      );
      if (isCorrect) {
        // Sign jwt token
        const token = jwt.sign(
          { id: data._id },
          process.env.JWT_CUSTOMER_SECRET_KEY,
          { expiresIn: "2 days" }
        );
        response.status = 200;
        response.body = { token };
        response.message = "Account logedin successfully";
        return response;
      } else {
        response.errors.password = constants.authMessage.INVALID_PASSWORD;
        response.message = "Validation failed";
        return response;
      }
    } else {
      response.errors.email = constants.authMessage.INVALID_EMAIL;
      response.message = "Validation failed";
      return response;
    }
  } catch (error) {
    console.log(`Something went wrong Service: customerService: loginCustomer`);
    throw new Error(error.message);
  }
};

// getProfile
module.exports.getProfile = async (serviceData) => {
  try {
    const result = await customerModel.findOne({
      _id: serviceData.customerId,
    });

    if (result) {
      if (result.isDeleted) throw new Error("Account is deleted permanently");
      if (!result.status) throw new Error("Account is disabled permanently");
    }

    return dbHelper.formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: customerService: getProfile`,
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
    const { customerId, body } = serviceData;

    // If Password available
    if (body.password) {
      if (!body.oldPassword) {
        response.errors.oldPassword = "Old Password is required";
        return response;
      }

      const data = await customerModel.findOne({
        _id: customerId,
      });
      if (data) {
        const isCorrect = await bcryptjs.compare(
          body.oldPassword,
          data.password
        );
        if (isCorrect) {
          body.password = await bcryptjs.hash(body.password, 12);
        } else {
          response.errors.oldPassword = constants.authMessage.INVALID_PASSWORD;
          return response;
        }
      } else {
        // Profile not found
        throw new Error("Profile not found");
      }
    }

    const result = await customerModel.findByIdAndUpdate(customerId, body, {
      new: true,
    });

    response.body = dbHelper.formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: customerService:  updateProfile`,
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
    status: "OK",
  };

  try {
    // Check Email exist or not
    const data = await customerModel.findOne({
      email: serviceData.email,
    });
    const otp = smsHelper.createOTP();
    if (data) {
      // When account is deleted
      if (data.isDeleted) {
        throw new Error("Account is deleted permanently");
      }

      // When account is not verified
      if (!data.isVerified) {
        response.status = "ACCOUNT_NOT_VERIFIED";
        response.errors = {
          email: "Email already exists need Verification",
        };

        // Send otp
        const otp = smsHelper.createOTP();

        const mailResponse = await smsHelper.sendOTPEmail({
          emailTo: serviceData.email,
          subject: "Account Activation OTP",
          name: data.firstName,
          otp: otp,
        });
        if (!mailResponse.status) {
          throw new Error(
            `Email Exist But some Error occured ${mailResponse.message}`
          );
        }

        // Save OTP To Database
        const date = moment.utc().toDate();
        const otpExpiredAt = date.setMinutes(date.getMinutes() + 3);

        const updateData = await customerModel.findByIdAndUpdate(data._id, {
          otp,
          otpExpiredAt,
        });

        return response;
      }

      // When account is disabled
      if (!data.status) {
        response.status = "ACCOUNT_DISABLED";
        response.errors = {
          email: "Email disabled, talk to Admin",
        };
        return response;
      }

      // Send Email
      const mailResponse = await smsHelper.sendOTPEmail({
        emailTo: serviceData.email,
        subject: "Reset Password OTP",
        name: data.firstName,
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

      const updateData = await customerModel.findByIdAndUpdate(data._id, {
        otp,
        otpExpiredAt,
      });

      if (updateData) {
        response.body = serviceData;
      } else {
        throw new Error(`Account Found but OTP Data Not Updated to Table`);
      }
    } else {
      response.status = "INVALID_EMAIL";
      response.errors.email = "Oops! Email is invalid";
    }
  } catch (error) {
    console.log(`Something went wrong Service: customerService: findAccount`);
    throw new Error(error.message);
  }

  console.log(response);
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
    const data = await customerModel.findOne({
      email: serviceData.email,
      otp: serviceData.otp,
      otpExpiredAt: { $gte: currentTime },
    });

    if (data) {
      // generate token
      const token = jwt.sign(
        { id: data._id },
        process.env.JWT_CUSTOMER_SECRET_KEY,
        { expiresIn: "3m" }
      );

      response.body = {
        token,
      };
    } else {
      response.errors.otp = "Wrong or Expired OTP";
    }
  } catch (error) {
    console.log(`Something went wrong Service: customerService: verifyOTP`);
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
    const customerId = serviceData.customerId;

    const result = await customerModel.findOneAndUpdate(
      { _id: customerId },
      { password: password },
      {
        new: true,
      }
    );

    if (result) {
      response.body = dbHelper.formatMongoData(result);
    } else {
      throw new Error(constants.customerMessage.PASSWORD_NOT_CREATED);
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: customerService:  createNewPassword`,
      error.message
    );
    throw new Error(error);
  }

  return response;
};

// getCustomerById
module.exports.getCustomerById = async (serviceData) => {
  try {
    const id = serviceData?.id;
    const result = await customerModel.findOne({ _id: id });
    return dbHelper.formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: customerService: getCustomerById`,
      error.message
    );
    throw new Error(error);
  }
};

// getAllCustomers
module.exports.getAllCustomers = async (serviceData) => {
  try {
    let conditions = {};
    const {
      limit = 10,
      page = 1,
      searchQuery,
      status = true,
      isDeleted = false,
      isVerified = "All",
    } = serviceData;

    // SearchQuery
    if (searchQuery) {
      conditions = {
        $or: [
          { firstName: { $regex: searchQuery, $options: "i" } },
          { lastName: { $regex: searchQuery, $options: "i" } },
          { mobile: { $regex: searchQuery, $options: "i" } },
          { email: { $regex: searchQuery, $options: "i" } },
        ],
      };
    }

    // Status
    if (status == "All") {
      delete conditions.status;
    } else {
      conditions.status = status;
    }

    // isVerified
    if (isVerified == "All") {
      delete conditions.isVerified;
    } else {
      conditions.isVerified = isVerified;
    }

    // DeletedAccount
    conditions.isDeleted = isDeleted;

    // count record
    const totalRecords = await customerModel.countDocuments(conditions);
    // Calculate the total number of pages
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const result = await customerModel
      .find(conditions)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .sort({ _id: -1 });
    const res = {
      body: dbHelper.formatMongoData(result),
      page,
      totalPages,
      totalRecords,
    };
    return res;
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: customerService: getAllCustomers`,
      error.message
    );
    throw new Error(error);
  }
};

// updateCustomer
module.exports.updateCustomer = async (serviceData) => {
  try {
    const { id, body } = serviceData;
    const result = await customerModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return dbHelper.formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: customerService: updateCustomer`,
      error.message
    );
    throw new Error(error);
  }
};

// deleteCustomer
module.exports.deleteCustomer = async (serviceData) => {
  try {
    const { id } = serviceData;
    const result = await customerModel.findByIdAndUpdate(
      id,
      { isDeleted: true, status: false },
      {
        new: true,
      }
    );
    return dbHelper.formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: supervisorService: deleteCustomer`,
      error.message
    );
    throw new Error(error);
  }
};

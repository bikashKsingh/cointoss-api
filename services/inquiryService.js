const inquiryModel = require("../database/models/inquiryModel");
const { formatMongoData } = require("../helpers/dbHelper");

// createInquiry
module.exports.createInquiry = async (serviceData) => {
  try {
    // find first
    // const newsletter = await inquiryModel.findOne({
    //   email: serviceData.email,
    // });

    // if (newsletter) {
    //   throw new Error(inquiryMessage.NEWSLETTER_ALREADY_EXIST);
    // }

    const newData = new inquiryModel(serviceData);
    const result = await newData.save();
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: inquiryService: createInquiry`,
      error.message
    );
    throw new Error(error);
  }
};

// getInquiryById
module.exports.getInquiryById = async (serviceData) => {
  try {
    const id = serviceData?.id;
    const result = await inquiryModel
      .findOne({ _id: id })
      .populate({ path: "product" });
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: inquiryService: getInquiryById`,
      error.message
    );
    throw new Error(error);
  }
};

// getAllInquiries
module.exports.getAllInquiries = async (serviceData) => {
  try {
    let conditions = {};
    const {
      limit = 10,
      page = 1,
      searchQuery,
      status = true,
      inquiryStatus = "All",
      isDeleted = false,
    } = serviceData;

    // SearchQuery
    if (searchQuery) {
      conditions = {
        $or: [
          { email: { $regex: searchQuery, $options: "i" } },
          { name: { $regex: searchQuery, $options: "i" } },
          { mobile: { $regex: searchQuery, $options: "i" } },
          { message: { $regex: searchQuery, $options: "i" } },
        ],
      };
    }

    // Status
    if (status == "All") {
      delete conditions.status;
    } else {
      conditions.status = status;
    }

    // Inquiry Status
    if (inquiryStatus == "All") {
      delete conditions.inquiryStatus;
    } else {
      conditions.inquiryStatus = inquiryStatus;
    }

    // count record
    const totalRecords = await inquiryModel.countDocuments(conditions);
    // Calculate the total number of pages
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    // DeletedAccount
    conditions.isDeleted = isDeleted;
    const result = await inquiryModel
      .find(conditions)
      .populate({ path: "product" })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .sort({ _id: -1 });
    const res = {
      body: formatMongoData(result),
      page,
      totalPages,
      totalRecords,
    };
    return res;
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: inquiryService: getAllInquiries`,
      error.message
    );
    throw new Error(error);
  }
};

// updateInquiry
module.exports.updateInquiry = async (serviceData) => {
  try {
    const { id, body } = serviceData;
    const result = await inquiryModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: inquiryService: updateInquiry`,
      error.message
    );
    throw new Error(error);
  }
};

// deleteInquiry
module.exports.deleteInquiry = async (serviceData) => {
  try {
    const { id } = serviceData;
    const result = await inquiryModel.findByIdAndUpdate(id, {
      isDeleted: true,
      status: false,
    });
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: inquiryService: deleteInquiry`,
      error.message
    );
    throw new Error(error);
  }
};

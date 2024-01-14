const testimonialModel = require("../database/models/testimonialModel");
const { formatMongoData } = require("../helpers/dbHelper");

// createTestimonial
module.exports.createTestimonial = async (serviceData) => {
  try {
    // find first
    // const newsletter = await testimonialModel.findOne({
    //   email: serviceData.email,
    // });

    // if (newsletter) {
    //   throw new Error(testimonialMessage.TESTIMONIAL_ALREADY_EXIST);
    // }

    const newData = new testimonialModel(serviceData);
    const result = await newData.save();
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: testimonialService: createTestimonial`,
      error.message
    );
    throw new Error(error);
  }
};

// getTestimonialById
module.exports.getTestimonialById = async (serviceData) => {
  try {
    const id = serviceData?.id;
    const result = await testimonialModel.findOne({ _id: id });
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: testimonialService: getTestimonialById`,
      error.message
    );
    throw new Error(error);
  }
};

// getAllTestimonials
module.exports.getAllTestimonials = async (serviceData) => {
  try {
    let conditions = {};
    const {
      limit = 10,
      page = 1,
      searchQuery,
      status = true,
      isDeleted = false,
    } = serviceData;

    // SearchQuery
    if (searchQuery) {
      conditions = {
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { designation: { $regex: searchQuery, $options: "i" } },
          { comment: { $regex: searchQuery, $options: "i" } },
        ],
      };
    }

    // Status
    if (status == "All") {
      delete conditions.status;
    } else {
      conditions.status = status;
    }

    // count record
    const totalRecords = await testimonialModel.countDocuments(conditions);
    // Calculate the total number of pages
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    // DeletedAccount
    conditions.isDeleted = isDeleted;
    const result = await testimonialModel
      .find(conditions)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));
    const res = {
      body: formatMongoData(result),
      page,
      totalPages,
      totalRecords,
    };
    return res;
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: testimonialService: getAllTestimonials`,
      error.message
    );
    throw new Error(error);
  }
};

// updateTestimonial
module.exports.updateTestimonial = async (serviceData) => {
  try {
    const { id, body } = serviceData;
    const result = await testimonialModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: testimonialService: updateTestimonial`,
      error.message
    );
    throw new Error(error);
  }
};

// deleteTestimonial
module.exports.deleteTestimonial = async (serviceData) => {
  try {
    const { id } = serviceData;
    const result = await testimonialModel.findByIdAndUpdate(id, {
      isDeleted: true,
      status: false,
    });
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: testimonialService: deleteTestimonial`,
      error.message
    );
    throw new Error(error);
  }
};

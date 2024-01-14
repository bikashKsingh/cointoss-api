const mainMenuModel = require("../database/models/mainMenuModel");
const { formatMongoData } = require("../helpers/dbHelper");

// createMainMenu
module.exports.createMainMenu = async (serviceData) => {
  try {
    const newData = new mainMenuModel(serviceData);
    const result = await newData.save();
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: mainMenuService: createMainMenu`,
      error.message
    );
    throw new Error(error);
  }
};

// getMainMenuById
module.exports.getMainMenuById = async (serviceData) => {
  try {
    const id = serviceData?.id;
    const result = await mainMenuModel.findOne({ _id: id });
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: mainMenuService: getMainMenuById`,
      error.message
    );
    throw new Error(error);
  }
};

// getAllMainMenus
module.exports.getAllMainMenus = async (serviceData) => {
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
        $or: [{ title: { $regex: searchQuery, $options: "i" } }],
      };
    }

    // Status
    if (status == "All") {
      delete conditions.status;
    } else {
      conditions.status = status;
    }

    // count record
    const totalRecords = await mainMenuModel.countDocuments(conditions);
    // Calculate the total number of pages
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    // DeletedAccount
    conditions.isDeleted = isDeleted;
    const result = await mainMenuModel
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
      `Somthing Went Wrong Service: mainMenuService: getAllMainMenus`,
      error.message
    );
    throw new Error(error);
  }
};

// updateMainMenu
module.exports.updateMainMenu = async (serviceData) => {
  try {
    const { id, body } = serviceData;
    const result = await mainMenuModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: mainMenuService: updateMainMenu`,
      error.message
    );
    throw new Error(error);
  }
};

// deleteMainMenu
module.exports.deleteMainMenu = async (serviceData) => {
  try {
    const { id } = serviceData;
    const result = await mainMenuModel.findByIdAndUpdate(id, {
      isDeleted: true,
      status: false,
    });
    return formatMongoData(result);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: mainMenuService: deleteMainMenu`,
      error.message
    );
    throw new Error(error);
  }
};

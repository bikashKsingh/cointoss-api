const mainMenuService = require("../services/mainMenuService");
const { defaultServerResponse, mainMenuMessage } = require("../constants");

// createMainMenu
module.exports.createMainMenu = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await mainMenuService.createMainMenu(req.body);
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = mainMenuMessage.MAINMENU_CREATED;
    } else {
      response.message = mainMenuMessage.MAINMENU_NOT_CREATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: mainMenuController: createMainMenu`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// getMainMenuById
module.exports.getMainMenuById = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await mainMenuService.getMainMenuById(req.params);
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = mainMenuMessage.MAINMENU_FETCHED;
    } else {
      response.message = mainMenuMessage.MAINMENU_NOT_FETCHED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: mainMenuController: getMainMenuById`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// getAllMainMenus
module.exports.getAllMainMenus = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await mainMenuService.getAllMainMenus(req.query);
    if (serviceResponse) {
      response.body = serviceResponse.body;
      response.page = serviceResponse.page;
      response.totalRecords = serviceResponse.totalRecords;
      response.totalPages = serviceResponse.totalPages;
      response.status = 200;
      response.message = mainMenuMessage.MAINMENU_FETCHED;
    } else {
      response.message = mainMenuMessage.MAINMENU_NOT_FETCHED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: mainMenuController: getAllMainMenus`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// updateMainMenu
module.exports.updateMainMenu = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await mainMenuService.updateMainMenu({
      id: req.params.id,
      body: req.body,
    });
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = mainMenuMessage.MAINMENU_UPDATED;
    } else {
      response.message = mainMenuMessage.MAINMENU_NOT_UPDATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: mainMenuController: updateMainMenu`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// deleteMainMenu
module.exports.deleteMainMenu = async (req, res) => {
  const response = { ...defaultServerResponse };
  try {
    const serviceResponse = await mainMenuService.deleteMainMenu(req.params);
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = mainMenuMessage.MAINMENU_DELETED;
    } else {
      response.message = mainMenuMessage.MAINMENU_NOT_DELETED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: mainMenuController: deleteMainMenu`,
      error.message
    );
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

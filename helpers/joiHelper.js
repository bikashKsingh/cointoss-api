const { checkMongoObject } = require("./dbHelper");
const constants = require("../constants");

module.exports.customCallback = (value, option) => {
  if (!checkMongoObject(value))
    return option.message(
      `(${option.state.path[0]}) ${constants.databaseMessage.INVALID_OBJECTID}`
    );
  return true;
};

// address validation schema

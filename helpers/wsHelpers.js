module.exports.emitNewEvent = function emitNewEvent(event, data) {
  if (global.io) {
    global.io.emit(event, data);
  } else {
    console.error("Socket.IO not initialized. Call initializeSocketIo first.");
  }
};

module.exports.events = {
  WITHDRAWAL_REQUEST_CREATED: "withdrawalRequestCreated",
};

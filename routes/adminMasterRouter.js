const express = require("express");
const router = express.Router();

router.use("/api/v1/admins", require("./adminRouter"));

module.exports = router;

const router = require("express").Router();
const health = require("@controllers/health");

router.get("/check",
    health.healthTest
);

module.exports = router;
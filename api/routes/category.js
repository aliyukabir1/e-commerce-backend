const express = require("express");
const checkAuth = require("../middleware/check-auth");
const category_controller = require("../controllers/category");
const router = express.Router();

router.get("/", checkAuth, category_controller.get_all_categories);
router.get("/:categoryId", checkAuth, category_controller.get_one_category);
router.post("/", checkAuth, category_controller.create_category);
router.delete("/:categoryId", checkAuth, category_controller.delete_category);
router.put("/:categoryId", checkAuth, category_controller.update_category);

module.exports = router;

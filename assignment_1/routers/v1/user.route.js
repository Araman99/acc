const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user.controller')

router.get("/random", userController.getRandomUserData);
router.get("/all", userController.getAllData);
router.post("/save", userController.saveUserData);
router.patch("/update/:id", userController.updateSingleUser);
router.patch("/bulk-update", userController.updateMultipleUser);
router.delete("/delete/:id", userController.deleteUserData);

module.exports = router;
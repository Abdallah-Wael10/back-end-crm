const express = require('express');
const router = express.Router();
const controller = require("../controllers/users")

router.route("/")
.get(controller.getAllUsers)

router.route("/register")
.post(controller.register)
router.route("/login")
.post(controller.login)
router.route("/:id")
.get(controller.getUser)
.put(controller.updateUser)
.delete(controller.deleteUser) 



module.exports = router;
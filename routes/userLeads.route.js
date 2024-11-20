// its page router
  const express = require('express');
  const router = express.Router();
  const controllers = require('../controllers/userLeads.controller');

router.route("/")
.get(controllers.getAllLeads)
.post(controllers.createLead)

router.route("/:id")
.get(controllers.getlead)
.patch(controllers.updateLead)
.delete(controllers.deleteLead)

module.exports = router;
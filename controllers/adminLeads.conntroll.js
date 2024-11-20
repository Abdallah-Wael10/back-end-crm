const adminLeads = require("../models/adminLeads.model");
const asyncWrapper = require("../middleware/asyncWrapper");

// Get all user leads

const getAllLeads = asyncWrapper(async (req, res) => {
  const leads = await adminLeads.find({}, { __v: false });

  if (!leads) {
    return res
      .status(404)
      .json({ status: "FAILED", message: "No leads found" });
  }

  res.status(200).json(leads);
});

const getlead = asyncWrapper(async (req, res) => {
  const lead = await adminLeads.findById(req.params.id);

  if (!lead) {
    return res
      .status(404)
      .json({ status: "FAILED", message: "Lead not found" });
  }

  res.status(200).json(lead);
});

const createLead = asyncWrapper(async (req, res) => {
  const {
    clientName,
    phoneNumber,
    whatsappNumber,
    sources,
    services,
    carModel,
    expectedRevenue,
    date,
    comment,
    userId,
    leadStatus

  } = req.body;
  const newLead = new adminLeads({
    clientName,
    phoneNumber,
    whatsappNumber,
    sources,
    services,
    carModel,
    expectedRevenue,
    date,
    comment,
    userId,
    leadStatus

  });
  await newLead.save();
  res.status(201).json(newLead);

});

const updateLead = asyncWrapper(async (req, res) => {
   const id = req.params.id;
   const updateLead = await adminLeads.updateOne(
    {_id : id},
    {$set : {...req.body}}
   ) 
   return res.json({status : "success", data : {updateLead}})
})

const deleteLead = asyncWrapper(async (req, res) => {
  await adminLeads.deleteOne({_id : req.params.id})
  res.status(200).json({status : "success", data : null})
})

module.exports = { getAllLeads, getlead, createLead, updateLead, deleteLead };
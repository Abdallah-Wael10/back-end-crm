const asyncWrapper = require("../middleware/asyncWrapper")
const bcrypt = require('bcrypt');
const admins = require("../models/admin.model")

const getAllUsers= asyncWrapper(async(req,res)=>{
  const allUsers = await admins.find({}, {__v: false, password: false})
  if (!allUsers) {
    return res
      .status(404)
      .json({ status: "FAILED", message: "No leads found" });
  }
  res.json(allUsers );
});

const getUser = asyncWrapper(async(req,res)=>{
   const user = await admins.findById(req.params.id,{} ,{__v: false, password: false})
   res.status(200).json(user)
});

const updateUser = asyncWrapper(async (req, res, next) => {
    try {
        const { id } = req.params;
        const { old_password, new_password } = req.body;

        // Check if the user exists
        const user = await admins.findById(id); // Correcting "User" to "users"
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify the old password
        const isMatch = await bcrypt.compare(old_password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        // Hash the new password and save
        const hashedPassword = await bcrypt.hash(new_password, 10);
        user.password = hashedPassword;
        await user.save();

        return res.json({ status: "success", message: "Password updated successfully" });
    } catch (error) {
        console.error("Error in updateUser:", error); // Log any server-side error
        res.status(500).json({ message: "Internal server error" });
    }
});


const register = asyncWrapper(async (req, res) => {
    const { first_name, last_name, email, password, phone } = req.body;
    const oldUser = await admins.findOne({ email: email });
    if (oldUser)
      return res
        .status(400)
        .json({
          status: "fail",
          message: "User already exists (email used before)",
        });
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new admins({
        first_name,
        last_name,
      email,
      password: hashPassword,
      phone
    });
    // const token = await generate({
    //   email: newUser.email,
    //   id: newUser._id,
    // });
    // newUser.token = token;
    await newUser.save();
    res.status(200).json({ status: "success", data: newUser });
  });

  const login = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await admins.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ error: "Invalid email or password." });
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
        return res.status(400).json({ error: "Invalid email or password." });
    }

    // Return the user data without the password on successful login
    res.status(200).json({
        message: "Login successful",
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        
    });
});


const deleteUser = asyncWrapper(async(req,res,next)=>{
    await admins.deleteOne({_id : req.params.id})
    res.status(200).json({status : "success", data : null})
})

module.exports ={
     getAllUsers,
     getUser,
     register,
     login,
     deleteUser,
     updateUser,
}
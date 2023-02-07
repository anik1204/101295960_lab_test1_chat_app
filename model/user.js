const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true, maxLength: 100 },
		firstname: { type: String, required: true, unique: true, maxLength: 100 },
		lastname: { type: String, required: true, unique: true, maxLength: 100 },
		password: { type: String, required: true, maxLength: 100 },
		createon: { type: Date, default: Date.now },
	},
	{ collection: "Users" }
);

const model = mongoose.model("userSchema", userSchema);
module.exports = model;

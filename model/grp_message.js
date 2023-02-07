const mongoose = require("mongoose");

const grpMessageSchema = new mongoose.Schema(
	{
		from_user: { type: String, required: true, maxLength: 100 },
		room: { type: String, required: true, maxLength: 100 },
		message: { type: String, required: true },
		date_sent: { type: Date, default: Date.now },
	},
	{ collection: "grpMessages" }
);

const model = mongoose.model("grpMessageSchema", grpMessageSchema);
module.exports = model;

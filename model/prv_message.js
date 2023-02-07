const mongoose = require("mongoose");

const prvMessageSchema = new mongoose.Schema(
	{
		from_user: { type: String, required: true, maxLength: 100 },
		to_user: { type: String, required: true, maxLength: 100 },
		message: { type: String, required: true },
		date_sent: { type: Date, default: Date.now },
	},
	{ collection: "prvMessages" }
);

const model = mongoose.model("prvMessageSchema", prvMessageSchema);
module.exports = model;

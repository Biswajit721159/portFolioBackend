const { Schema, model } = require("mongoose");

const userPortFolioSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "user",
		},
	},
	{
		timestamps: true,
	}
);

let userPortFolio = model("userPortFolio", userPortFolioSchema);
module.exports = userPortFolio;

import mongoose from "mongoose"

const PostSchema = new mongoose.Schema(
	{
		iban: {
			type: String,
			required: true,
			default: "",
		},
		fullName: {
			type: String,
			required: true,
			default: "",
		},
		city: {
			type: String,
			default: "",
		},
		email: {
			type: String,
			default: "",
			required: true,
		},
		password: {
			type: String,
			default: "",
			required: true,
		},
		phone: {
			type: String,
			default: "",
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.model("Post", PostSchema)

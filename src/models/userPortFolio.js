const { Schema, model, default: mongoose } = require("mongoose");

//profile section

const profileNameWithSchema = new mongoose.Schema({
	profileName: { type: String },
	profileImageUrl: { type: String },
	profileLink: { type: String },
});

const profileSchema = new mongoose.Schema({
	profileIntoduction: { type: String, default: "" },
	profiles: [profileNameWithSchema],
});

//about section
const aboutSchema = new mongoose.Schema({
	aboutName: { type: String },
	skills: { type: Array },
});

// task section
const keyTasks = new mongoose.Schema({
	taskIntroduction: {
		type: String,
		default: "",
	},
	description: {
		type: String,
		default: "",
	},
});
const workExperienceSchema = new mongoose.Schema({
	role: { type: String },
	companyName: { type: String },
	startDate: { type: Date },
	endDate: { type: Date },
	projectName: { type: String },
	techStacks: { type: Array },
	keyTasks: [keyTasks],
});

//eduction section
const educationSchema = new mongoose.Schema({
	instituteName: { type: String },
	degree: { type: String },
	degreeName: { type: String },
	mark: { type: String },
	startYear: { type: String },
	endYear: { type: String },
});

//project section

const linksSchema = new mongoose.Schema({
	linksName: { type: String },
	link: { Type: String },
});

const projectSchema = new mongoose.Schema({
	projectName: { type: String },
	projectDescription: { type: String },
	techStack: { type: Array },
	links: [linksSchema],
});

// achievement section

const achievementSchema = new mongoose.Schema({
	achievementName: { type: String },
	link: { type: String, default: "" },
});

// mian section
const userPortFolioSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "user",
		},
		introduction: {
			type: String,
			default: "",
		},
		profileSection: {
			type: profileSchema,
		},
		aboutSection: {
			type: [aboutSchema],
		},
		workExperienceSection: {
			type: [workExperienceSchema],
		},
		educationSection: {
			type: [educationSchema],
		},
		projectSection: {
			type: [projectSchema],
		},
		achievementSection: {
			type: [achievementSchema],
		},
		contactInfo: {
			email: {
				type: String,
				require: true,
			},
			mobile: {
				type: String,
				require: true,
			},
		},
	},
	{
		timestamps: true,
	}
);

let userPortFolio = model("userPortFolio", userPortFolioSchema);
module.exports = userPortFolio;

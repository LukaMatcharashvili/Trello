import mongoose from "mongoose";
import Schema from "mongoose";
import { convertImgToCloudinary } from "../services/convertImageToCloudinary.js";

const teamSchema = mongoose.Schema(
  {
    owner: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    coverPicture: {
      type: String,
    },
    members: {
      type: [String],
      default: [],
    },
    todo: {
      type: [{ title: String, todo: String }],
      default: [],
    },
    done: {
      type: [{ title: String, done: String }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

teamSchema.pre("save", async function preSaveImgConvert(next) {
  const team = this;
  try {
    if (team.isModified("coverPicture")) {
      let cloudinaryImage = (await convertImgToCloudinary(team.coverPicture))
        .url;
      if (cloudinaryImage) {
        team.coverPicture = cloudinaryImage;
      }
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

const Team = mongoose.model("team", teamSchema);

export default Team;

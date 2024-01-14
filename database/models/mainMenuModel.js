const mongoose = require("mongoose");
const modelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      default: "#",
      trim: true,
    },
    menuType: {
      type: String,
      enum: ["MEGAMENU", "LIST", "SINGLE"],
      default: "SINGLE",
      required: true,
    },
    subMenus: [
      {
        title: {
          type: String,
          default: "",
          trim: true,
        },
        slug: {
          type: String,
          default: "#",
          trim: true,
        },
        status: {
          type: Boolean,
          default: true,
        },
        menuType: {
          type: String,
          enum: ["MEGAMENU", "LIST", "SINGLE"],
          default: "SINGLE",
          required: true,
        },
        subMenus: [
          {
            title: {
              type: String,
              default: "",
              trim: true,
            },
            slug: {
              type: String,
              default: "#",
              trim: true,
            },
            status: {
              type: Boolean,
              default: true,
            },
          },
        ],
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, option) => {
        delete ret.__v;
        ret.id = ret._id;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("mainMenu", modelSchema);

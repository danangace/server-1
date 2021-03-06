const { Schema, model } = require("mongoose");
const { hashPassword, checkPassword } = require("../helpers/bcrypt");
const Parent = require("./parent");

const childSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "nama anak wajib diisi"],
      validate: [
        { validator: isUsernameUnique, message: "nama anak telah digunakan" },
      ],
    },
    password: {
      type: String,
      required: [true, "kata sandi wajib diisi"],
      minlength: [8, "kata sandi minimal 8 karakter"],
    },
    familyId: {
      type: String,
      required: [
        true,
        "ID keluarga wajib diisi. Silakan tanyakan kepada orang tua",
      ],
    },
    avatar: String,
    role: {
      type: String,
      default: "child",
    },
    dateOfBirth: {
      type: Date,
      required: [true, "tanggal lahir wajib diisi"],
    },
    point: {
      type: Number,
      default: 0,
    },
    rewardsHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reward'
      },
    ],
    avatar: {
      type: String,
    },
    tokenExpo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

function isUsernameUnique(value) {
  return Child.findOne({ username: value }).then(found => {
    if (found) return false;
    else return true;
  });
}

//hashPassword
childSchema.pre("save", function(next) {
  this.password = hashPassword(this.password);
  next();
});

const Child = model("Child", childSchema);

module.exports = Child;

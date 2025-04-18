import mongoose from "mongoose";

const subSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "SUbscription Name is Required..."],
      trim: true,
      minLength: 4,
      maxLength: 32,
    },
    price: {
      type: Number,
      required: [true, "Price is Required"],
      min: [0],
    },
    frequency: {
      type: String,
      enum: ["weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: ["lite", "basic", "premium"],
      required: [true, "Category is Required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment Method is Required"],
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          value >= Date.now();
        },
        message: "Start Date shouldn't be a Older Date",
      },
    },
    renewalDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          value >= Date.now() && value > this.startDate;
        },
        message: "Renewal Date shouldn't be a Older",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // for better optimization by using index in userId
    },
  },
  { timestamps: true }
);
// available checkings in schema
// type, required, min, max, unique, enum, validate(), minLength, maxLength, match[/regex/] , ref(Id), index, default, trim,
subSchema.pre("save", function (next) {
  // a pre function which will run before saving the document ie for auto calculate renewal date validation and checks
  const renewalDates = {
    weekly: 7,
    monthly: 30,
    yearly: 365,
  };
  if (!this.renewalDate) {
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.startDate.getDate() + renewalDates[this.frequency]
    );
  }
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }
  next();
});
export const Subscription = mongoose.model("Subscription", subSchema);

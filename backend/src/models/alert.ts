import mongoose, { model, Schema } from "mongoose";
import { Alert } from "../types/alert";

const alertSchema: Schema = new Schema(
  {
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
alertSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.models.Alert || model<Alert>("Alert", alertSchema);

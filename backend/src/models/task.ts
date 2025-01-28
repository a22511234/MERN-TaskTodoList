import mongoose, { model, Schema } from "mongoose";
import { Task } from "../types/Task/task";

const taskSchema: Schema = new Schema(
  {
    taskTitle: {
      type: String,
      required: true,
    },
    taskDescription: {
      type: String,
      required: false,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    alertTime: {
      type: Date,
      required: true,
      default: function (this: any) {
        return new Date(this.endTime.getTime() - 4 * 60 * 60 * 1000); // endTime的四小時前
      },
    },
    isCompleted: {
      type: Boolean,
      required: true,
    },
    assignedTo: {
      type: [String],
      required: true,
    },
    studentStatuses: [
      {
        userId: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          required: true,
          enum: ["not_started", "in_progress", "completed"],
        },
      },
    ],
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
taskSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.models.Task || model<Task>("Task", taskSchema);

import mongoose, { Schema, Document } from "mongoose";

export interface JobDocument extends Document {
  title: string;
  description: string;
  experience: number;
  salary?: number;
  apply_link: string;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<JobDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
      min: 0,
    },
    salary: {
      type: Number,
    },
    apply_link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const JobModel =
  mongoose.models.Job || mongoose.model<JobDocument>("Job", JobSchema);

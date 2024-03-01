import mongoose, { Schema } from "mongoose";
interface CustomUser {
  username: string;
  password: string;
  tankMonitor: {
    tankMonitorId: string;
    numberOfMonitoredTanks: number;
  };
}
console.log(process.env.MONGO_URI!);
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log("A database error occured"));
mongoose.Promise = global.Promise;

const userSchema = new Schema<CustomUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
    },
    tankMonitor: {
      tankMonitorId: {
        type: String,
      },
      numberOfMonitoredTanks: {
        type: Number,
      },
    },
  },

  {
    timestamps: true,
  }
);
export const User =
  mongoose.models.User || mongoose.model<CustomUser>("User", userSchema);

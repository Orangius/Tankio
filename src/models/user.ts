import mongoose, { Schema } from "mongoose"
interface CustomUser {
  username: string
  password: string
  tankMonitor: {
    tankMonitorId: string
    numberOfMonitoredTanks: number
  }
}
mongoose.connect(process.env.MONGO_URI!)
mongoose.Promise = global.Promise

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
        required: true,
      },
      numberOfMonitoredTanks: {
        type: Number,
        required: true,
      },
    },
  },

  {
    timestamps: true,
  }
)
export const User =
  mongoose.models.User || mongoose.model<CustomUser>("User", userSchema)

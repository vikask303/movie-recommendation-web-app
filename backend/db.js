import mongoose from "mongoose"

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("db connected")
  } catch (err) {
    console.error("db error", err)
    process.exit(1)
  }
}

export default connectDB

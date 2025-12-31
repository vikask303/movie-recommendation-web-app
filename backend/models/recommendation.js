import mongoose from "mongoose"

const recommendationSchema = new mongoose.Schema(
  {
    userInput: {
      type: String,
      required: true
    },
    movies: {
      type: [String],
      required: true
    }
  },
  { timestamps: true }
)

export default mongoose.model("Recommendation", recommendationSchema)

import { GoogleGenerativeAI } from "@google/generative-ai"
import Recommendation from "../models/Recommendation.js"
import dotenv from "dotenv"
dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const recommendRoutes = async (fastify) => {
  fastify.post("/recommend", async (req, reply) => {
    const { userInput } = req.body

    if (!userInput) {
      return reply.status(400).send({ message: "User input required" })
    }

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
      })

      const prompt = `You are an API. Return ONLY valid JSON. No explanation. No markdown. No extra text. Task:Recommend 3 to 5 movies based on: "${userInput}" Return format:["Movie 1", "Movie 2"]`

      const result = await model.generateContent(prompt)
      const text = result.response.text()

      const movies = JSON.parse(text)

      await Recommendation.create({
        userInput,
        movies
      })

      reply.send({ movies })

    } catch (error) {
      console.error(error)
      reply.status(500).send({ message: "Gemini AI error" })
    }
  })
}

export default recommendRoutes

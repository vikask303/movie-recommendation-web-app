import Fastify from "fastify"
import cors from "@fastify/cors"
import dotenv from "dotenv"
import connectDB from "./db.js"
import recommendRoutes from "./routes/recommend.routes.js"

dotenv.config()
connectDB()

const PORT = process.env.PORT || 5000

const fastify = Fastify()

await fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST"]
})

fastify.register(recommendRoutes)

fastify.listen({ port: PORT, host: "0.0.0.0" },() => {
    console.log(`Server running on port ${PORT}`)
  }
)

import Fastify from "fastify"
import cors from "@fastify/cors"
import dotenv from "dotenv"
import connectDB from "./db.js"
import recommendRoutes from "./routes/recommend.routes.js"

dotenv.config()
connectDB()

const fastify = Fastify()

await fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST"]
})

fastify.register(recommendRoutes)

fastify.listen({ port: 5000 }, () => {
  console.log("server is running")
})

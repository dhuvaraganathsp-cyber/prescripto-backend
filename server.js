import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
// Allow all origins, methods, and headers. Keep origin: '*' for permissive access
// and explicitly handle preflight OPTIONS requests.
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  // Allow the custom `token` header used by the frontend and common headers.
  // If you prefer automatic reflection of requested headers, remove this option.
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin", "token"],
  // Note: do NOT set `credentials: true` together with `origin: '*'` — browsers will ignore it.
  // If you need credentials (cookies/Authorization via browser credentials), switch to a
  // specific origin or a function that returns the request origin instead of '*'.
}))

// Respond to preflight requests for all routes
app.options("*", cors())

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

app.get("/", (req, res) => {
  res.send("API Working")
});

app.listen(4000, () => console.log(`Server started on PORT:${port}`))
import express from "express";

//routes
import postsRoutes from "./routes/posts.routes.js";
import loginRoutes from "./routes/user.routes.js";

//config
const app = express();

//middlewares
app.use(express.json());

//routes
app.use("/api", postsRoutes);
app.use("/auth", loginRoutes);

//server
app.use((req, res, next) => {
  res.status(404).json({ status: 404, message: "Not found" });
});

export default app;

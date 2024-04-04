import express from "express";
import cors from "cors";
import router from "./routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({}));
app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}/api`);
});

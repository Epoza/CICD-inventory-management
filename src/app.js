import express from "express";
import cors from "cors";
import {
  addItem,
  updateQuantity,
  removeItem,
  getItem
} from "./inventory.js";

import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public"))); // where the html file is located

// Routes
app.post("/add", (req, res) => {
  const { id, name, quantity, price } = req.body;
  const result = addItem(id, name, quantity, price);
  res.json(result);
});

app.put("/update", (req, res) => {
  const { id, quantity } = req.body;
  const result = updateQuantity(id, quantity);
  res.json(result);
});

app.delete("/remove/:id", (req, res) => {
  const result = removeItem(req.params.id);
  res.json(result);
});

app.get("/item/:id", (req, res) => {
  const item = getItem(req.params.id);
  res.json(item);
});

app.get("/", (req, res) => {
  res.send("Inventory API running");
});

app.listen(3000, () => console.log("Server running on port 3000"));
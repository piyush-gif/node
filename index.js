const express = require("express");
const app = express();

const tasks = [
  { id: 1, name: "Buy milk", completed: false },
  { id: 2, name: "Walk dog", completed: true },
];

// app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method}, ${req.path} - ${new Date().toISOString()}`);
  next();
});

app.post("/tasks", (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res.status(400).json({ message: "task doenst have a name" });
  }
  const newTask = { id: Date.now(), name: name, completed: false };
  tasks.push(newTask);

  res.status(201).json(newTask);
});

app.get("/tasks", (req, res) => {
  throw new Error("test");
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
});
app.listen(3000);

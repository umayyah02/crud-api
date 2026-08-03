const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");
console.log(swaggerDocument.info);

const app = express();

app.use(express.json());

const PORT = 3000;

// In-memory tasks
const tasks = [
    {
        id: 1,
        title: "Buy groceries",
        done: false
    },
    {
        id: 2,
        title: "Complete assignment",
        done: true
    },
    {
        id: 3,
        title: "Go to the gym",
        done: false
    }
];

// Root endpoint
app.get("/", (req, res) => {
    res.json({
        name: "Task API",
        version: "1.0",
        endpoints: ["/tasks"]
    });
});

// Health endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

// GET all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// GET one task
app.get("/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    res.json(task);

});

// POST new task
app.post("/tasks", (req, res) => {

    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    const newTask = {
        id: tasks.length + 1,
        title: title,
        done: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);

});

// PUT update task
app.put("/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    const { title, done } = req.body;

    if (!title) {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    task.title = title;
    task.done = done;

    res.json(task);

});

// DELETE task
app.delete("/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    tasks.splice(index, 1);

    res.sendStatus(204);

});

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
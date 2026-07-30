const express = require("express");

const app = express();

const PORT = 3000;

// In-memory task list
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

// Get all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// Get a single task by ID
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
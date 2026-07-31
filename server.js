const express = require("express");

const app = express();

app.use(express.json()); //If the request contains JSON, convert it into a JavaScript object.

const PORT = 3000;

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

// Health check endpoint
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

// Create a new task
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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
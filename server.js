const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");
const Database = require("better-sqlite3");

const app = express();

app.use(express.json());

const PORT = 3000;

// Connect to database
const db = new Database("tasks.db");

// Create tasks table
db.prepare(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        done INTEGER
    )
`).run();

// Add example tasks only if database is empty
const count = db.prepare("SELECT COUNT(*) AS count FROM tasks").get();

if (count.count === 0) {
    const insert = db.prepare(
        "INSERT INTO tasks (title, done) VALUES (?, ?)"
    );

    insert.run("Buy groceries", 0);
    insert.run("Complete assignment", 1);
    insert.run("Go to the gym", 0);
}


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
    const tasks = db.prepare("SELECT * FROM tasks").all();

    res.json(tasks);
});


// GET one task
app.get("/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const task = db.prepare(
        "SELECT * FROM tasks WHERE id = ?"
    ).get(id);

    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    res.json(task);
});


// POST new task
app.post("/tasks", (req, res) => {
    res.json({
        message: "Stage 2 will connect this to the database"
    });
});


// PUT update task
app.put("/tasks/:id", (req, res) => {
    res.json({
        message: "Stage 3 will connect this to the database"
    });
});


// DELETE task
app.delete("/tasks/:id", (req, res) => {
    res.json({
        message: "Stage 3 will connect this to the database"
    });
});


// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
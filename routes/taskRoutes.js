const express = require("express");
const router = express.Router();
const pool = require("../config/dbConfig");

// Create a new task
router.post("/tasks", async (req, res) => {
    const { title, description, recurrence, start_date, end_date } = req.body;
    try {
        const newTask = await pool.query(
            "INSERT INTO tasks (title, description, recurrence, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [title, description, recurrence, start_date, end_date]
        );
        res.status(201).json(newTask.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all tasks
router.get("/tasks", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tasks");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get a single task by ID
router.get("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const task = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
        if (task.rows.length === 0) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(task.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a task by ID
router.put("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, recurrence, start_date, end_date } = req.body;
    try {
        const updatedTask = await pool.query(
            "UPDATE tasks SET title = $1, description = $2, recurrence = $3, start_date = $4, end_date = $5 WHERE id = $6 RETURNING *",
            [title, description, recurrence, start_date, end_date, id]
        );
        if (updatedTask.rows.length === 0) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(updatedTask.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a task by ID
router.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await pool.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [id]);
        if (deletedTask.rows.length === 0) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

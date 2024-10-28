const pool = require("../config/dbConfig");

const allowedRecurrences = ['daily', 'weekly', 'monthly', 'custom'];

// Get all tasks
const getTasks = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM tasks");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new task
const createTask = async (req, res) => {
    const { title, recurrence, startDate, endDate } = req.body;
    
    // Validate recurrence
    if (!allowedRecurrences.includes(recurrence)) {
        return res.status(400).json({ error: "Invalid recurrence value." });
    }

    try {
        const result = await pool.query(
            "INSERT INTO tasks (title, recurrence, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, recurrence, startDate, endDate]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a task
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, recurrence, startDate, endDate } = req.body;

    // Validate recurrence
    if (!allowedRecurrences.includes(recurrence)) {
        return res.status(400).json({ error: "Invalid recurrence value." });
    }

    try {
        const result = await pool.query(
            "UPDATE tasks SET title = $1, recurrence = $2, start_date = $3, end_date = $4 WHERE id = $5 RETURNING *",
            [title, recurrence, startDate, endDate, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };

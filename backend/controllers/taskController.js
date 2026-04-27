const { Task } = require('../models');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.user.id } });
        return res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

exports.createTask = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({ error: 'Title is required' });

        const newTask = await Task.create({
            title,
            userId: req.user.id
        });

        return res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        return res.status(500).json({ error: 'Failed to create task' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const task = await Task.findOne({ where: { id, userId: req.user.id } });

        if (!task) {
            return res.status(404).json({ error: 'Task not found or permission denied' });
        }

        task.status = status || task.status;
        await task.save();

        return res.json(task);
    } catch (error) {
        console.error('Error updating task:', error);
        return res.status(500).json({ error: 'Failed to update task' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Task.destroy({ where: { id, userId: req.user.id } });

        if (!deleted) {
            return res.status(404).json({ error: 'Task not found or permission denied' });
        }

        return res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        return res.status(500).json({ error: 'Failed to delete task' });
    }
};

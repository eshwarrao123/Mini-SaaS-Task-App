import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return null;
        }
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    };

    const fetchTasks = async () => {
        try {
            const config = getAuthHeaders();
            if (!config) return;

            const response = await axios.get('http://localhost:5000/api/tasks', config);
            setTasks(response.data);
        } catch (err) {
            setError('Failed to fetch tasks.');
            if (err.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        setError(null);

        if (!newTaskTitle.trim()) return;

        try {
            const config = getAuthHeaders();
            if (!config) return;

            const response = await axios.post('http://localhost:5000/api/tasks', { title: newTaskTitle }, config);

            setTasks([...tasks, response.data]);
            setNewTaskTitle('');
        } catch (err) {
            setError('Failed to create task.');
        }
    };

    // Toggle task status between pending and completed
    const handleUpdateStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';

        try {
            const config = getAuthHeaders();
            if (!config) return;

            await axios.put(`http://localhost:5000/api/tasks/${id}`, { status: newStatus }, config);

            setTasks(tasks.map(task =>
                task.id === id ? { ...task, status: newStatus } : task
            ));
        } catch (err) {
            setError('Failed to update task.');
        }
    };

    // Delete a task
    const handleDeleteTask = async (id) => {
        try {
            const config = getAuthHeaders();
            if (!config) return;

            await axios.delete(`http://localhost:5000/api/tasks/${id}`, config);

            // Remove deleted task from UI list
            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            setError('Failed to delete task.');
        }
    };

    return (
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 max-w-3xl mx-auto mt-8 border border-gray-100">
            <h3 className="text-xl leading-6 font-semibold text-gray-900 mb-6">Your Tasks</h3>

            {error && (
                <div className="mb-4 bg-red-50 text-red-700 p-3 rounded text-sm font-medium">
                    {error}
                </div>
            )}

            {/* Application Add Form */}
            <form onSubmit={handleCreateTask} className="mb-8 flex gap-2">
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Enter a new task..."
                    className="flex-1 appearance-none border border-gray-300 rounded-md py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                    type="submit"
                    className="px-4 py-2 cursor-pointer border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add Task
                </button>
            </form>

            {/* Stored Tasks List */}
            <div className="space-y-3">
                {tasks.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No tasks found. Create one to get started!</p>
                ) : (
                    tasks.map(task => (
                        <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex-1 pr-4">
                                <div className={`text-gray-900 font-medium ${task.status === 'completed' ? 'line-through text-gray-400' : ''}`}>
                                    {task.title}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleUpdateStatus(task.id, task.status)}
                                    className={`px-3 py-1 cursor-pointer text-xs font-semibold rounded-md border ${task.status === 'completed'
                                        ? 'border-gray-300 text-gray-600 hover:bg-gray-100'
                                        : 'border-green-300 text-green-700 bg-green-50 hover:bg-green-100'
                                        }`}
                                >
                                    {task.status === 'completed' ? 'Undo' : 'Complete'}
                                </button>
                                <button
                                    onClick={() => handleDeleteTask(task.id)}
                                    className="px-3 py-1 cursor-pointer text-xs font-semibold rounded-md border border-red-200 text-red-600 bg-red-50 hover:bg-red-100"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;

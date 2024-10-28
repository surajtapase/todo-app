"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import TaskForm from './TaskForm';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tasks');
            // Process the tasks to extract only the date
            const formattedTasks = response.data.map(task => ({
                ...task,
                start_date: new Date(task.start_date).toLocaleDateString(), // Extracts the date
                end_date: new Date(task.end_date).toLocaleDateString()    // Extracts the date
            }));
            setTasks(formattedTasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };
    

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleEdit = (task) => {
        Swal.fire({
            title: 'Update Task',
            html: `
                <input type="text" id="title" class="swal2-input" placeholder="Task Title" value="${task.title}">
                <input type="text" id="description" class="swal2-input" placeholder="Description" value="${task.description}">
                <input type="text" id="recurrence" class="swal2-input" placeholder="Recurrence" value="${task.recurrence}">
                <input type="date" id="start_date" class="swal2-input" value="${task.start_date}">
                <input type="date" id="end_date" class="swal2-input" value="${task.end_date}">
            `,
            showCancelButton: true,
            confirmButtonText: 'Update',
            focusConfirm: false,
            preConfirm: async () => {
                const title = document.getElementById('title').value;
                const description = document.getElementById('description').value;
                const recurrence = document.getElementById('recurrence').value;
                const start_date = document.getElementById('start_date').value;
                const end_date = document.getElementById('end_date').value;
                
                try {
                    await axios.put(`http://localhost:5000/api/tasks/${task.id}`, {
                        title,
                        description,
                        recurrence,
                        start_date,
                        end_date
                    });
                    Swal.fire('Updated!', 'Task updated successfully', 'success');
                    fetchTasks();
                } catch (error) {
                    Swal.fire('Error!', 'Failed to update task', 'error');
                }
            }
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
                    Swal.fire('Deleted!', 'Task has been deleted.', 'success');
                    fetchTasks();
                } catch (error) {
                    Swal.fire('Error!', 'Failed to delete task', 'error');
                }
            }
        });
    };

    return (
        <div className="container mx-auto p-4">
            <TaskForm currentTask={currentTask} setCurrentTask={setCurrentTask} fetchTasks={fetchTasks} />
            <div className="mt-8 overflow-hidden shadow-lg rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-medium">Title</th>
                            <th className="py-3 px-4 text-left text-sm font-medium">Description</th>
                            <th className="py-3 px-4 text-left text-sm font-medium">Recurrence</th>
                            <th className="py-3 px-4 text-left text-sm font-medium">Start Date</th>
                            <th className="py-3 px-4 text-left text-sm font-medium">End Date</th>
                            <th className="py-3 px-4 text-left text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {tasks.map((task) => (
                            <tr key={task.id} className="hover:bg-gray-100 transition duration-150">
                                <td className="py-4 px-4 whitespace-nowrap text-black">{task.title}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-black">{task.description}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-black">{task.recurrence}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-black">{task.start_date}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-black">{task.end_date}</td>
                                <td className="py-4 px-4 whitespace-nowrap text-black flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(task)}
                                        className="text-blue-500 hover:text-blue-700 transition duration-150"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(task.id)}
                                        className="text-red-500 hover:text-red-700 transition duration-150"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaskList;

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import Swal from "sweetalert2";

// // const TaskForm = ({ currentTask, setCurrentTask, fetchTasks }) => {
// //   const [title, setTitle] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [recurrence, setRecurrence] = useState("");
// //   const [startDate, setStartDate] = useState("");
// //   const [endDate, setEndDate] = useState("");

// //   useEffect(() => {
// //     if (currentTask) {
// //       setTitle(currentTask.title);
// //       setDescription(currentTask.description);
// //       setRecurrence(currentTask.recurrence);
// //       setStartDate(currentTask.start_date);
// //       setEndDate(currentTask.end_date);
// //     } else {
// //       setTitle("");
// //       setDescription("");
// //       setRecurrence("");
// //       setStartDate("");
// //       setEndDate("");
// //     }
// //   }, [currentTask]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const taskData = {
// //       title,
// //       description,
// //       recurrence,
// //       start_date: startDate,
// //       end_date: endDate,
// //     };
// //     try {
// //       if (currentTask) {
// //         await axios.put(
// //           `http://localhost:5000/api/tasks/${currentTask.id}`,
// //           taskData
// //         );
// //         Swal.fire("Success", "Task updated successfully", "success");
// //       } else {
// //         await axios.post("http://localhost:5000/api/tasks", taskData);
// //         Swal.fire("Success", "Task added successfully", "success");
// //       }
// //       // Clear the form fields after success
// //       setTitle("");
// //       setDescription("");
// //       setRecurrence("");
// //       setStartDate("");
// //       setEndDate("");
// //       fetchTasks(); // Refresh the task list
// //       setCurrentTask(null); // Clear the current task for the form
// //     } catch (error) {
// //       Swal.fire("Error", "Something went wrong!", "error");
// //       console.error("Error:", error);
// //     }
// //   };
  
// //   return (
// //     <form
// //       onSubmit={handleSubmit}
// //       className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
// //     >
// //       <h2 className="text-lg font-semibold mb-4 text-black">
// //         {currentTask ? "Edit Task" : "Add New Task"}
// //       </h2>
// //       <input
// //         type="text"
// //         value={title}
// //         onChange={(e) => setTitle(e.target.value)}
// //         placeholder="Task Title"
// //         className="border border-gray-300 rounded-md p-2 w-full mb-3 text-black"
// //         required
// //       />
// //       <textarea
// //         value={description}
// //         onChange={(e) => setDescription(e.target.value)}
// //         placeholder="Task Description"
// //         className="border border-gray-300 rounded-md p-2 w-full mb-3 text-black"
// //       />
// //       <input
// //         type="text"
// //         value={recurrence}
// //         onChange={(e) => setRecurrence(e.target.value)}
// //         placeholder="Recurrence"
// //         className="border border-gray-300 rounded-md p-2 w-full mb-3 text-black"
// //       />
// //       <input
// //         type="date"
// //         value={startDate}
// //         onChange={(e) => setStartDate(e.target.value)}
// //         className="border border-gray-300 rounded-md p-2 w-full mb-3 text-black"
// //       />
// //       <input
// //         type="date"
// //         value={endDate}
// //         onChange={(e) => setEndDate(e.target.value)}
// //         className="border border-gray-300 rounded-md p-2 w-full mb-3 text-black"
// //       />
// //       <button
// //         type="submit"
// //         className="bg-green-600 text-white rounded-md p-2 w-50"
// //       >
// //         {currentTask ? "Update Task" : "Add Task"}
// //       </button>
// //     </form>
// //   );
// // };

// // export default TaskForm;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";

// const TaskForm = ({ currentTask, setCurrentTask, fetchTasks }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [recurrence, setRecurrence] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [errors, setErrors] = useState({}); // Error state for validation

//   useEffect(() => {
//     if (currentTask) {
//       setTitle(currentTask.title);
//       setDescription(currentTask.description);
//       setRecurrence(currentTask.recurrence);
//       setStartDate(currentTask.start_date);
//       setEndDate(currentTask.end_date);
//     } else {
//       setTitle("");
//       setDescription("");
//       setRecurrence("");
//       setStartDate("");
//       setEndDate("");
//     }
//   }, [currentTask]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const taskData = {
//       title,
//       description,
//       recurrence,
//       start_date: startDate,
//       end_date: endDate,
//     };
    
//     // Validate input
//     const validationErrors = {};
//     if (!title) validationErrors.title = "Title is required.";
//     if (!startDate) validationErrors.startDate = "Start date is required.";
//     if (!endDate) validationErrors.endDate = "End date is required.";
//     if (new Date(endDate) < new Date(startDate)) validationErrors.date = "End date must be after start date.";

//     if (Object.keys(validationErrors).length) {
//       setErrors(validationErrors);
//       return;
//     }

//     setErrors({}); // Clear errors if validation passes

//     try {
//       if (currentTask) {
//         await axios.put(
//           `http://localhost:5000/api/tasks/${currentTask.id}`,
//           taskData
//         );
//         Swal.fire("Success", "Task updated successfully", "success");
//       } else {
//         await axios.post("http://localhost:5000/api/tasks", taskData);
//         Swal.fire("Success", "Task added successfully", "success");
//       }
//       // Clear the form fields after success
//       setTitle("");
//       setDescription("");
//       setRecurrence("");
//       setStartDate("");
//       setEndDate("");
//       fetchTasks(); // Refresh the task list
//       setCurrentTask(null); // Clear the current task for the form
//     } catch (error) {
//       Swal.fire("Error", "Something went wrong!", "error");
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white shadow-lg rounded-lg p-8 mb-6 border border-gray-300"
//     >
//       <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
//         {currentTask ? "Edit Task" : "Add New Task"}
//       </h2>
      
//       {/* Title Input */}
//       <div className="mb-4">
//         <label htmlFor="title" className="block text-gray-700 mb-1">Task Title</label>
//         <input
//           id="title"
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className={`border border-gray-300 rounded-md p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ${errors.title ? 'border-red-500' : ''}`}
//           required
//         />
//         {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
//       </div>
      
//       {/* Description Input */}
//       <div className="mb-4">
//         <label htmlFor="description" className="block text-gray-700 mb-1">Task Description</label>
//         <textarea
//           id="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="border border-gray-300 rounded-md p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
//           rows="3"
//         />
//       </div>

//       {/* Recurrence Input */}
//       <div className="mb-4">
//         <label htmlFor="recurrence" className="block text-gray-700 mb-1">Recurrence</label>
//         <input
//           id="recurrence"
//           type="text"
//           value={recurrence}
//           onChange={(e) => setRecurrence(e.target.value)}
//           className="border border-gray-300 rounded-md p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
//         />
//       </div>

//       {/* Date Inputs */}
//       <fieldset className="mb-4">
//         <legend className="text-gray-700">Date Range</legend>
//         <div className="flex justify-between">
//           <div className="w-full mr-2">
//             <label htmlFor="startDate" className="block text-gray-700 mb-1">Start Date</label>
//             <input
//               id="startDate"
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               className={`border border-gray-300 rounded-md p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ${errors.startDate ? 'border-red-500' : ''}`}
//             />
//             {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
//           </div>
//           <div className="w-full ml-2">
//             <label htmlFor="endDate" className="block text-gray-700 mb-1">End Date</label>
//             <input
//               id="endDate"
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               className={`border border-gray-300 rounded-md p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ${errors.endDate ? 'border-red-500' : ''}`}
//             />
//             {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
//             {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
//           </div>
//         </div>
//       </fieldset>

//       <button
//         type="submit"
//         className="bg-green-600 text-white rounded-md p-3 w-full hover:bg-green-700 transition duration-200"
//       >
//         {currentTask ? "Update Task" : "Add Task"}
//       </button>
//     </form>
//   );
// };

// export default TaskForm;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const TaskForm = ({ currentTask, setCurrentTask, fetchTasks }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [recurrence, setRecurrence] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (currentTask) {
            setTitle(currentTask.title);
            setDescription(currentTask.description);
            setRecurrence(currentTask.recurrence);
            setStartDate(currentTask.start_date);
            setEndDate(currentTask.end_date);
        } else {
            setTitle("");
            setDescription("");
            setRecurrence("");
            setStartDate("");
            setEndDate("");
        }
    }, [currentTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = {
            title,
            description,
            recurrence,
            start_date: startDate,
            end_date: endDate,
        };

        const validationErrors = {};
        if (!title) validationErrors.title = "Title is required.";
        if (!recurrence) validationErrors.recurrence = "Recurrence is required.";
        if (!startDate) validationErrors.startDate = "Start date is required.";
        if (!endDate) validationErrors.endDate = "End date is required.";
        if (new Date(endDate) < new Date(startDate)) validationErrors.date = "End date must be after start date.";

        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        setErrors({}); // Clear errors if validation passes

        try {
            if (currentTask) {
                await axios.put(
                    `http://localhost:5000/api/tasks/${currentTask.id}`,
                    taskData
                );
                Swal.fire("Success", "Task updated successfully", "success");
            } else {
                await axios.post("http://localhost:5000/api/tasks", taskData);
                Swal.fire("Success", "Task added successfully", "success");
            }
            setTitle("");
            setDescription("");
            setRecurrence("");
            setStartDate("");
            setEndDate("");
            fetchTasks(); 
            setCurrentTask(null);
        } catch (error) {
            Swal.fire("Error", "Something went wrong!", "error");
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 mb-6 border border-gray-300">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                {currentTask ? "Edit Task" : "Add New Task"}
            </h2>

            {/* Title Input */}
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 mb-1">Task Title</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`border border-gray-300 rounded-md p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ${errors.title ? 'border-red-500' : ''}`}
                    required
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            {/* Description Input */}
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 mb-1">Task Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-gray-300 rounded-md p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                    rows="3"
                />
            </div>

            {/* Recurrence Dropdown */}
            <div className="mb-4">
                <label htmlFor="recurrence" className="block text-gray-700 mb-1">Recurrence</label>
                <select
                    id="recurrence"
                    value={recurrence}
                    onChange={(e) => setRecurrence(e.target.value)}
                    className={`border border-gray-300 rounded-md p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ${errors.recurrence ? 'border-red-500' : ''}`}
                    required
                >
                    <option value="">Select Recurrence</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="custom">Custom</option>
                </select>
                {errors.recurrence && <p className="text-red-500 text-sm">{errors.recurrence}</p>}
            </div>

            {/* Date Inputs */}
            <fieldset className="mb-4">
                {/* <legend className="text-gray-700">Date Range</legend> */}
                <div className="flex justify-between">
                    <div className="w-full mr-2">
                        <label htmlFor="startDate" className="block text-gray-700 mb-1">Start Date</label>
                        <input
                            id="startDate"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className={`border border-gray-300 rounded-md p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ${errors.startDate ? 'border-red-500' : ''}`}
                        />
                        {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
                    </div>

                    <div className="w-full ml-2">
                        <label htmlFor="endDate" className="block text-gray-700 mb-1">End Date</label>
                        <input
                            id="endDate"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className={`border border-gray-300 rounded-md p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ${errors.endDate ? 'border-red-500' : ''}`}
                        />
                        {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
                        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                    </div>
                </div>
            </fieldset>

            <button type="submit" className="bg-green-500 text-white rounded-md py-2 px-4 hover:bg-green-600 transition duration-200">
                {currentTask ? "Update Task" : "Add Task"}
            </button>
        </form>
    );
};

export default TaskForm;

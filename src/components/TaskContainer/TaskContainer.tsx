import { useState } from "react";

const TaskContainer = ({ task }: { task: string }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false); // Para manejar el estado del botón de eliminación.

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
  };

  const handleDelete = () => {
    setIsDeleted(true);
  };

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          checked={isCompleted}
          onChange={handleCheckboxChange}
        />
        <span
          className={`text-gray-800 ${
            isCompleted ? "line-through text-gray-500" : ""
          }`}
        >
          {task}
        </span>
      </div>
      <button
        onClick={handleDelete}
        disabled={isDeleted}
        className={`px-3 py-1 text-white text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 
        ${
          isDeleted
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600 focus:ring-red-500"
        }`}
      >
        Delete
      </button>
    </div>
  );
};

export default TaskContainer;

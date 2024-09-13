interface TaskListProps<T extends Tasks> {
  tasks: T[] | null;
  onToggleComplete: (
    idtask: T["idtask"],
    status: T["status"],
    name: T["name"]
  ) => void;
  onDelete: (idtask: T["idtask"]) => void;
}

const TaskList = <T extends Tasks>({
  tasks,
  onToggleComplete,
  onDelete,
}: TaskListProps<T>) => {
  if (!tasks) {
    return <div>No tasks available</div>;
  }

  return (
    <div className="space-y-4 max-h-80 overflow-y-scroll">
      {tasks.map((task) => (
        <div
          key={task.idtask}
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={task.status.toUpperCase() === "DISABLED"}
              onChange={() =>
                onToggleComplete(task.idtask, task.status, task.name)
              }
              className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span
              className={`text-gray-800 ${
                task.status.toUpperCase() === "DISABLED"
                  ? "line-through text-gray-500"
                  : ""
              }`}
            >
              {task.name}
            </span>
          </div>
          <button
            onClick={() => onDelete(task.idtask)}
            className="px-3 py-1 bg-red-500 text-white text-sm rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

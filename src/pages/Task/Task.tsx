import { useCallback, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import TaskList from "../../components/TaskComponent/TaskComponent";
import { decodeJwtPayload } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../socket/useSocket";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  deleteTask,
  getTaskUser,
  updateTask,
} from "../../store/actions/task.actions";
import TaskInput from "../../components/TaskInput/TaskInput";
import {
  deleteTaskArray,
  toggleTaskComplete,
  updateTaskArray,
} from "../../store/reducers/task.reducer";

const TodoApp = () => {
  const { socket, disconnectSocket } = useSocket();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const tasks = useAppSelector((state) => state.task.tasks) as Tasks[] | null;
  const token = sessionStorage.getItem("token") as string;
  const userData = decodeJwtPayload(token);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const username = `${userData?.firstname} ${userData?.lastname}`;
  const iduser = userData?.iduser;

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem("token");
    disconnectSocket();
    navigate("/login");
  }, [disconnectSocket, navigate]);

  const handleToggleComplete = (
    idtask: number,
    status: string,
    name: string
  ) => {
    dispatch(updateTask({ name, idtask, status }));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTask({ idtask: id }));
  };

  useEffect(() => {
    if (iduser) {
      dispatch(getTaskUser({ iduser })).unwrap();
    }
  }, [dispatch, iduser]);

  useEffect(() => {
    if (socket) {
      const handleCreateTask = (createTask: Tasks) => {
        dispatch(updateTaskArray(createTask));
      };

      const handlePutTask = (putTask: Tasks) => {
        dispatch(toggleTaskComplete(putTask));
      };

      const handleDeleteTask = (deleteTask: Tasks) => {
        dispatch(deleteTaskArray(deleteTask));
      };

      socket.on("createTask", handleCreateTask);
      socket.on("putTask", handlePutTask);
      socket.on("deleteTask", handleDeleteTask);

      return () => {
        socket.off("createTask", handleCreateTask);
        socket.off("putTask", handlePutTask);
        socket.off("deleteTask", handleDeleteTask);
      };
    }
  }, [socket, dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        username={username}
        toggleMenu={toggleMenu}
        handleLogout={handleLogout}
        isMenuOpen={isMenuOpen}
      />
      <div className="flex items-center justify-center mt-10">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Your Tasks</h2>
          <TaskInput iduser={iduser} />
          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;

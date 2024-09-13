import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../store/hooks";
import { createTask } from "../../store/actions/task.actions";

const TaskInput = ({ iduser }: { iduser: number }) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm<TaskPost>({
    defaultValues: {
      iduser: iduser
    }
  });
  const onSubmit: SubmitHandler<TaskPost> = (data) => {
    try {
      dispatch(createTask(data)).unwrap();
      reset();
    } catch (error) {
      console.error("Error durante el registro del usuario:", error);
    }
  };
  return (
    <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center">
        <input
          {...register("name", { required: true })}
          type="text"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Add a new task..."
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TaskInput;

import { createSlice } from "@reduxjs/toolkit";
import {
  createTask,
  deleteTask,
  getTaskUser,
  updateTask,
} from "../actions/task.actions";

interface TaskState {
  loading: boolean;
  tasks: Tasks[] | null;
  error: object | null | unknown;
}

const initialState: TaskState = {
  loading: false,
  error: null,
  tasks: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    updateTaskArray: (state, action) => {
      if (state.tasks) {
        state.tasks.push(action.payload);
      } else {
        state.tasks = [action.payload];
      }
    },
    toggleTaskComplete: (state, action) => {
      const { idtask, status } = action.payload.data;

      if (state.tasks) {
        const taskIndex = state.tasks.findIndex(
          (task) => task.idtask === idtask
        );

        if (taskIndex !== -1) {
          state.tasks[taskIndex].status = status;
        }
      } else {
        state.tasks = [action.payload.data];
      }
    },
    deleteTaskArray: (state, action) => {
      const { idtask } = action.payload;

      if (state.tasks) {
        state.tasks = state.tasks.filter((task) => task.idtask !== idtask);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTaskUser.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
    });
    builder.addCase(getTaskUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTaskUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateTask.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createTask.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteTask.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { updateTaskArray, toggleTaskComplete, deleteTaskArray } =
  taskSlice.actions;

export default taskSlice.reducer;

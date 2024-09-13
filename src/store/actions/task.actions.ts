import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errorAlert, successAlert } from "../../utils/alertFunctions";

const BASE_URL = import.meta.env.VITE_BASE_URL_BACK;

const handleAxiosError = (error: unknown) => {
  console.error("Error en la operación: ", error);
  if (axios.isAxiosError(error)) {
    if (error.response && error.response.status === 401) {
      errorAlert("Su sesión ha expirado");
      sessionStorage.removeItem("token");
      window.location.reload();
    }
    const message = error.response?.data?.task?.error || "Ocurrió un error";
    errorAlert(message);
  } else {
    errorAlert("Ocurrió un error inesperado");
  }
  throw error;
};

export const getTaskUser = createAsyncThunk(
  "task/getTasks",
  async ({ iduser }: { iduser: number }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/task/getTaskUser/${iduser}`,
        {
          headers: {
            "access-token": `${sessionStorage.getItem("token")}`,
          },
        }
      );
      return response.data.task.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }
);

export const createTask = createAsyncThunk(
  "task/createTask",
  async ({ name, iduser }: { name: string; iduser: number }) => {
    try {
      const body = { data: { name, iduser, status: "enabled" } };
      const response = await axios.post(`${BASE_URL}/task/createTask`, body, {
        headers: {
          "access-token": `${sessionStorage.getItem("token")}`,
        },
      });
      successAlert(response.data.message);
    } catch (error) {
      handleAxiosError(error);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({
    name,
    idtask,
    status,
  }: {
    name: string;
    idtask: number;
    status: string;
  }) => {
    try {
      const updatedStatus =
        status.toLowerCase() === "enabled" ? "disabled" : "enabled";
      const body = { data: { name, status: updatedStatus } };
      const response = await axios.put(
        `${BASE_URL}/task/putTask/${idtask}`,
        body,
        {
          headers: {
            "access-token": `${sessionStorage.getItem("token")}`,
          },
        }
      );
      successAlert(response.data.task.message);
    } catch (error) {
      handleAxiosError(error);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async ({ idtask }: { idtask: number }) => {
    try {
      await axios.delete(`${BASE_URL}/task/deleteTask/${idtask}`, {
        headers: {
          "access-token": `${sessionStorage.getItem("token")}`,
        },
      });
      successAlert("Se eliminó con éxito la tarea");
    } catch (error) {
      handleAxiosError(error);
    }
  }
);

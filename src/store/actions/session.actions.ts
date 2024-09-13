import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errorAlert, successAlert } from "../../utils/alertFunctions";

const BASE_URL = import.meta.env.VITE_BASE_URL_BACK;

export const loginSession = createAsyncThunk(
  "session/login",
  async ({ email, passwordhash }: LoginFormValues) => {
    try {
      const body = { data: { email, passwordhash } };
      const response = await axios.post(`${BASE_URL}/user/loginUser`, body);
      successAlert(response.data.message);
      sessionStorage.setItem("token", response.data.data.token);
      return response.data.data;
    } catch (error) {
      console.error("Error durante la creación del usuario: ", error);
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.dataUser?.error[0] || "Ocurrió un error";
        errorAlert(message);
      } else {
        errorAlert("Ocurrió un error inesperado");
      }
      throw error;
    }
  }
);

export const registerUser = createAsyncThunk(
  "session/register",
  async (registerValues: RegisterFormValues) => {
    try {
      const body = { data: registerValues };
      const response = await axios.post(`${BASE_URL}/user/registerUser`, body);
      successAlert(response.data.message);
      return response.data;
    } catch (error) {
      console.error("Error durante la creación del usuario: ", error);
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.userCreate?.error[0] || "Ocurrió un error";
        errorAlert(message);
      } else {
        errorAlert("Ocurrió un error inesperado");
      }
      throw error;
    }
  }
);

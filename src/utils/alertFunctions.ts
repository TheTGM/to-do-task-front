import { enqueueSnackbar } from "notistack";

export const errorAlert = (message: string, duration = 3000) => {
  enqueueSnackbar(message, {
    variant: "error",
    autoHideDuration: duration,
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    style: {
      fontSize: "18px",
      fontWeight: 600,
    },
  });
};

export const successAlert = (message: string, duration = 3000) => {
  enqueueSnackbar(message, {
    variant: "success",
    autoHideDuration: duration,
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    style: {
      fontSize: "18px",
      fontWeight: 600,
    },
  });
};

export const warningAlert = (message: string, duration = 3000) => {
  enqueueSnackbar(message, {
    variant: "warning",
    preventDuplicate: true,
    autoHideDuration: duration,
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    style: {
      fontSize: "18px",
      fontWeight: 600,
      textAlign: "center",
      maxWidth: "600px",
    },
  });
};

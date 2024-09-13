import { SubmitHandler, useForm } from "react-hook-form";
import { loginSession } from "../../store/actions/session.actions";
import { useAppDispatch } from "../../store/hooks";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../socket/useSocket";

const Login = () => {
  const { connectSocket } = useSocket();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    try {
      console.log(data);
      dispatch(loginSession(data)).unwrap();
      reset();
    } catch (error) {
      console.error("Error durante el registro del usuario:", error);
    }
  };

  const handleLogin = useCallback(() => {
    connectSocket(); // Conectar al WebSocket cuando se inicie sesión
  }, [connectSocket]);

  const logged = sessionStorage.getItem("token");
  useEffect(() => {
    if (logged) {
      handleLogin();
      navigate("/task");
    }
  }, [logged, navigate, handleLogin]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="passwordhash"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              {...register("passwordhash", { required: true })}
              type="password"
              id="passwordhash"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

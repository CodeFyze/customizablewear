import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate(); // Using useNavigate for navigation


  const onSubmit = async (data) => {
    if (isLogin) {
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        });
  
        const result = await response.json();
  
        if (response.ok && result.success) {
          // Login is successful
          toast.success("Login successful!", { position: "top-center" });
  
          // Save the token to localStorage
          localStorage.setItem("authToken", result.token);
  
          // Redirect based on role
          const userRole = result.user?.role; // Use optional chaining
          if (userRole === "seller") {
            navigate("/seller");
          } else {
            navigate("/");
          }
        } else {
          // Handle login errors
          toast.error(result.message || "Invalid email or password.", {
            position: "top-center",
          });
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("An error occurred during login. Please try again.", {
          position: "top-center",
        });
      }
    }
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          {isLogin ? "Login" : "Signup"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            Don't have an account?
          </span>
          <button
            onClick={() => navigate("/signup")} // Use navigate instead of history.push
            className="ml-2 text-blue-500 hover:underline focus:outline-none"
          >
            Sign up
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default LoginPage;

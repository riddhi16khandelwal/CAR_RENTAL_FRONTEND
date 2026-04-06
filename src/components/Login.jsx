import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const { setShowLogin, axios, setToken, fetchUser } = useAppContext();

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {

      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password
      });

      if (data.success) {

        const token = data.token;

        // save token
        localStorage.setItem("token", token);

        // update context token
        setToken(token);

        // set axios auth header
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // fetch logged user
        await fetchUser();

        toast.success("Login Successful");

        setShowLogin(false);

        navigate("/");

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 flex items-center justify-center bg-black/50"
    >

      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 p-8 w-80 bg-white rounded-lg shadow-xl"
      >

        <p className="text-2xl font-medium text-center">
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name"
            className="border p-2 rounded"
            required
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          type="email"
          className="border p-2 rounded"
          required
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          type="password"
          className="border p-2 rounded"
          required
        />

        {state === "register" ? (
          <p>
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-blue-500 cursor-pointer"
            >
              Login
            </span>
          </p>
        ) : (
          <p>
            Create account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-blue-500 cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded"
        >
          {state === "login" ? "Login" : "Create Account"}
        </button>

      </form>

    </div>
  );
};

export default Login;
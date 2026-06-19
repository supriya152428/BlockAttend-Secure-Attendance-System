import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // LOGIN FUNCTION
  async function handleLogin() {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log(response.data);


      // STORE TOKEN
      localStorage.setItem(
        "token",
        response.data.token
      );


      // STORE USER
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );


      alert("Login Successful 🚀");


      // REDIRECT
      navigate("/dashboard");

    } catch (err) {

      console.log(err);

      alert("Invalid Credentials ❌");

    }

  }


  return (

    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-black
      text-white
      overflow-hidden
      relative
      "
    >

      {/* Glow Effects */}

      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-500/20 blur-[100px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/20 blur-[100px] rounded-full" />


      {/* Login Card */}

      <div
        className="
        relative
        z-10
        bg-white/5
        backdrop-blur-2xl
        border
        border-white/10
        p-12
        rounded-[32px]
        w-[450px]
        shadow-2xl
        "
      >

        <h2
          className="
          text-5xl
          font-bold
          mb-10
          text-center
          "
        >
          Login
        </h2>


        {/* EMAIL */}

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
          w-full
          p-4
          mb-5
          rounded-2xl
          bg-white/5
          border
          border-white/10
          outline-none
          "
        />


        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
          w-full
          p-4
          mb-8
          rounded-2xl
          bg-white/5
          border
          border-white/10
          outline-none
          "
        />


        {/* BUTTON */}

        <button
          onClick={handleLogin}
          className="
          w-full
          bg-cyan-500
          py-4
          rounded-2xl
          text-lg
          font-bold
          text-black
          hover:bg-cyan-400
          transition-all
          duration-300
          shadow-[0_0_30px_rgba(34,211,238,0.6)]
          "
        >

          Login

        </button>


        {/* REGISTER LINK */}

        <div className="text-center mt-6">

          <p className="text-slate-400">

            Don't have an account?

            <a
              href="/register"
              className="
              text-cyan-400
              ml-2
              hover:underline
              "
            >
              Register
            </a>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;
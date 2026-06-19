import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {

  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");


  // REGISTER FUNCTION
  async function handleRegister() {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          full_name,
          email,
          password,
          role: "student",
          department,
        }
      );

      console.log(response.data);

      alert("Registration Successful 🚀");

    } catch (err) {

      console.log(err);

      alert("Registration Failed ❌");

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
      relative
      overflow-hidden
      "
    >

      {/* Glow */}

      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full" />


      {/* Card */}

      <div
        className="
        relative
        z-10
        bg-white/5
        backdrop-blur-2xl
        border border-white/10
        rounded-[32px]
        p-10
        w-[450px]
        shadow-2xl
        "
      >

        <h1
          className="
          text-5xl
          font-bold
          text-center
          mb-10
          "
        >
          Register
        </h1>


        {/* FULL NAME */}

        <input
          type="text"
          placeholder="Full Name"
          value={full_name}
          onChange={(e) => setFullName(e.target.value)}
          className="
          w-full
          p-4
          mb-4
          rounded-2xl
          bg-white/5
          border border-white/10
          outline-none
          "
        />


        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
          w-full
          p-4
          mb-4
          rounded-2xl
          bg-white/5
          border border-white/10
          outline-none
          "
        />


        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
          w-full
          p-4
          mb-4
          rounded-2xl
          bg-white/5
          border border-white/10
          outline-none
          "
        />


        {/* DEPARTMENT */}

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="
          w-full
          p-4
          mb-8
          rounded-2xl
          bg-white/5
          border border-white/10
          outline-none
          "
        />


        {/* REGISTER BUTTON */}

        <button
          onClick={handleRegister}
          className="
          w-full
          bg-cyan-500
          hover:bg-cyan-400
          text-black
          font-bold
          py-4
          rounded-2xl
          transition-all
          duration-300
          shadow-[0_0_30px_rgba(34,211,238,0.6)]
          "
        >

          Register

        </button>


        {/* LOGIN LINK */}

        <div className="text-center mt-6">

          <p className="text-slate-400">

            Already have an account?

            <Link
              to="/login"
              className="
              text-cyan-400
              ml-2
              hover:underline
              "
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Register;
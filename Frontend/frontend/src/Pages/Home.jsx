import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* Glow Effects */}

      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-500/20 blur-[150px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/20 blur-[150px] rounded-full" />

      <div className="relative z-10">

        {/* Navbar */}


<nav className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-between">

  <motion.h1
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    className="text-3xl font-bold text-white"
  >
    BlockAttend AI
  </motion.h1>

  <div className="flex items-center gap-10 text-slate-300">

    <a href="#home" className="hover:text-white transition">
      Home
    </a>

    <a href="#features" className="hover:text-white transition">
      Features
    </a>

    <a href="#works" className="hover:text-white transition">
      How It Works
    </a>

    <a href="#security" className="hover:text-white transition">
      Security
    </a>

    <a href="#about" className="hover:text-white transition">
      About
    </a>

  </div>
   <Link
    to="/login"
    className="
    bg-indigo-600
    px-6
    py-3
    rounded-2xl
    hover:bg-indigo-700
    transition
    "
  >
    Login →
  </Link>


</nav>
 

</div>

        {/* Hero Section */}

        <div
  id="home"
  className="max-w-7xl mx-auto px-8 py-20">

          <div className="text-center">

            <div className="flex justify-center gap-4 mb-10 flex-wrap">

              <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                🤖 AI Powered
              </span>

              <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                📸 Face Recognition
              </span>

              <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                ⛓ Blockchain Secure
              </span>

            </div>

            <h1 className="text-7xl font-bold leading-tight max-w-6xl mx-auto">
              AI-Powered Blockchain Attendance Platform
            </h1>

            <p className="mt-8 text-2xl text-slate-300 max-w-4xl mx-auto">
              Smart attendance monitoring with AI-powered insights,
              blockchain verification, analytics dashboards,
              and scalable academic management.
            </p>

            <div className="flex justify-center gap-6 mt-12">

              <Link
                to="/login"
                className="
                bg-indigo-600
                px-8 py-4
                rounded-2xl
                text-lg
                font-semibold
                hover:bg-indigo-700
                transition
                "
              >
                Get Started
              </Link>

              <button
                className="
                border border-white/10
                bg-white/5
                px-8 py-4
                rounded-2xl
                "
              >
                Explore Features
              </button>

            </div>

          </div>

        </div>

        {/* Stats Section */}

        <div className="max-w-7xl mx-auto px-8 py-16">

          <div className="grid grid-cols-4 gap-6">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
              <h2 className="text-5xl font-bold text-cyan-400">
                1000+
              </h2>
              <p className="text-slate-400 mt-3">
                Students
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
              <h2 className="text-5xl font-bold text-green-400">
                98%
              </h2>
              <p className="text-slate-400 mt-3">
                Face Accuracy
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
              <h2 className="text-5xl font-bold text-indigo-400">
                5000+
              </h2>
              <p className="text-slate-400 mt-3">
                Records Verified
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
              <h2 className="text-5xl font-bold text-yellow-400">
                24/7
              </h2>
              <p className="text-slate-400 mt-3">
                AI Monitoring
              </p>
            </div>

          </div>

        </div>

        {/* Features */}

        <div
  id="features"
  className="max-w-7xl mx-auto px-8 py-20"
>

          <h2 className="text-5xl font-bold text-center mb-16">
            Core Features
          </h2>

          <div className="grid grid-cols-2 gap-8">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="text-3xl font-bold mb-4">
                📸 Face Attendance
              </h3>
              <p className="text-slate-400">
                Real-time attendance tracking using facial recognition.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="text-3xl font-bold mb-4">
                🤖 AI Risk Analysis
              </h3>
              <p className="text-slate-400">
                Predict attendance shortages before they happen.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="text-3xl font-bold mb-4">
                ⛓ Blockchain Verification
              </h3>
              <p className="text-slate-400">
                Tamper-proof attendance records stored securely.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="text-3xl font-bold mb-4">
                📊 Smart Analytics
              </h3>
              <p className="text-slate-400">
                Visual attendance insights and trend monitoring.
              </p>
            </div>

          </div>

        </div>
        {/* Dashboard Preview */}

<div className="max-w-7xl mx-auto px-8 py-24">

  <h2 className="text-5xl font-bold text-center mb-16">
    Live Dashboard Preview
  </h2>

  <div className="bg-white/5 border border-white/10 rounded-3xl p-10">

    <div className="grid grid-cols-3 gap-6">

      <div className="bg-indigo-500/10 p-6 rounded-2xl">
        <h3>Total Students</h3>
        <p className="text-5xl font-bold mt-3">1000+</p>
      </div>

      <div className="bg-cyan-500/10 p-6 rounded-2xl">
        <h3>Attendance Rate</h3>
        <p className="text-5xl font-bold mt-3">92%</p>
      </div>

      <div className="bg-green-500/10 p-6 rounded-2xl">
        <h3>AI Alerts</h3>
        <p className="text-5xl font-bold mt-3">34</p>
      </div>

    </div>

  </div>

</div>

        {/* How It Works */}

        <div
  id="works"
  className="max-w-7xl mx-auto px-8 py-24"
>

          <h2 className="text-5xl font-bold text-center mb-20">
            How It Works
          </h2>

          <div className="grid grid-cols-5 gap-6 text-center">

            <div>
              <div className="text-6xl mb-4">📸</div>
              <p>Face Scan</p>
            </div>

            <div>
              <div className="text-6xl mb-4">✅</div>
              <p>Attendance Recorded</p>
            </div>

            <div>
              <div className="text-6xl mb-4">⛓</div>
              <p>Blockchain Verified</p>
            </div>

            <div>
              <div className="text-6xl mb-4">🤖</div>
              <p>AI Analysis</p>
            </div>

            <div>
              <div className="text-6xl mb-4">📊</div>
              <p>Dashboard Updated</p>
            </div>

          </div>

        </div>
        {/* CTA Section */}

<div className="max-w-6xl mx-auto px-8 py-24">

  <div
    className="
    bg-gradient-to-r
    from-indigo-500/20
    to-cyan-500/20
    border border-white/10
    rounded-3xl
    p-12
    text-center
    "
  >

    <h2 className="text-5xl font-bold mb-6">
      Ready To Get Started?
    </h2>

    <p className="text-xl text-slate-300 mb-10">
      Manage attendance with AI, Face Recognition
      and Blockchain Verification.
    </p>

    <Link
      to="/register"
      className="
      bg-cyan-500
      text-black
      px-8
      py-4
      rounded-2xl
      font-bold
      hover:bg-cyan-400
      transition
      "
    >
      Create Account
    </Link>

  </div>

</div>

        {/* Footer */}

        <footer className="border-t border-white/10 py-12 text-center">

          <h3 className="text-2xl font-bold">
            BlockAttend AI
          </h3>

          <p className="text-slate-400 mt-4">
            Built with React, Node.js, PostgreSQL, AI Analytics &
            Blockchain Verification.
          </p>

        </footer>

      </div>

  );
}

export default Home;
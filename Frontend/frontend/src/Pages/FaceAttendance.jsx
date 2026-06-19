import { useEffect, useRef, useState } from "react";

function FaceAttendance() {

  const videoRef = useRef(null);

  const [status, setStatus] = useState("Initializing Camera...");
  const [detected, setDetected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [time, setTime] = useState(
  new Date().toLocaleTimeString()
);

const [sessionId] = useState(
  "ATD-" + Math.floor(Math.random() * 100000)
);

const [hash] = useState(
  "8fa2c4b9e71d1f5c2a9d7e4b8c1"
);
const [attendanceId] = useState(
  "ATT-" + Math.floor(Math.random() * 100000)
);  const startCamera = async () => {
    try {

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setStatus("Camera Ready 🚀");

    } catch (err) {

      console.error(err);

      setStatus("Camera Access Denied ❌");
    }
  };

  useEffect(() => {

  startCamera();

  const timer = setInterval(() => {
    setTime(new Date().toLocaleTimeString());
  }, 1000);

  return () => clearInterval(timer);

}, []);

  const simulateDetection = async () => {

    setIsScanning(true);

    setDetected(false);

    setStatus("Verifying Identity...");

    setTimeout(() => {

      setDetected(true);

      setConfidence(97);

      setStatus("Identity Verified Successfully ✅");

      setIsScanning(false);

    }, 2500);

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 flex items-center justify-center p-10">

      <div className="w-full max-w-6xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-[40px] p-10">

        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-6xl font-bold text-white">
             BlockAttend Secure
            </h1>

            <p className="text-slate-400 mt-3 text-lg">
              Blockchain Powered Smart Attendance System
            </p>
          </div>

          <div className="bg-green-500/20 border border-green-500/30 px-5 py-3 rounded-xl text-green-400 font-semibold">
            SYSTEM READY
          </div>

        </div>

        <div className="flex justify-center relative">

          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className={`
              w-[760px]
              h-[520px]
              object-cover
              rounded-[30px]
              border-[4px]

              ${detected
                ? "border-green-400"
                : "border-cyan-400"
              }
            `}
          />

          {isScanning && (

<div className="
mt-6
text-center
space-y-2
">

<p className="text-green-400">
✓ Camera Connected
</p>

<p className="text-cyan-400">
✓ Verifying Identity
</p>

<p className="text-yellow-400">
✓ Recording Attendance
</p>

<p className="text-indigo-400">
✓ Blockchain Hash Generation
</p>

</div>

)}
        </div>

        <div className="text-center mt-10">
        <div className="mt-8 grid grid-cols-3 gap-4">

  <div className="bg-white/5 p-4 rounded-xl">
    <p className="text-slate-400">
      Current Time
    </p>

    <p className="text-cyan-400 font-bold">
      {time}
    </p>
  </div>

  <div className="bg-white/5 p-4 rounded-xl">
    <p className="text-slate-400">
      Session ID
    </p>

    <p className="text-green-400 font-bold">
      {sessionId}
    </p>
  </div>

  <div className="bg-white/5 p-4 rounded-xl">
    <p className="text-slate-400">
      Blockchain Status
    </p>

    <p className="text-green-400 font-bold">
      Active
    </p>
  </div>

</div>

          <h2
            className={`
              text-4xl
              font-bold

              ${detected
                ? "text-green-400"
                : "text-cyan-400"
              }
            `}
          >
            {status}
          </h2>

        </div>

        {detected && (

<div className="
mt-8
bg-green-500/10
border
border-green-500/30
rounded-3xl
p-8
">

  <h3 className="
  text-3xl
  text-green-400
  font-bold
  text-center
  ">
    Identity Verified ✅
  </h3>

  <div className="
  grid
  grid-cols-2
  gap-6
  mt-6
  text-white
  ">

    <div>
      <p className="text-slate-400">
        Student Name
      </p>

      <p>
        Supriya Yadav
      </p>
    </div>

    <div>
      <p className="text-slate-400">
        Roll Number
      </p>

      <p>
        22CS101
      </p>
    </div>

    <div>
      <p className="text-slate-400">
        Department
      </p>

      <p>
        Computer Science
      </p>
    </div>

    <div>
      <p className="text-slate-400">
        Confidence
      </p>

      <p>
        {confidence}%
      </p>
    </div>

    <div>
      <p className="text-slate-400">
        Attendance Status
      </p>

      <p className="text-green-400">
        Present
      </p>
    </div>

    <div>
      <p className="text-slate-400">
        Verification Method
      </p>

      <p>
        Smart Identity Verification
      </p>
    </div>

  </div>

  <div className="
  mt-6
  bg-black/30
  rounded-xl
  p-4
  ">

    <p className="text-slate-400">
      Blockchain Record
    </p>

    <p className="text-cyan-400 break-all">
  {hash}
</p>

  </div>

</div>

)}

        <div className="flex justify-center mt-12">

          <button
            onClick={simulateDetection}
            disabled={isScanning}
            className="
            bg-cyan-500
            hover:bg-cyan-400
            text-black
            font-bold
            text-xl
            px-12
            py-4
            rounded-2xl
            transition-all
            hover:scale-105
            "
          >
            {isScanning
              ? "Scanning..."
              : "Verify Identity"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default FaceAttendance;
// src/pages/Settings.jsx

import { useState } from "react";
import {
  User,
  Mail,
  Bell,
  Shield,
  Moon,
  Save,
  Lock,
} from "lucide-react";

const Settings = () => {
  const [settings, setSettings] = useState({
    name: "Supriya Yadav",
    email: "supriya@example.com",
    notifications: true,
    twoFactor: false,
    theme: "Dark",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
    console.log(settings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-black text-white p-8 ml-[280px]">
      {/* Background glow */}
      <div className="fixed top-20 right-20 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl"></div>
      <div className="fixed bottom-20 left-80 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-slate-400 mb-8">
          Manage your profile, security and app preferences.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <User className="text-indigo-400" />
              Profile Settings
            </h2>

            <div className="space-y-5">
              <div>
                <label className="text-slate-300 mb-2 block">Full Name</label>
                <div className="flex items-center gap-3 bg-black/30 border border-white/10 rounded-2xl px-4">
                  <User size={20} className="text-slate-400" />
                  <input
                    name="name"
                    value={settings.name}
                    onChange={handleChange}
                    className="w-full py-4 bg-transparent outline-none text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 mb-2 block">Email</label>
                <div className="flex items-center gap-3 bg-black/30 border border-white/10 rounded-2xl px-4">
                  <Mail size={20} className="text-slate-400" />
                  <input
                    name="email"
                    value={settings.email}
                    onChange={handleChange}
                    className="w-full py-4 bg-transparent outline-none text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 mb-2 block">Theme</label>
                <div className="flex items-center gap-3 bg-black/30 border border-white/10 rounded-2xl px-4">
                  <Moon size={20} className="text-slate-400" />
                  <select
                    name="theme"
                    value={settings.theme}
                    onChange={handleChange}
                    className="w-full py-4 bg-transparent outline-none text-white"
                  >
                    <option className="bg-slate-900">Dark</option>
                    <option className="bg-slate-900">Light</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleSave}
                className="mt-4 flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 px-6 py-4 rounded-2xl font-semibold transition"
              >
                <Save size={20} />
                Save Changes
              </button>
            </div>
          </div>

          {/* Security Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Shield className="text-green-400" />
              Security
            </h2>

            <div className="space-y-5">
              <div className="bg-black/30 border border-white/10 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Lock size={20} className="text-slate-400" />
                  <h3 className="font-semibold">Password</h3>
                </div>
                <p className="text-sm text-slate-400">
                  Last updated recently
                </p>
              </div>

              <label className="flex items-center justify-between bg-black/30 border border-white/10 rounded-2xl p-4 cursor-pointer">
                <span className="flex items-center gap-3">
                  <Bell size={20} className="text-yellow-400" />
                  Notifications
                </span>

                <input
                  type="checkbox"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
              </label>

              <label className="flex items-center justify-between bg-black/30 border border-white/10 rounded-2xl p-4 cursor-pointer">
                <span className="flex items-center gap-3">
                  <Shield size={20} className="text-blue-400" />
                  Two Factor Auth
                </span>

                <input
                  type="checkbox"
                  name="twoFactor"
                  checked={settings.twoFactor}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
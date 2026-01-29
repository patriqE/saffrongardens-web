"use client";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, loading } = useRequireAuth();
  const { token, logout } = useAuth();
  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    async function fetchUserData() {
      if (!token) return;

      try {
        setLoadingUser(true);
        const baseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

        const response = await fetch(`${baseUrl}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          username: data.username || "",
          phone: data.phone || "",
          location: data.location || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingUser(false);
      }
    }

    fetchUserData();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    // TODO: Implement save changes to backend
    console.log("Saving changes:", formData);
  };

  const handleLogout = () => {
    logout(true);
  };

  const getInitials = () => {
    if (userData?.name) {
      const nameParts = userData.name.trim().split(" ");
      if (nameParts.length > 1) {
        return nameParts[0].charAt(0) + nameParts[1].charAt(0);
      }
      return nameParts[0].charAt(0);
    }
    return userData?.username?.charAt(0).toUpperCase() || "U";
  };

  const getRoleLabel = () => {
    if (!userData?.role) return "User";
    switch (userData.role) {
      case "SUPER_ADMIN":
        return "Super Administrator";
      case "ADMIN":
        return "Administrator";
      case "EVENT_PLANNER":
        return "Event Planner";
      case "VENDOR":
        return "Vendor";
      default:
        return userData.role;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen relative flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-6 pb-2 bg-background-light dark:bg-background-dark z-10 sticky top-0">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "24px" }}
          >
            arrow_back_ios_new
          </span>
        </button>
        <h1 className="text-xl font-bold tracking-tight">My Profile</h1>
        <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "24px" }}
          >
            more_horiz
          </span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {loadingUser ? (
          <div className="flex justify-center py-12">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-r-transparent" />
          </div>
        ) : error ? (
          <div className="p-4 mx-6 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl">
            Error loading profile: {error}
          </div>
        ) : userData ? (
          <>
            {/* Profile Info Section */}
            <div className="flex flex-col items-center pt-6 px-6">
              <div className="relative group cursor-pointer">
                <div className="w-28 h-28 rounded-full bg-primary/30 flex items-center justify-center border-4 border-white dark:border-gray-700 shadow-md text-4xl font-bold text-black dark:text-primary">
                  {getInitials()}
                </div>
                {/* Edit Badge */}
                <div className="absolute bottom-0 right-0 bg-primary w-8 h-8 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-700 shadow-sm">
                  <span
                    className="material-symbols-outlined text-black"
                    style={{ fontSize: "16px" }}
                  >
                    edit
                  </span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h2 className="text-2xl font-bold">
                  {userData.name || userData.username}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">
                  {getRoleLabel()}
                </p>
                <div className="inline-flex items-center gap-1.5 mt-2 bg-primary/20 px-3 py-1 rounded-full">
                  <span
                    className="material-symbols-outlined text-gray-600 dark:text-gray-400"
                    style={{ fontSize: "16px" }}
                  >
                    verified
                  </span>
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    Verified User
                  </span>
                </div>
              </div>
            </div>

            {/* Segmented Control */}
            <div className="px-6 py-8">
              <div className="flex p-1.5 bg-gray-200 dark:bg-gray-800 rounded-full relative">
                <div className="w-full flex">
                  <label className="flex-1 relative cursor-pointer group z-10">
                    <input
                      type="radio"
                      name="profile_tab"
                      className="sr-only peer"
                      checked={activeTab === "personal"}
                      onChange={() => setActiveTab("personal")}
                    />
                    <div className="py-2.5 text-center text-sm font-semibold rounded-full text-gray-500 dark:text-gray-400 transition-all duration-300 peer-checked:text-black dark:peer-checked:text-white peer-checked:bg-white dark:peer-checked:bg-gray-700 peer-checked:shadow-sm">
                      Personal
                    </div>
                  </label>
                  <label className="flex-1 relative cursor-pointer group z-10">
                    <input
                      type="radio"
                      name="profile_tab"
                      className="sr-only peer"
                      checked={activeTab === "business"}
                      onChange={() => setActiveTab("business")}
                    />
                    <div className="py-2.5 text-center text-sm font-semibold rounded-full text-gray-500 dark:text-gray-400 transition-all duration-300 peer-checked:text-black dark:peer-checked:text-white peer-checked:bg-white dark:peer-checked:bg-gray-700 peer-checked:shadow-sm">
                      Business
                    </div>
                  </label>
                  <label className="flex-1 relative cursor-pointer group z-10">
                    <input
                      type="radio"
                      name="profile_tab"
                      className="sr-only peer"
                      checked={activeTab === "settings"}
                      onChange={() => setActiveTab("settings")}
                    />
                    <div className="py-2.5 text-center text-sm font-semibold rounded-full text-gray-500 dark:text-gray-400 transition-all duration-300 peer-checked:text-black dark:peer-checked:text-white peer-checked:bg-white dark:peer-checked:bg-gray-700 peer-checked:shadow-sm">
                      Settings
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            {activeTab === "personal" && (
              <div className="px-6 flex flex-col gap-5">
                {/* Full Name */}
                <div className="group relative">
                  <label className="block text-sm font-medium mb-2 ml-4">
                    Full Name
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full h-14 pl-5 pr-12 rounded-full border-none bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                      placeholder="Enter your name"
                    />
                    <span
                      className="material-symbols-outlined absolute right-5 text-gray-400"
                      style={{ fontSize: "20px" }}
                    >
                      person
                    </span>
                  </div>
                </div>

                {/* Username */}
                <div className="group relative">
                  <label className="block text-sm font-medium mb-2 ml-4">
                    Username
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full h-14 pl-5 pr-12 rounded-full border-none bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                      placeholder="Enter username"
                    />
                    <span
                      className="material-symbols-outlined absolute right-5 text-gray-400"
                      style={{ fontSize: "20px" }}
                    >
                      badge
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="group relative">
                  <label className="block text-sm font-medium mb-2 ml-4">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full h-14 pl-5 pr-12 rounded-full border-none bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                      placeholder="name@example.com"
                    />
                    <span
                      className="material-symbols-outlined absolute right-5 text-gray-400"
                      style={{ fontSize: "20px" }}
                    >
                      mail
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="group relative">
                  <label className="block text-sm font-medium mb-2 ml-4">
                    Phone Number
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full h-14 pl-5 pr-12 rounded-full border-none bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                      placeholder="+1 (000) 000-0000"
                    />
                    <span
                      className="material-symbols-outlined absolute right-5 text-gray-400"
                      style={{ fontSize: "20px" }}
                    >
                      call
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="group relative">
                  <label className="block text-sm font-medium mb-2 ml-4">
                    Primary Location
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full h-14 pl-5 pr-12 rounded-full border-none bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                      placeholder="City, Country"
                    />
                    <span
                      className="material-symbols-outlined absolute right-5 text-gray-400"
                      style={{ fontSize: "20px" }}
                    >
                      location_on
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "business" && (
              <div className="px-6 text-center py-12">
                <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600">
                  business_center
                </span>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  Business information coming soon
                </p>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="px-6 text-center py-12">
                <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600">
                  settings
                </span>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  Settings coming soon
                </p>
              </div>
            )}

            {/* Logout Link */}
            <div className="mt-8 mb-4 text-center">
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "18px" }}
                >
                  logout
                </span>
                Sign Out
              </button>
            </div>
          </>
        ) : null}
      </main>

      {/* Sticky Footer Action */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light dark:via-background-dark to-transparent">
        <button
          onClick={handleSaveChanges}
          className="w-full h-14 bg-primary rounded-full text-black font-bold text-lg shadow-lg hover:shadow-xl hover:brightness-110 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

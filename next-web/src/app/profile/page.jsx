"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("personal");
  const [profileImage, setProfileImage] = useState(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCtGMFwMRrx5tPDW_lDeWr5D7LHe7RELZ6cy5CPr1Jt86Pd9bEwhi0-e1RHzluFlTIgfBNx0y4Wy7DEp1jtx8bHrYa2uZdQFR73YwTwq-MMTEqnVunj7VeN1FKUe7-ZwhnvUQIqjMDVow-RV4K5UqUtc0Qnc5at-vp8JlFJe_SDhFiy7sOSgm5aPFLhPjQEcRcsdeMHKB8psBP2bUh89KmxTzY2uFN3uSopJ0mDo2z0TkSthzuCkGvTVX2W2xBCmE2kfslWfYKwBTU"
  );

  // Personal info state
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Eleanor Rigby",
    email: "eleanor.r@saffrongardens.com",
    phone: "+1 (555) 000-8821",
    location: "London, United Kingdom",
    role: "Lead Event Planner",
    verified: true,
  });

  // Business info state
  const [businessInfo, setBusinessInfo] = useState({
    companyName: "",
    businessEmail: "",
    businessPhone: "",
    instagram: "",
    website: "",
    description: "",
  });

  // Settings state
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: true,
    darkMode: true, // Default to dark mode since page is dark by default
    language: "English",
  });

  const handlePersonalChange = (field, value) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleBusinessChange = (field, value) => {
    setBusinessInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSettingsChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    // TODO: Implement API call to save changes
    try {
      console.log("Saving changes...", {
        personalInfo,
        businessInfo,
        settings,
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleSignOut = () => {
    // TODO: Implement sign out logic
    if (confirm("Are you sure you want to sign out?")) {
      router.push("/login");
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      className={`page-shell ${
        settings.darkMode ? "bg-[#1a1a1a]" : "bg-background-light"
      } relative flex flex-col shadow-2xl overflow-hidden`}
    >
      {/* Header */}
      <header
        className={`flex items-center justify-between page-padding py-4 sm:py-6 pb-2 ${
          settings.darkMode ? "bg-[#1a1a1a]" : "bg-background-light"
        } z-10 sticky top-0`}
      >
        <button
          onClick={handleBack}
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            settings.darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          } transition-colors`}
        >
          <span
            className={`material-symbols-outlined ${
              settings.darkMode ? "text-white" : "text-text-main"
            }`}
            style={{ fontSize: "24px" }}
          >
            arrow_back_ios_new
          </span>
        </button>
        <h1
          className={`text-xl font-bold tracking-tight ${
            settings.darkMode ? "text-white" : "text-text-main"
          }`}
        >
          My Profile
        </h1>
        <button
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            settings.darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          } transition-colors`}
        >
          <span
            className={`material-symbols-outlined ${
              settings.darkMode ? "text-white" : "text-text-main"
            }`}
            style={{ fontSize: "24px" }}
          >
            more_horiz
          </span>
        </button>
      </header>

      {/* Main Content Scroll Area */}
      <main className="flex-1 overflow-y-auto pb-24">
        {/* Profile Info Section */}
        <div className="flex flex-col items-center pt-6 page-padding">
          <div className="relative group cursor-pointer">
            <div
              className={`w-28 h-28 rounded-full bg-cover bg-center border-4 ${
                settings.darkMode ? "border-gray-700" : "border-white"
              } shadow-md relative overflow-hidden`}
              style={{ backgroundImage: `url('${profileImage}')` }}
            ></div>
            {/* Edit Badge */}
            <label
              htmlFor="profile-image-upload"
              className={`absolute bottom-0 right-0 bg-primary w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                settings.darkMode ? "border-gray-700" : "border-white"
              } shadow-sm cursor-pointer hover:bg-[#f2ee05] transition-colors`}
            >
              <span
                className="material-symbols-outlined text-black"
                style={{ fontSize: "16px" }}
              >
                edit
              </span>
              <input
                id="profile-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <div className="mt-4 text-center">
            <h2
              className={`text-2xl font-bold ${
                settings.darkMode ? "text-white" : "text-text-main"
              }`}
            >
              {personalInfo.fullName}
            </h2>
            <p
              className={`${
                settings.darkMode ? "text-gray-400" : "text-text-muted"
              } font-medium mt-1`}
            >
              {personalInfo.role}
            </p>
            {personalInfo.verified && (
              <div
                className={`inline-flex items-center gap-1.5 mt-2 ${
                  settings.darkMode ? "bg-primary/30" : "bg-primary/20"
                } px-3 py-1 rounded-full`}
              >
                <span
                  className={`material-symbols-outlined ${
                    settings.darkMode ? "text-black" : "text-text-muted"
                  }`}
                  style={{ fontSize: "16px" }}
                >
                  verified
                </span>
                <span
                  className={`text-xs font-semibold uppercase tracking-wide ${
                    settings.darkMode ? "text-black" : "text-[#111]"
                  }`}
                >
                  Verified Partner
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Segmented Control */}
        <div className="page-padding py-8 md:col-span-2">
          <div
            className={`flex p-1.5 ${
              settings.darkMode ? "bg-[#2a2a2a]" : "bg-[#ebebe6]"
            } rounded-full relative`}
          >
            <div className="w-full flex">
              <label className="flex-1 relative cursor-pointer group z-10">
                <input
                  type="radio"
                  name="profile_tab"
                  checked={activeTab === "personal"}
                  onChange={() => setActiveTab("personal")}
                  className="sr-only peer"
                />
                <div
                  className={`py-2.5 text-center text-sm font-semibold rounded-full ${
                    settings.darkMode ? "text-gray-400" : "text-gray-600"
                  } transition-all duration-300 peer-checked:text-black ${
                    settings.darkMode
                      ? "peer-checked:bg-primary"
                      : "peer-checked:bg-white"
                  } peer-checked:shadow-sm`}
                >
                  Personal
                </div>
              </label>
              <label className="flex-1 relative cursor-pointer group z-10">
                <input
                  type="radio"
                  name="profile_tab"
                  checked={activeTab === "business"}
                  onChange={() => setActiveTab("business")}
                  className="sr-only peer"
                />
                <div
                  className={`py-2.5 text-center text-sm font-semibold rounded-full ${
                    settings.darkMode ? "text-gray-400" : "text-gray-600"
                  } transition-all duration-300 peer-checked:text-black ${
                    settings.darkMode
                      ? "peer-checked:bg-primary"
                      : "peer-checked:bg-white"
                  } peer-checked:shadow-sm`}
                >
                  Business
                </div>
              </label>
              <label className="flex-1 relative cursor-pointer group z-10">
                <input
                  type="radio"
                  name="profile_tab"
                  checked={activeTab === "settings"}
                  onChange={() => setActiveTab("settings")}
                  className="sr-only peer"
                />
                <div
                  className={`py-2.5 text-center text-sm font-semibold rounded-full ${
                    settings.darkMode ? "text-gray-400" : "text-gray-600"
                  } transition-all duration-300 peer-checked:text-black ${
                    settings.darkMode
                      ? "peer-checked:bg-primary"
                      : "peer-checked:bg-white"
                  } peer-checked:shadow-sm`}
                >
                  Settings
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="page-padding content-grid">
          {/* Personal Tab */}
          {activeTab === "personal" && (
            <>
              {/* Full Name */}
              <div className="group relative">
                <label
                  className={`block text-sm font-medium ${
                    settings.darkMode ? "text-gray-300" : "text-[#111]"
                  } mb-2 ml-4`}
                >
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={personalInfo.fullName}
                    onChange={(e) =>
                      handlePersonalChange("fullName", e.target.value)
                    }
                    placeholder="Enter your name"
                    className={`w-full h-14 pl-5 pr-12 rounded-full border-none ${
                      settings.darkMode
                        ? "bg-[#2a2a2a] ring-1 ring-gray-700 text-white placeholder-gray-500"
                        : "bg-white ring-1 ring-gray-300 text-[#111] placeholder-gray-500"
                    } shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all`}
                  />
                  <span
                    className="material-symbols-outlined absolute right-5 text-gray-400"
                    style={{ fontSize: "20px" }}
                  >
                    person
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="group relative">
                <label
                  className={`block text-sm font-medium ${
                    settings.darkMode ? "text-gray-300" : "text-[#111]"
                  } mb-2 ml-4`}
                >
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) =>
                      handlePersonalChange("email", e.target.value)
                    }
                    placeholder="name@example.com"
                    className={`w-full h-14 pl-5 pr-12 rounded-full border-none ${
                      settings.darkMode
                        ? "bg-[#2a2a2a] ring-1 ring-gray-700 text-white placeholder-gray-500"
                        : "bg-white ring-1 ring-gray-300 text-[#111] placeholder-gray-500"
                    } shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all`}
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
                <label
                  className={`block text-sm font-medium ${
                    settings.darkMode ? "text-gray-300" : "text-[#111]"
                  } mb-2 ml-4`}
                >
                  Phone Number
                </label>
                <div className="relative flex items-center">
                  <input
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(e) =>
                      handlePersonalChange("phone", e.target.value)
                    }
                    placeholder="+1 (000) 000-0000"
                    className={`w-full h-14 pl-5 pr-12 rounded-full border-none ${
                      settings.darkMode
                        ? "bg-[#2a2a2a] ring-1 ring-gray-700 text-white placeholder-gray-500"
                        : "bg-white ring-1 ring-gray-300 text-[#111] placeholder-gray-500"
                    } shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all`}
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
                <label
                  className={`block text-sm font-medium ${
                    settings.darkMode ? "text-gray-300" : "text-[#111]"
                  } mb-2 ml-4`}
                >
                  Primary Location
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={personalInfo.location}
                    onChange={(e) =>
                      handlePersonalChange("location", e.target.value)
                    }
                    placeholder="City, Country"
                    className={`w-full h-14 pl-5 pr-12 rounded-full border-none ${
                      settings.darkMode
                        ? "bg-[#2a2a2a] ring-1 ring-gray-700 text-white placeholder-gray-500"
                        : "bg-white ring-1 ring-gray-300 text-[#111] placeholder-gray-500"
                    } shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all`}
                  />
                  <span
                    className="material-symbols-outlined absolute right-5 text-gray-400"
                    style={{ fontSize: "20px" }}
                  >
                    location_on
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Business Tab */}
          {activeTab === "business" && (
            <>
              {/* Company Name */}
              <div className="group relative">
                <label
                  className={`block text-sm font-medium ${
                    settings.darkMode ? "text-gray-300" : "text-[#111]"
                  } mb-2 ml-4`}
                >
                  Company Name
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={businessInfo.companyName}
                    onChange={(e) =>
                      handleBusinessChange("companyName", e.target.value)
                    }
                    placeholder="Enter company name"
                    className={`w-full h-14 pl-5 pr-12 rounded-full border-none ${
                      settings.darkMode
                        ? "bg-[#2a2a2a] ring-1 ring-gray-700 text-white placeholder-gray-500"
                        : "bg-white ring-1 ring-gray-300 text-[#111] placeholder-gray-500"
                    } shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all`}
                  />
                  <span
                    className="material-symbols-outlined absolute right-5 text-gray-400"
                    style={{ fontSize: "20px" }}
                  >
                    business
                  </span>
                </div>
              </div>

              {/* Business Email */}
              <div className="group relative">
                <label
                  className={`block text-sm font-medium ${
                    settings.darkMode ? "text-gray-300" : "text-[#111]"
                  } mb-2 ml-4`}
                >
                  Business Email
                </label>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    value={businessInfo.businessEmail}
                    onChange={(e) =>
                      handleBusinessChange("businessEmail", e.target.value)
                    }
                    placeholder="business@example.com"
                    className={`w-full h-14 pl-5 pr-12 rounded-full border-none ${
                      settings.darkMode
                        ? "bg-[#2a2a2a] ring-1 ring-gray-700 text-white placeholder-gray-500"
                        : "bg-white ring-1 ring-gray-300 text-[#111] placeholder-gray-500"
                    } shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all`}
                  />
                  <span
                    className="material-symbols-outlined absolute right-5 text-gray-400"
                    style={{ fontSize: "20px" }}
                  >
                    mail
                  </span>
                </div>
              </div>

              {/* Business Phone */}
              <div className="group relative">
                <label
                  className={`block text-sm font-medium ${
                    settings.darkMode ? "text-gray-300" : "text-[#111]"
                  } mb-2 ml-4`}
                >
                  Business Phone
                </label>
                <div className="relative flex items-center">
                  <input
                    type="tel"
                    value={businessInfo.businessPhone}
                    onChange={(e) =>
                      handleBusinessChange("businessPhone", e.target.value)
                    }
                    placeholder="+1 (000) 000-0000"
                    className={`w-full h-14 pl-5 pr-12 rounded-full border-none ${
                      settings.darkMode
                        ? "bg-[#2a2a2a] ring-1 ring-gray-700 text-white placeholder-gray-500"
                        : "bg-white ring-1 ring-gray-300 text-[#111] placeholder-gray-500"
                    } shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all`}
                  />
                  <span
                    className="material-symbols-outlined absolute right-5 text-gray-400"
                    style={{ fontSize: "20px" }}
                  >
                    call
                  </span>
                </div>
              </div>

              {/* Instagram */}
              <div className="group relative">
                <label
                  className={`block text-sm font-medium ${
                    settings.darkMode ? "text-gray-300" : "text-[#111]"
                  } mb-2 ml-4`}
                >
                  Instagram
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={businessInfo.instagram}
                    onChange={(e) =>
                      handleBusinessChange("instagram", e.target.value)
                    }
                    placeholder="https://instagram.com/yourhandle"
                    className={`w-full h-14 pl-5 pr-12 rounded-full border-none ${
                      settings.darkMode
                        ? "bg-[#2a2a2a] ring-1 ring-gray-700 text-white placeholder-gray-500"
                        : "bg-white ring-1 ring-gray-300 text-[#111] placeholder-gray-500"
                    } shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all`}
                  />
                  <span
                    className="material-symbols-outlined absolute right-5 text-gray-400"
                    style={{ fontSize: "20px" }}
                  >
                    share
                  </span>
                </div>
              </div>

              {/* Website */}
              <div className="group relative md:col-span-2">
                <label
                  className={`block text-sm font-medium ${
                    settings.darkMode ? "text-gray-300" : "text-[#111]"
                  } mb-2 ml-4`}
                >
                  Website
                </label>
                <div className="relative flex items-center">
                  <input
                    type="url"
                    value={businessInfo.website}
                    onChange={(e) =>
                      handleBusinessChange("website", e.target.value)
                    }
                    placeholder="https://example.com"
                    className={`w-full h-14 pl-5 pr-12 rounded-full border-none ${
                      settings.darkMode
                        ? "bg-[#2a2a2a] ring-1 ring-gray-700 text-white placeholder-gray-500"
                        : "bg-white ring-1 ring-gray-300 text-[#111] placeholder-gray-500"
                    } shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all`}
                  />
                  <span
                    className="material-symbols-outlined absolute right-5 text-gray-400"
                    style={{ fontSize: "20px" }}
                  >
                    language
                  </span>
                </div>
              </div>

              {/* Business Description */}
              <div className="group relative md:col-span-2">
                <label
                  className={`block text-sm font-medium ${
                    settings.darkMode ? "text-gray-300" : "text-[#111]"
                  } mb-2 ml-4`}
                >
                  Business Description
                </label>
                <div className="relative flex items-start">
                  <textarea
                    value={businessInfo.description}
                    onChange={(e) =>
                      handleBusinessChange("description", e.target.value)
                    }
                    placeholder="Describe your business..."
                    rows="4"
                    className={`w-full p-5 rounded-3xl border-none ${
                      settings.darkMode
                        ? "bg-[#2a2a2a] ring-1 ring-gray-700 text-white placeholder-gray-500"
                        : "bg-white ring-1 ring-gray-300 text-[#111] placeholder-gray-500"
                    } shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none`}
                  />
                </div>
              </div>
            </>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <>
              {/* Notifications */}
              <div
                className={`group relative ${
                  settings.darkMode
                    ? "bg-[#2a2a2a] ring-1 ring-gray-700"
                    : "bg-white ring-1 ring-gray-200"
                } rounded-3xl p-5 shadow-sm`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="material-symbols-outlined text-gray-400"
                      style={{ fontSize: "24px" }}
                    >
                      notifications
                    </span>
                    <div>
                      <p
                        className={`font-medium ${
                          settings.darkMode ? "text-white" : "text-[#111]"
                        }`}
                      >
                        Push Notifications
                      </p>
                      <p
                        className={`text-xs ${
                          settings.darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Receive notifications about updates
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={(e) =>
                        handleSettingsChange("notifications", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              {/* Email Updates */}
              <div
                className={`group relative ${
                  settings.darkMode
                    ? "bg-[#2a2a2a] ring-1 ring-gray-700"
                    : "bg-white ring-1 ring-gray-200"
                } rounded-3xl p-5 shadow-sm`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="material-symbols-outlined text-gray-400"
                      style={{ fontSize: "24px" }}
                    >
                      mail
                    </span>
                    <div>
                      <p
                        className={`font-medium ${
                          settings.darkMode ? "text-white" : "text-[#111]"
                        }`}
                      >
                        Email Updates
                      </p>
                      <p
                        className={`text-xs ${
                          settings.darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Receive email newsletters
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailUpdates}
                      onChange={(e) =>
                        handleSettingsChange("emailUpdates", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              {/* Dark Mode */}
              <div
                className={`group relative ${
                  settings.darkMode
                    ? "bg-[#2a2a2a] ring-1 ring-gray-700"
                    : "bg-white ring-1 ring-gray-200"
                } rounded-3xl p-5 shadow-sm`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="material-symbols-outlined text-gray-400"
                      style={{ fontSize: "24px" }}
                    >
                      dark_mode
                    </span>
                    <div>
                      <p
                        className={`font-medium ${
                          settings.darkMode ? "text-white" : "text-[#111]"
                        }`}
                      >
                        Dark Mode
                      </p>
                      <p
                        className={`text-xs ${
                          settings.darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Switch to dark theme
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.darkMode}
                      onChange={(e) =>
                        handleSettingsChange("darkMode", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              {/* Language */}
              <div className="group relative">
                <label
                  className={`block text-sm font-medium ${
                    settings.darkMode ? "text-gray-300" : "text-[#111]"
                  } mb-2 ml-4`}
                >
                  Language
                </label>
                <div className="relative flex items-center">
                  <select
                    value={settings.language}
                    onChange={(e) =>
                      handleSettingsChange("language", e.target.value)
                    }
                    className={`w-full h-14 pl-5 pr-12 rounded-full border-none ${
                      settings.darkMode
                        ? "bg-[#2a2a2a] ring-1 ring-gray-700 text-white"
                        : "bg-white ring-1 ring-gray-300 text-[#111]"
                    } shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all appearance-none`}
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                  <span
                    className="material-symbols-outlined absolute right-5 text-gray-400 pointer-events-none"
                    style={{ fontSize: "20px" }}
                  >
                    expand_more
                  </span>
                </div>
              </div>

              {/* Change Password Button */}
              <Link
                href="/update-password"
                className={`w-full h-14 ${
                  settings.darkMode
                    ? "bg-[#2a2a2a] ring-1 ring-gray-700 text-white"
                    : "bg-white ring-1 ring-gray-300 text-[#111]"
                } rounded-full shadow-sm font-medium hover:ring-2 hover:ring-primary transition-all flex items-center justify-center gap-2`}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px" }}
                >
                  lock
                </span>
                Change Password
              </Link>
            </>
          )}
        </div>

        {/* Logout Link */}
        <div className="mt-8 mb-4 text-center">
          <button
            onClick={handleSignOut}
            className={`text-sm font-medium ${
              settings.darkMode
                ? "text-gray-400 hover:text-red-400"
                : "text-gray-700 hover:text-red-500"
            } transition-colors flex items-center justify-center gap-2 mx-auto`}
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
      </main>

      {/* Sticky Footer Action */}
      <div
        className={`absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t ${
          settings.darkMode
            ? "from-[#1a1a1a] via-[#1a1a1a]"
            : "from-background-light via-background-light"
        } to-transparent`}
      >
        <button
          onClick={handleSaveChanges}
          className="w-full h-14 bg-primary rounded-full text-black font-bold text-lg shadow-lg hover:shadow-xl hover:bg-[#f2ee05] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

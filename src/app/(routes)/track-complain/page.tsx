"use client";

import React, { useState, useEffect } from "react";
import { FaClipboardList, FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import Skeleton from "@/components/skeletonGenerator";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import Button from "@/components/myUi/button";
import { useTranslation } from "../../../context/translationContext";

const TrackComplain = () => {
  interface Complaint {
    _id: string;
    department: string;
    customerDetails: {
      name: string;
      email: string;
      phone: string;
      address: string;
    };
    message: string;
    reply: string;
    complainDate: string;
    status: string;
  }

  // passing user's emails to match the complaints
  const { user } = useKindeAuth();
  const userEmail = user?.email;
  const { translate: t } = useTranslation();

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      if (!userEmail) return; // Ensure email is available

      setLoading(true);
      try {
        const response = await fetch(`/api/getComplain?email=${userEmail}`);
        if (!response.ok) {
          toast.error(
            "Failed To Fetch Complaints! Likely it's an internet issue!",
            { duration: 8000 }
          );
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setComplaints(data);
        } else {
          setComplaints([]);
        }
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [userEmail]);

  const handleSearch = async () => {
    if (!searchId.trim()) {
      setSearchResult(null);
      toast.error("Please enter a valid complaint ID.", { duration: 8000 });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/api/getComplain?id=${searchId.trim()}&email=${userEmail}`
      );
      if (!response.ok) {
        toast.error("Complaint not found. Please check the ID and try again.", {
          duration: 8000,
        });
        setSearchResult(null);
        return;
      }
      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      console.error("Error searching complaint:", error);
      setSearchResult(null);
      toast.error("Complaint not found. Please check the ID and try again.", {
        duration: 8000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Function to map department values to their corresponding translation keys
  const getDepartmentTranslationKey = (department: string) => {
    const departmentMap: Record<string, string> = {
      "against-dogs": "complaintCategories.againstDogs",
      "garbage": "complaintCategories.garbageCollection",
      "street-lights": "complaintCategories.streetLights",
      "anti-encroachment": "complaintCategories.antiEncroachment",
      "dangue-spray": "complaintCategories.dangueSpray",
      "parks": "complaintCategories.parks",
      "rain-water": "complaintCategories.rainWater",
      "sewerage": "complaintCategories.sewerage",
      "road-cutting": "complaintCategories.roadCutting",
      "repair-road": "complaintCategories.roadRepair",
      "street-light": "complaintCategories.streetLights",
      "sweeping": "complaintCategories.sweeping",
      "water": "complaintCategories.water"
    };
    
    return departmentMap[department] || department;
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8 sm:py-12 bg-gradient-to-b from-gray-50 to-green-50">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-gray-800 bg-gradient-to-r from-greenish to-green-500 bg-clip-text text-transparent py-3">
            {t("trackingPage.title")}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {t("trackingPage.subtitle")}
          </p>
        </div>

        <div className="mb-8">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-3 sm:p-4 rounded-lg focus:ring-2 ring-greenish transition-all duration-200 bg-gray-50 hover:bg-white text-base outline-none shadow-md"
              placeholder={t("trackingPage.searchPlaceholder")}
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 p-3 sm:p-4 bg-greenish text-white rounded-full hover:bg-green-600 transition-all duration-200 shadow-md"
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {loading && (
          <div className="space-y-4">
            <Skeleton width="75%" height="20px" />
            <Skeleton width="50%" height="20px" />
            <Skeleton width="100%" height="20px" />
            <Skeleton width="85%" height="20px" />
            <Skeleton width="60%" height="20px" />
            <Skeleton width="75%" height="20px" />
            <Skeleton width="50%" height="20px" />
          </div>
        )}

        {!loading && searchResult && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">
              {t("trackingPage.searchResultTitle")}
            </h2>
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-greenish">
                    {t("trackingPage.idLabel")}
                  </p>
                  <p className="text-gray-900">{searchResult._id}</p>
                </div>
                <div>
                  <p className="font-semibold text-greenish">
                    {t("trackingPage.departmentLabel")}
                  </p>
                  <p className="text-gray-900">
                    {t(getDepartmentTranslationKey(searchResult.department))}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="font-semibold text-greenish">
                    {t("trackingPage.messageLabel")}
                  </p>
                  <p className="text-gray-900">{searchResult.message}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="font-semibold text-greenish">
                    {t("trackingPage.replyLabel")}
                  </p>
                  <p className="text-gray-900">
                    {searchResult.reply
                      ? searchResult.reply
                      : t("trackingPage.notRepliedYet")}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-greenish">
                    {t("trackingPage.statusLabel")}
                  </p>
                  <p className="text-gray-900">{searchResult.status}</p>
                </div>
                <div>
                  <p className="font-semibold text-greenish">
                    {t("trackingPage.dateLabel")}
                  </p>
                  <p className="text-gray-900">
                    {new Date(searchResult.complainDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {!loading &&
          !searchResult &&
          (complaints.length > 0 ? (
            <div>
              <h2 className="text-xl font-bold mb-2">
                {t("trackingPage.recentComplaintsTitle")}
              </h2>
              {complaints.map((complaint) => (
                <div
                  key={complaint._id}
                  className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-greenish">
                        {t("trackingPage.idLabel")}
                      </p>
                      <p className="text-gray-900">{complaint._id}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-greenish">
                        {t("trackingPage.departmentLabel")}
                      </p>
                      <p className="text-gray-900">
                        {t(getDepartmentTranslationKey(complaint.department))}
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="font-semibold text-greenish">
                        {t("trackingPage.messageLabel")}
                      </p>
                      <p className="text-gray-900">{complaint.message}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="font-semibold text-greenish">
                        {t("trackingPage.replyLabel")}
                      </p>
                      <p className="text-gray-900">
                        {complaint.reply ? complaint.reply : t("trackingPage.notRepliedYet")}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-greenish">
                        {t("trackingPage.statusLabel")}
                      </p>
                      <p className="text-gray-900">{complaint.status}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-greenish">
                        {t("trackingPage.dateLabel")}
                      </p>
                      <p className="text-gray-900">
                        {new Date(complaint.complainDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mb-4 text-gray-400">
                <FaClipboardList className="mx-auto text-5xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {t("trackingPage.noComplaintsTitle")}
              </h3>
              <p className="text-gray-500 mb-6">
                {t("trackingPage.noComplaintsMessage")}
              </p>
              <div className="w-fit mx-auto">
                <Button
                  text={t("trackingPage.registerNewButton")}
                  link="register-complain"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TrackComplain;

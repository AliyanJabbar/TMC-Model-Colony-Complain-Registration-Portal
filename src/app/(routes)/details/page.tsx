"use client";

import Button from "@/components/myUi/button";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import sanitizeInput from "@/components/sanitizeInput";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaComments,
} from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useTranslation } from "../../../context/translationContext";

const Details = () => {
  const params = useSearchParams();
  const complainType = params.get("complainType");
  const router = useRouter();
  const { translate: t } = useTranslation();

  //loading state for submit button
  const [loading, setLoading] = useState(false);
  // user details from kinde auth
  const { user, isAuthenticated } = useKindeAuth();

  // Add error state to the component
  const [errors, setErrors] = useState<{
    phone?: string;
  }>({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  
  useEffect(() => {
    if (isAuthenticated && user?.given_name && user.family_name && user.email) {
      setFormData({
        ...formData,
        name: user.given_name + " " + user.family_name,
        email: user.email,
      });
    }
  }, [isAuthenticated]);

  const validatePhoneNumber = (phone: string): boolean => {
    // This regex validates Pakistani phone numbers (starting with +92 or 03)
    const phoneRegex = /^(\+92|0)[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  // submitting form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number
    if (!validatePhoneNumber(formData.phone)) {
      setErrors({
        phone: t("detailsPage.invalidPhoneNumber") 
      });
      return;
    }
    
    setLoading(true);

    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      address: sanitizeInput(formData.address),
      message: sanitizeInput(formData.message),
    };
    try {
      const response = await fetch("/api/storeComplain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: sanitizedData,
          department: complainType,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(t("detailsPage.successMessage"), { duration: 7000 });
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });

        router.push(`/?id=${result.complainId}`);
      } else {
        toast.error(`Error: ${result.error}`, { duration: 7000 });
        router.push("/");
      }
    } catch (error) {
      toast.error(t("detailsPage.errorMessage"), { duration: 7000 });
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    
    // Clear error when user types
    if (name === 'phone') {
      setErrors(prev => ({ ...prev, phone: undefined }));
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  const inputClasses =
    "w-full p-3 sm:p-4 rounded-lg focus:ring-2 group-hover:ring-2 ring-greenish transition-all duration-200 bg-gray-50 hover:bg-white text-base outline-none";
  const labelClasses =
    "flex items-center text-sm sm:text-base font-semibold mb-2 text-gray-700 transition-colors duration-200 group-focus-within:text-greenish";
  const iconClasses =
    "mr-2 text-gray-600 group-hover:text-greenish group-hover:scale-110 transition-transform duration-200 text-lg sm:text-xl";

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8 sm:py-12 text-gray-700 bg-gradient-to-b from-gray-50 to-green-50">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-gray-800 bg-gradient-to-r from-greenish to-green-500 bg-clip-text text-transparent py-2">
            {t("detailsPage.title")}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {t("detailsPage.subtitle")}
          </p>
        </div>

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="space-y-6 sm:space-y-8"
        >
          <div className="group">
            <label htmlFor="name" className={labelClasses}>
              <FaUser className={iconClasses} /> {t("detailsPage.fullName")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClasses}
              placeholder={t("detailsPage.namePlaceholder")}
              readOnly={isAuthenticated!}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="group">
              <label htmlFor="email" className={labelClasses}>
                <FaEnvelope className={iconClasses} />{" "}
                {t("detailsPage.emailAddress")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={
                  isAuthenticated && user?.email ? user.email : formData.email
                }
                onChange={handleChange}
                className={inputClasses}
                placeholder={t("detailsPage.emailPlaceholder")}
                readOnly={isAuthenticated!}
                required
              />
            </div>

            <div className="group">
              <label htmlFor="phone" className={labelClasses}>
                <FaPhone className={iconClasses} />{" "}
                {t("detailsPage.phoneNumber")}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`${inputClasses} ${errors.phone ? 'ring-2 ring-red-500' : ''}`}
                placeholder={t("detailsPage.phonePlaceholder")}
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="group">
            <label htmlFor="address" className={labelClasses}>
              <FaMapMarkerAlt className={iconClasses} />{" "}
              {t("detailsPage.address")}
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={inputClasses}
              placeholder={t("detailsPage.addressPlaceholder")}
              required
            />
          </div>

          <div className="group">
            <label htmlFor="message" className={labelClasses}>
              <FaComments className={iconClasses} />{" "}
              {t("detailsPage.complaintDetails")}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`${inputClasses} resize-none`}
              placeholder={t("detailsPage.detailsPlaceholder")}
              required
            />
          </div>

          <div className="flex items-end justify-end pt-6">
            <Button
              text={
                loading
                  ? t("detailsPage.submittingButton")
                  : t("detailsPage.submitButton")
              }
              type="submit"
              isLoading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Details;
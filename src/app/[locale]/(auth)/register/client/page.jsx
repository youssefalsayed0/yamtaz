"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react"; // Added useEffect
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "@/i18n/routing";

export default function Page() {
  const [phoneCode, setPhoneCode] = useState("966"); // Default to Saudi Arabia
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpModal, setOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(60); // Resend OTP timer

  // Countdown timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Function to handle resending OTP
  const handleResendOtp = async () => {
    if (resendTimer > 0) return; // Prevent resending before the timer ends

    try {
      // Call the API to resend OTP
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}v1/auth/resend-otp`, {
        phone_code: phoneCode,
        phone: phone,
      });

      // Reset the timer
      setResendTimer(60);
      Swal.fire("Success", "OTP resent successfully!", "success");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Failed to resend OTP", "error");
    }
  };

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().min(3, "Too short").max(50, "Too long").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    gender: Yup.string().required("Required"),
    invitationCode: Yup.string(),
    acceptedTos: Yup.boolean().oneOf([true], "You must accept the terms"),
  });

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      invitationCode: "",
      acceptedTos: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      if (phoneCode === "966" && !phoneVerified) {
        Swal.fire("Error", "Please verify your phone number first", "error");
        return;
      }
      setLoading(true);

      try {
        const form = new FormData();
        form.append("account_type", "client");
        form.append("name", values.name);
        form.append("email", values.email);
        form.append("password", values.password);
        form.append("phone", phone);
        form.append("phone_code", phoneCode);
        form.append("gender", values.gender);
        form.append("accepted_tos", "1");

        // Only send OTP field if phoneCode is "966"
        if (phoneCode === "966" && otp) {
          form.append("otp", otp);
        }

        if (values.invitationCode) form.append("invitation_code", values.invitationCode);

        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}v1/auth/register`, form);
        Swal.fire("Success", "Account created successfully!", "success");
      } catch (error) {
        const errors = error.response?.data?.data?.errors;
        let errorMessage = "Registration failed";

        if (errors) {
          if (errors.email && errors.email.length > 0) {
            errorMessage = errors.email[0];
          } else if (errors.phone && errors.phone.length > 0) {
            errorMessage = errors.phone[0];
          }
        }

        Swal.fire("Error", errorMessage, "error");
        console.log(error.response);
      } finally {
        setLoading(false);
      }
    },
  });

  // Handle Phone Verification
  const handleVerifyPhone = async () => {
    if (!phone) {
      Swal.fire("Error", "Please enter your phone number", "error");
      return;
    }

    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}v1/auth/check-phone`, {
        phone_code: phoneCode,
        phone: phone,
      });

      setOtpModal(true);
      setResendTimer(60); // Start the resend timer
      Swal.fire("Success", "OTP sent to your phone", "success");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Phone verification failed", "error");
    }
  };

  // Confirm OTP
  const confirmOtp = async () => {
    if (!otp) {
      Swal.fire("Error", "Please enter the OTP", "error");
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}v1/auth/confirm-otp`, {
        phone_code: phoneCode,
        phone: phone,
        otp: otp,
      });

      if (response.data.success) {
        setPhoneVerified(true);
        setOtpModal(false);
        Swal.fire("Success", "Phone number verified", "success");
      } else {
        Swal.fire("Error", response.data.message || "OTP verification failed", "error");
      }
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "OTP verification failed", "error");
    }
  };

  const handleOtpSubmit = async () => {
    await confirmOtp();
  };

  return (
    <div className="w-full relative">
      <div className="flex flex-col justify-center items-center w-full gap-4 p-4">
        <div className="font-bold text-2xl text-center">Create a Service Requester Account</div>

        <form onSubmit={formik.handleSubmit} className="w-[100%] p-6 lg:w-[80%] rounded-lg space-y-4">
          {/* Name Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input type="text" name="name" className="input bg-[#F9F9F9] w-full" {...formik.getFieldProps("name")} />
            {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm">{formik.errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input type="email" name="email" className="input bg-[#F9F9F9] w-full" {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}
          </div>

          {/* Phone Number Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <div className="flex gap-2" dir="ltr">
              {phoneCode === "966" && (
                <button
                  type="button"
                  onClick={handleVerifyPhone}
                  className="btn bg-main hover-scale main-transition text-white py-1 hover:bg-orange-300 text-sm"
                >
                  Verify Phone
                </button>
              )}
              <PhoneInput
                country="sa"
                value={phone}
                enableAreaCodeStretch
                enableSearch
                dropdownClass="w-full !overflow-x-hidden"
                disableSearchIcon
                inputClass="!w-full !py-3 !h-full !border-none !bg-inputBg"
                buttonClass="rounded-md !bg-transparent !border-0 !h-full !justify-start"
                onChange={(value, country) => {
                  setPhone(value);
                  setPhoneCode(country.dialCode);
                  setPhoneVerified(country.dialCode !== "966");
                }}
                containerClass="w-full"
              />
            </div>
          </div>

          {/* Password Fields */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" name="password" className="input bg-[#F9F9F9] w-full" {...formik.getFieldProps("password")} />
            {formik.touched.password && formik.errors.password && <p className="text-red-500 text-sm">{formik.errors.password}</p>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input type="password" name="confirmPassword" className="input bg-[#F9F9F9] w-full" {...formik.getFieldProps("confirmPassword")} />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
            )}
          </div>

          {/* Gender Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <select name="gender" className="select select-bordered w-full" {...formik.getFieldProps("gender")}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {formik.touched.gender && formik.errors.gender && <p className="text-red-500 text-sm">{formik.errors.gender}</p>}
          </div>

          {/* Invitation Code Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Invitation Code (Optional)</span>
            </label>
            <input type="text" name="invitationCode" className="input bg-[#F9F9F9] w-full" {...formik.getFieldProps("invitationCode")} />
          </div>

          {/* Terms Checkbox */}
          <div className="form-control">
            <label className="label cursor-pointer justify-start">
              <input type="checkbox" name="acceptedTos" className="checkbox checkbox-warning" {...formik.getFieldProps("acceptedTos")} />
              <span className="label-text ms-3">Agree to Terms and Conditions</span>
            </label>
            {formik.touched.acceptedTos && formik.errors.acceptedTos && (
              <p className="text-red-500 text-sm">{formik.errors.acceptedTos}</p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="rounded-[12px] p-3 bg-main hover-scale main-transition text-white w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link className="color-main" href="/login">
            Sign In
          </Link>
        </p>

        {/* OTP Modal */}
        {otpModal && (
          <dialog id="my_modal_1" className="modal" open>
            <div className="modal-box">
              <h3 className="font-bold text-lg">Enter OTP</h3>
              <p className="py-4">Please enter the OTP sent to your phone.</p>

              {/* OTP Input */}
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="input input-bordered w-full"
              />

              {/* Resend OTP Counter */}
              <div className="mt-4 text-sm text-gray-600">
                {resendTimer > 0 ? (
                  <p>Resend OTP in {resendTimer} seconds</p>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    className="text-blue-500 hover:text-blue-700 underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              {/* Modal Actions */}
              <div className="modal-action">
                {/* Submit OTP Button */}
                <button onClick={handleOtpSubmit} className="btn btn-primary">
                  Submit OTP
                </button>

                {/* Exit Modal Button */}
                <button
                  onClick={() => setOtpModal(false)}
                  className="btn btn-ghost"
                >
                  Close
                </button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
}
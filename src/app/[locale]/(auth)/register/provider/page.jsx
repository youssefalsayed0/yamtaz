"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
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

  // Validation Schema for Lawyers
  const validationSchema = Yup.object({
    first_name: Yup.string().min(3, "Too short").max(50, "Too long").required("Required"),
    second_name: Yup.string().min(3, "Too short").max(50, "Too long").required("Required"),
    third_name: Yup.string().min(3, "Too short").max(50, "Too long").notRequired(),
    fourth_name: Yup.string().min(3, "Too short").max(50, "Too long").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    gender: Yup.string().required("Required"),
    referred_by: Yup.string(),
    acceptedTos: Yup.boolean().oneOf([true], "You must accept the terms"),
  });

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      first_name: "",
      second_name: "",
      third_name: "",
      fourth_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      referred_by: "",
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
        form.append("account_type", "lawyer"); // Static account type
        form.append("first_name", values.first_name);
        form.append("second_name", values.second_name);
        form.append("third_name", values.third_name || ""); // Optional
        form.append("fourth_name", values.fourth_name);
        form.append("email", values.email);
        form.append("password", values.password);
        form.append("phone", phone);
        form.append("phone_code", phoneCode);
        form.append("gender", values.gender);
        form.append("accepted_tos", "1");

        if (values.referred_by) form.append("referred_by", values.referred_by);

        // Only send OTP field if phoneCode is "966"
        if (phoneCode === "966" && otp) {
          form.append("otp", otp);
        }

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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}v1/auth/confirm-phone`, {
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
        <div className="font-bold text-2xl text-center">Create a Lawyer Account</div>

        <form onSubmit={formik.handleSubmit} className="w-[100%] p-6 lg:w-[80%] rounded-lg space-y-4">
          {/* First Name Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input type="text" name="first_name" className="input bg-[#F9F9F9] w-full" {...formik.getFieldProps("first_name")} />
            {formik.touched.first_name && formik.errors.first_name && <p className="text-red-500 text-sm">{formik.errors.first_name}</p>}
          </div>

          {/* Second Name Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Second Name</span>
            </label>
            <input type="text" name="second_name" className="input bg-[#F9F9F9] w-full" {...formik.getFieldProps("second_name")} />
            {formik.touched.second_name && formik.errors.second_name && <p className="text-red-500 text-sm">{formik.errors.second_name}</p>}
          </div>

          {/* Third Name Field (Optional) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Third Name (Optional)</span>
            </label>
            <input type="text" name="third_name" className="input bg-[#F9F9F9] w-full" {...formik.getFieldProps("third_name")} />
            {formik.touched.third_name && formik.errors.third_name && <p className="text-red-500 text-sm">{formik.errors.third_name}</p>}
          </div>

          {/* Fourth Name Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Fourth Name</span>
            </label>
            <input type="text" name="fourth_name" className="input bg-[#F9F9F9] w-full" {...formik.getFieldProps("fourth_name")} />
            {formik.touched.fourth_name && formik.errors.fourth_name && <p className="text-red-500 text-sm">{formik.errors.fourth_name}</p>}
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
                <button type="button" onClick={handleVerifyPhone} className="btn bg-main hover-scale main-transition text-white py-1 hover:bg-orange-300 text-sm">
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
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input type="password" name="confirmPassword" className="input bg-[#F9F9F9] w-full" {...formik.getFieldProps("confirmPassword")} />
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
          </div>

          {/* Referral Code Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Referral Code (Optional)</span>
            </label>
            <input type="text" name="referred_by" className="input bg-[#F9F9F9] w-full" {...formik.getFieldProps("referred_by")} />
          </div>

          {/* Terms Checkbox */}
          <div className="form-control">
            <label className="label cursor-pointer justify-start">
              <input type="checkbox" name="acceptedTos" className="checkbox checkbox-warning" {...formik.getFieldProps("acceptedTos")} />
              <span className="label-text ms-3">Agree to Terms and Conditions</span>
            </label>
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
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="input input-bordered w-full"
              />
              <div className="modal-action">
				<button className="btn" >Close</button>
                <button onClick={handleOtpSubmit} className="btn btn-primary">
                  Submit OTP
                </button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
}
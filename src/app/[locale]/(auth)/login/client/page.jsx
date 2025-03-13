"use client";

import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "@/i18n/routing";
import { api } from "@/services/api";

export default function Page() {
	const [loading, setLoading] = useState(false);

	const validationSchema = Yup.object({
		email: Yup.string().email("Invalid email address").required("Required"),
		password: Yup.string().required("Required"),
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			setLoading(true);
			try {
				const response = await api.post("v1/auth/login", values);
				console.log(response);
				Swal.fire({
					icon: "success",
					title: "Login Successful",
					text: "You have successfully logged in!",
				});
				// Handle successful login (e.g., redirect, store token, etc.)
			} catch (error) {
				Swal.fire({
					icon: "error",
					title: "Login Failed",
					text: error.response?.data?.message || "An error occurred during login.",
				});
			} finally {
				setLoading(false);
			}
		},
	});

	return (
		<div className="w-full relative flex justify-center">
			<div className="flex flex-col justify-center  items-center w-[100%]  lg:w-[65%] ">
				<div className="font-bold text-2xl text-center">Login to Your Account</div>
				<form onSubmit={formik.handleSubmit} className="w-[100%]  rounded-lg space-y-4 mt-[50px]">
					{/* Email Field */}
					<div className="form-control">
						<label className="label">
							<span className="label-text">Email Address</span>
						</label>
						<input type="email" name="email" className="input bg-[#F9F9F9] w-full" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
						{formik.touched.email && formik.errors.email ? <div className="text-red-500 text-sm">{formik.errors.email}</div> : null}
					</div>

					{/* Password Field */}
					<div className="form-control">
						<label className="label">
							<span className="label-text">Password</span>
						</label>
						<input type="password" name="password" className="input bg-[#F9F9F9] w-full" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
						{formik.touched.password && formik.errors.password ? <div className="text-red-500 text-sm">{formik.errors.password}</div> : null}
					</div>

					<div className=" text-end">
						<Link href="/forget-password" className="color-main ">
							Forgot Password?{" "}
						</Link>
					</div>

					{/* Submit Button */}
					<div className=" ">
						<button type="submit" className="rounded-[12px] p-3  mt-5 bg-main hover-scale main-transition text-white w-full  inline-block" disabled={loading}>
							{loading ? "Logging in..." : "Login"}
						</button>
					</div>
				</form>
				<div className="divider text-[#A6A4A4;]">or sign up using </div>

				<div className="flex justify" dir="ltr">
					<Link href="#" className="  mx-5 shadow flex justify-center items-center rounded p-2 hover-scale main-transition">
						<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
							<path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
							<path
								fill="#fff"
								d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
						</svg>
					</Link>
					<Link href="#" className="  mx-5 shadow flex justify-center items-center rounded p-2 hover-scale main-transition">
						<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
							<path
								fill="#FFC107"
								d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
							<path
								fill="#FF3D00"
								d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
							<path
								fill="#4CAF50"
								d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
							<path
								fill="#1976D2"
								d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
						</svg>
					</Link>


					<Link href="#" className=" mx-5 shadow flex justify-center items-center rounded p-2 hover-scale main-transition">
						<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
							<path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
						</svg>
					</Link>
				</div>

				<div className="mt-[80px]  text-center">
                    <Link href="/"className=" text-[#A6A4A4;]">Browsing as a visitor
                    </Link>
					<p className="mt-4 color-pr font-semibold">
						Don't have an account?
						<Link className="color-main" href="/register">
							Sign Up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

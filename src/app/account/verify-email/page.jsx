"use client";
import InputField from "@/components/InputField";
import { verifyOtpSchema } from "@/validations/schema";
import { useFormik } from "formik";
import Link from "next/link";
import { useVerifyEmailMutation } from "@/lib/services/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const initialValues = {
  otp: "",
};
const VarifyEmail = () => {
  const router = useRouter();
  const [verifyEmail] = useVerifyEmailMutation();
  const [loading, setLoading] = useState(false);
  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: verifyOtpSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await verifyEmail(values);
        if (res?.data && res.data.success) {
          toast.success(res.data.message || "success");
          router.push("/account/login");
          setLoading(false);
        }

        if (res.error && !res.error.data.success) {
          toast.error(res.error.data.message || "failed");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
  });
  return (
    <div className="flex items-center justify-center h-screen  bg-gray-200">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">VERIFY OTP</h2>
        <p className="text-sm text-center mb-6 text-gray-400">
          Check your email for OTP. OTP is valid for 15 minutes.{" "}
        </p>

        <form onSubmit={handleSubmit}>
          <InputField
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Enter your registered email"
            label="Email"
            error={errors.email}
          />
          <InputField
            id="otp"
            name="otp"
            type="otp"
            value={values.otp}
            onChange={handleChange}
            placeholder="Enter your otp"
            label="OTP"
            error={errors.otp}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2 disabled:bg-gray-400"
          >
            verify
          </button>
        </form>

        <p className="text-sm text-gray-600 p-1">
          Already a User?{" "}
          <Link
            href="/account/login"
            className="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VarifyEmail;

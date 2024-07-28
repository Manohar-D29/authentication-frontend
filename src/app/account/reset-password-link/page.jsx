"use client";
import InputField from "@/components/InputField";
import { useResetPasswordLinkMutation } from "@/lib/services/auth";
import { resetPasswordLinkSchema } from "@/validations/schema";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const initialValues = {
  email: "",
};
const ResetPasswordLink = () => {
  const [resetPassword] = useResetPasswordLinkMutation();
  const [loading, setLoading] = useState(false);
  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: resetPasswordLinkSchema,
    onSubmit: async (values, action) => {
      setLoading(true);
      try {
        const res = await resetPassword(values);
        if (res?.data && res.data.success) {
          toast.success(res.data.message || "success");
          action.resetForm();
          setLoading(false);
        }
        if (res.error && !res.error.data.success) {
          toast.error(res.error.data.message || "failed");
          setLoading(false);
        }
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    },
  });
  return (
    <div className="flex items-center justify-center h-screen  bg-gray-200">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">RESET PASSWORD</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Enter your email"
            label="Email"
            error={errors.email}
          />
          <button
            type="submit"
            className="w-full flex justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? (
              <img
                src="/loading-80-svgrepo-com.svg"
                alt="Processing..."
                className="w-7 h-7 animate-spin "
              />
            ) : (
              "send-link"
            )}
          </button>
        </form>

        <p className="text-sm text-gray-600 p-1 ">
          Not a User?
          <Link
            href="/account/register"
            className="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordLink;

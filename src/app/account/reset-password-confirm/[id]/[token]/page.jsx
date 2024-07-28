"use client";
import InputField from "@/components/InputField";
import { useResetPasswordMutation } from "@/lib/services/auth";
import { resetPasswordConfirmSchema } from "@/validations/schema";
import { useFormik } from "formik";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const initialValues = {
  password: "",
  confirmPassword: "",
};
const ConfirmPassword = () => {
  const router = useRouter();
  const [resetPassword] = useResetPasswordMutation();
  const [loading, setLoading] = useState(false);
  const { id, token } = useParams();
  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: resetPasswordConfirmSchema,
    onSubmit: async (values, action) => {
      setLoading(true);
      try {
        const data = { ...values, id, token };
        const res = await resetPassword(data);

        if (res?.data && res.data.success) {
          toast.success(res.data.message);
          action.resetForm();
          setLoading(false);
          router.push("/account/login");
        }
        if (res.error && !res.error.data.success) {
          toast.error(res.error.data.message);
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
        <h2 className="text-2xl font-bold mb-6 text-center">
          CONFIRM PASSWORD
        </h2>
        <form onSubmit={handleSubmit}>
          <InputField
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Enter your password"
            label="Password"
            error={errors.password}
          />
          <InputField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            label="Confirm Password"
            error={errors.confirmPassword}
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
              "reset-password"
            )}
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

export default ConfirmPassword;

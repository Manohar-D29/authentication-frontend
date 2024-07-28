"use client";
import InputField from "@/components/InputField";
import { useChangePasswordMutation } from "@/lib/services/auth";
import { resetPasswordConfirmSchema } from "@/validations/schema";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const initialValues = {
  password: "",
  confirmPassword: "",
};
const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: resetPasswordConfirmSchema,
    onSubmit: async (values, action) => {
      setLoading(true);
      try {
        const res = await changePassword(values);
        if (res?.data && res.data.success) {
          toast.success(res.data.message || "success");
          setLoading(false);
          action.resetForm();
          router.push("/account/login");
        }
        if (res.error && !res.error.data.success) {
          toast.error(res.error.data.message || "failed");
          setLoading(false);
        }
      } catch (error) {
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
              "change-password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

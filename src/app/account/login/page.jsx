"use client";
import InputField from "@/components/InputField";
import { useLoginUserMutation } from "@/lib/services/auth";
import { loginSchema } from "@/validations/schema";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const initialValues = {
  email: "",
  password: "",
};
const Login = () => {
  const [loginUser] = useLoginUserMutation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, action) => {
      setLoading(true);
      try {
        const res = await loginUser(values);
        if (res?.data && res.data.success) {
          toast.success(res.data.message || "success");
          setLoading(false);
          action.resetForm();
          router.push("/user/profile");
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
        <h2 className="text-2xl font-bold mb-6 text-center">LOGIN</h2>
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

          <p className="text-sm text-gray-600 p-1">
            <Link
              href="/account/reset-password-link"
              className="text-indigo-500 hover:text-indigo-600 transition duration-300 ease-in-out"
            >
              Forgot Password ?
            </Link>
          </p>

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
              "sign-in"
            )}
          </button>
        </form>

        <p className="text-sm text-gray-600 p-1 ">
          Not a User?{" "}
          <Link
            href="/account/register"
            className="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out"
          >
            Create an account
          </Link>
        </p>
        <button
          className="flex items-center justify-center w-full bg-white border
        border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md
        focus:outline-none focus:ring focus:ring-indigo-200
        focus:ring-opacity-50 hover:bg-slate-100"
        >
          <img
            src="/google-color-svgrepo-com.svg"
            alt=""
            className="w-6 h-6 mr-2 fill-current"
          />
          <span className="text-blue-700">Login with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;

"use client";
import { useLogOutUserMutation } from "@/lib/services/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const UserSidebar = () => {
  const [logOutUser] = useLogOutUserMutation();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await logOutUser();

      if (res?.data && res.data.success) {
        toast.success(res.data.message || "success");
        router.push("/");
      }
      if (res.error && !res.error.data.success) {
        toast.error(res.error.data.message || "failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-blue-700 text-white h-screen p-4">
      <div className="mb-6">
        <Link href="/" className=" flex justify-center">
          <div className="flex justify-center items-center gap-3 border-2 rounded-lg p-2 w-44 hover:border-blue-600">
            <img src="/home-1-svgrepo-com.svg" alt="home" className="w-6 h-6" />
            <h2 className="text-lg font-bold hover:text-blue-500-400">HOME</h2>
          </div>
        </Link>
      </div>
      <nav>
        <ul className="space-y-4 mx-3 font-bold mt-10">
          <li className="flex items-center gap-3">
            <img
              src="/profile-round-1346-svgrepo-com.svg"
              alt="home"
              className="w-5 h-5"
            />
            <Link
              href="/user/profile"
              className="hover:text-blue-400 transition duration-300 ease-in-out"
            >
              Profile
            </Link>
          </li>
          <li className="flex items-center gap-3">
            <img
              src="/edit-cover-1481-svgrepo-com.svg"
              alt="home"
              className="w-5 h-5"
            />
            <Link
              href="/user/change-password"
              className="hover:text-blue-400 transition duration-300 ease-in-out"
            >
              Change Password
            </Link>
          </li>
          <li className="flex items-center gap-1">
            <img
              src="/logout-svgrepo-com (2).svg"
              alt="home"
              className="w-8 h-8"
            />
            <button
              onClick={handleLogout}
              className="hover:text-blue-400 transition duration-300 ease-in-out"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserSidebar;

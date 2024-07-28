"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "./Loading";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const authcookie = Cookies.get("is_authenticated");
    setIsAuthenticated(!!authcookie);
  });

  return (
    <>
      {isAuthenticated === null && <Loading />}
      <nav className="bg-blue-700 flex items-center ">
        {/* logo */}
        <div className="ml-5 border-2 rounded-full p-1">
          <img
            src="/auth-fingerprint-svgrepo-com.svg"
            alt=""
            className="w-8 h-8"
          />
        </div>

        {/* menu */}
        <div className="flex justify-start ml-5 items-center space-x-6 text-white p-4 font-semibold">
          <Link href="/" className="hover:text-blue-400">
            Home
          </Link>
          {isAuthenticated ? (
            <Link href="/user/profile" className="hover:text-blue-400">
              Profile
            </Link>
          ) : (
            <>
              <Link href="/account/login" className="hover:text-blue-400">
                Login
              </Link>
              <Link href="/account/register" className="hover:text-blue-400">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

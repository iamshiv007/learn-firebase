"use client";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
// import { redirect } from "next/navigation";
import { signOut, getAuth } from "firebase/auth";
import firebase_app from "../firebase/config";
import { useRouter } from "next/navigation";

const auth = getAuth(firebase_app);

const Page = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  async function handleLogout() {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!user?.email) {
      return router.push("/");
    }
  }, [user, router]);

  return (
    user && (
      <div className='min-h-[100vh] gap-5 flex-col items-center justify-center flex p-4'>
        <h1 className='text-5xl'>Profile</h1>
        <div>
          <span className='text-3xl'>Email:</span>
          <span className='text-3xl'>{user.email}</span>
        </div>
        <button
          onClick={handleLogout}
          className='font-bold bg-gray-700 rounded px-4 py-2 hover:bg-gray-600'
        >
          Logout
        </button>
      </div>
    )
  );
};

export default Page;

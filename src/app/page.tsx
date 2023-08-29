import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className='flex items-center justify-center flex-col text-white min-h-[100vh] w-fit m-auto'>
      <p className='text-5xl font-bold'>Hi There</p>
      <p className='text-3xl font-bold'>
        This is a project for learning firebase
      </p>
      <p className='flex justify-between mt-10 w-full'>
        <Link className='text-blue-800 underline' href={"/signin"}>
          Signin
        </Link>
        <Link className='text-blue-800 underline' href={"/profile"}>
          Profile
        </Link>
        <Link className='text-blue-800 underline' href={"/signup"}>
          Signup
        </Link>
      </p>
    </div>
  );
}

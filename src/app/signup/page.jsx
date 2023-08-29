"use client";
import React from "react";
import signUp from "../firebase/auth/signup";
import { useRouter } from "next/navigation";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/profile");
  };
  return (
    <div className='form-wrapper'>
      <form
        onSubmit={handleForm}
        className='form min-h-[100vh] gap-5 flex-col items-center justify-center flex p-4'
      >
        <h1 className='text-5xl'>Sign up</h1>
        <label htmlFor='email'>
          <p className='text-2xl'>Email</p>
          <input
            className='text-black px-4 py-2 rounded w-[400px]'
            onChange={(e) => setEmail(e.target.value)}
            required
            type='email'
            name='email'
            id='email'
            placeholder='example@mail.com'
            value={email}
          />
        </label>
        <label htmlFor='password'>
          <p className='text-2xl'>Password</p>
          <input
            className='text-black px-4 py-2 rounded w-[400px]'
            onChange={(e) => setPassword(e.target.value)}
            required
            type='password'
            name='password'
            id='password'
            placeholder='password'
            value={password}
          />
        </label>
        <button
          type='submit'
          className='font-bold bg-gray-700 rounded px-4 py-2 hover:bg-gray-600'
        >
          Sign up
        </button>
      </form>
    </div>
  );
}

export default Page;

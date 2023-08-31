"use client";
import React from "react";
import signUp from "../firebase/auth/signup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import signinGoogle from "../firebase/auth/signinGoogle";
import signinGithub from "../firebase/auth/signinGithub";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { result, error } = await signUp(email, password);
    setLoading(false);

    if (error) {
      console.log(error);
      return alert(error.messgae);
    }

    // else successful
    console.log(result);
    return router.push("/profile");
  };

  const signInWithGoogle = async () => {
    const { result, error } = await signinGoogle();

    if (error) {
      console.log(error);
      return alert(error?.messgae || error?.customData?.email);
    } else {
      console.log(result);
      return router.push("/profile");
    }
  };

  const signInWithGithub = async () => {
    const { result, error } = await signinGithub();

    if (error) {
      console.log(error);
      return alert(error?.message || error?.customData?.email);
    } else {
      console.log(result);
      return router.push("/profile");
    }
  };

  return (
    <div className='form-wrapper'>
      <form
        onSubmit={handleForm}
        className='form min-h-[100vh] gap-5 flex-col items-center justify-center flex p-4 m-auto w-fit'
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
          className='font-bold bg-gray-700 rounded px-4 py-2 hover:bg-gray-600 w-full'
        >
          {loading ? "wait..." : "Sign up"}
        </button>

        <p>
          <span>Already have an account?</span>
          <Link href='/signin' className='text-blue-800 underline ml-2'>
            Sign in
          </Link>
        </p>

        <p>or</p>

        <button
          className='border w-full rounded px-4 py-2 border-solid border-white text-[#5a94f5]'
          type='button'
          onClick={signInWithGoogle}
        >
          Sign up with Google
        </button>
        <button
          className='border w-full rounded px-4 py-2 border-solid border-white text-[#5a94f5]'
          type='button'
          onClick={signInWithGithub}
        >
          Sign up with Github
        </button>
      </form>
    </div>
  );
}

export default Page;

"use client";
import React from "react";
import signUp from "../firebase/auth/signup";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/profile");
  };

  const signInWithGoogle = async () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(result);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.

        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
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
      </form>
    </div>
  );
}

export default Page;

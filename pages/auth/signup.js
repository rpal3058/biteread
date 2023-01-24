import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { signIn, getProviders } from "next-auth/react";
import { useSession } from "next-auth/react";

const SignUp = ({ providers }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      setLoading(false);
      console.log(data.message);
      setStatus(data.message);
      if (data.message == "Created user!") {
        console.log("Trying to authenticate...");
        const result = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });
        console.log(result);
      }
    } catch (error) {
      console.log(error);
      setStatus(error);
    }
  };

  useEffect(() => {
    console.log("test");
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <Head>
        <title>Sign Up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* UserName and Password login */}
      <div className="w-full max-w-xs m-4">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  email: e.target.value,
                });
              }}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              value={formData.password}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  password: e.target.value,
                });
              }}
              required
            />
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#B70808] bg-opacity-80 hover:bg-[#B70808] hover:bg-opacity-60 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Google and Github login */}
        <p className="text-center text-gray-500 text-xs">Or sign up with</p>
        <div className="flex items-center justify-center">
          {providers && (
            <>
              <div
                key={providers.google.name}
                className="mx-4 my-2 transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
              >
                <button onClick={() => signIn(providers.google.id)}>
                  {providers.google.name}
                </button>
              </div>
              <div
                key={providers.github.name}
                className="mx-4 my-2 transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
              >
                <button onClick={() => signIn(providers.github.id)}>
                  {providers.github.name}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Login for existing Users */}
        <p className="text-center text-gray-500 text-xs mt-4">
          Already have an account?
          <Link
            href="/signin"
            className="text-[#B70808] text-opacity-80 hover:text-[#B70808] text-opacity-60"
          >
            Log In
          </Link>
        </p>
      </div>

      {/* creating a loading spinner */}
      {loading && (
        <div className="flex justify-center items-center">
          <div className="spinner spinner-lg text-red-500"></div>
        </div>
      )}

      {/* Showing an error message */}
      {status != "" && (
        <div className="absolute top-0 centre-0 mt-2 mr-2">
          <div className="relative p-3 bg-[#B70808] rounded-md text-white">
            <div className="absolute inset-y-0 left-0 flex items-center">
              <svg
                className="h-5 w-5 text-[#B70808]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium leading-5">{status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

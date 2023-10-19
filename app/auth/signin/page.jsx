"use client";
import { useEffect, useState } from "react";
import { signIn, getProviders, useSession } from "next-auth/react";
import Image from "next/image";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [providers, setProviders] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);
  //console.log(providers);

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side email validation
    if (!validateEmail(email)) {
      setErrorMessage("Invalid email address");
      return;
    }

    // Perform sign-in using the email provider
    const result = await signIn("email", {
      email,
    });

    if (result.error) {
      // Handle sign-in error (e.g., display error message).
      setErrorMessage(result.error);
    }
  };

  return (
    <div className="form_container">
      <h1 className="form_title">Sign In</h1>
      {providers &&
        Object.values(providers).map((provider) => {
          return provider.id === "email" ? (
            <>
              <form onSubmit={handleSubmit} className="w-[90%] mt-4">
                <label className="form_label">
                  Email
                  <input
                    type="email"
                    value={email}
                    placeholder="janedoe@gmail.com"
                    className="form_input"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                {errorMessage && (
                  <div className="text-center text-red-500 text-sm">
                    {errorMessage}
                  </div>
                )}
                <button type="submit" className="form_input form_btn">
                  Sign In With Email
                </button>
              </form>
            </>
          ) : (
            <button
              type="button"
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className="next-auth-provider-name-google"
            >
              <Image
                src="/assets/images/google.svg"
                width={27}
                height={27}
                className="rounded-full"
                alt={provider.id}
              />
              <span className="oauth_text">Sign in with {provider.id}</span>
            </button>
          );
        })}
    </div>
  );
}

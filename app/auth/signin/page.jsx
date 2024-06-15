"use client";
import { useEffect, useState } from "react";
import { signIn, getProviders } from "next-auth/react";
import Image from "next/image";
import Spinner from "@components/Spinner";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const SignIn = () => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format.")
      .required("Email is required."),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);
  const onSubmit = async (data) => {
    const email = data.email;
    const result = await signIn("email", {
      email,
    });
    if (result.error) {
      setErrorMessage(result.error);
    }
  };
  if (providers != null) {
    return (
      <div className="form_container">
        <h1 className="form_title">Sign In</h1>
        {providers &&
          Object.values(providers).map((provider) => {
            return provider.id === "email" ? (
              <>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-[90%] mt-4"
                >
                  <label className="form_label">Email</label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          className="form_input"
                          placeholder="janedoe@gmail.com"
                          {...field}
                        />
                        {errors.email && isDirty && (
                          <div className="text-center text-red-500 text-sm">
                            {errors.email.message}
                          </div>
                        )}
                      </>
                    )}
                  />

                  <button type="submit" className="form_input form_btn">
                    Sign In With Email
                  </button>
                </form>
              </>
            ) : (
              <button
                type="button"
                key={provider.id}
                onClick={() => signIn(provider.id)}
                className="next-auth-provider-name-google"
              >
                <Image
                  src={
                    provider.id === "google"
                      ? "/assets/images/google.svg"
                      : "/assets/images/github.png"
                  }
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
  } else {
    return <Spinner />;
  }
};

export default SignIn;

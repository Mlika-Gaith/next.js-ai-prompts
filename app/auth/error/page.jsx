"use client";
import { useSearchParams } from "next/navigation";

function CustomAuthError({ params }) {
  const searchParams = useSearchParams();

  const search = searchParams.get("error");
  const errors = {
    Configuration: {
      error: "Something's not right with the server configuration.",
      explanation:
        "This error typically occurs when there's an issue with how the server is set up.",
    },
    AccessDenied: {
      error: "Access has been restricted.",
      explanation:
        "This error often happens when you're not allowed to access a certain resource. It might be due to a restriction set up in the sign-in or redirect process.",
    },
    Verification: {
      error: "Email Verification Problem",
      explanation:
        "This error is related to email verification. It could mean that the email verification token has expired or has already been used. You might need to request a new verification email.",
    },
    Default: {
      error: "Oops, something went wrong. Please try again later",
    },
  };
  console.log(errors[search].error);

  return (
    <div className="w-full max-h-full flex items.center flex-col">
      <h1 className=" text-3xl font-medium mt-6">{errors[search]?.error}</h1>
      <p className="desc text-justify">{errors[search]?.explanation}</p>
    </div>
  );
}

export default CustomAuthError;

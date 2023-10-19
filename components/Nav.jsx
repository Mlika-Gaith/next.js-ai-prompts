"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  //console.log(session?.user);

  return (
    <nav className="flex-between w-full mb-16 pt-5">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo-text.svg"
          alt="ai-prompts logo"
          width={120}
          height={120}
          className="object-contain"
        />
      </Link>
      {/** Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="indigo_btn">
              Create Prompt
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign out
            </button>
            <Link href="/profile">
              <Image
                src={
                  session?.user.image && session.user.image != ""
                    ? session.user.image
                    : "/assets/images/profile.png"
                }
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <Link href="/auth/signin" className="indigo_btn w-40">
            Sign in
          </Link>
        )}
      </div>
      {/** Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/auth/signin" className="indigo_btn w-40">
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;

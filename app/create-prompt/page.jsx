"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, redirect } from "next/navigation";

import Form from "@components/Form";
import Spinner from "@components/Spinner";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
      if (response.ok) router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (status != "authenticated") return <Spinner />;
  else {
    return (
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={isSubmitting}
        handleSubmit={createPrompt}
      />
    );
  }
};

export default CreatePrompt;
CreatePrompt.auth = true;

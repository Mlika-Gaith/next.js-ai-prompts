"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import Spinner from "@components/Spinner";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isFetching, setIsFetching] = useState(true);
  const [myPosts, setMyPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setMyPosts(data);
    };
    if (session?.user.id) {
      fetchPosts();
      setIsFetching(false);
    }
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt ?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = myPosts.filter((item) => item._id !== post._id);
        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (isFetching) return <Spinner />;
  else
    return (
      <Profile
        name="Your Profile"
        desc="Greetings! this is your profile, feel free to showcase your outstanding prompts and ignite the creative spark in others with the boundless potential of your imagination."
        data={myPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    );
};

export default MyProfile;

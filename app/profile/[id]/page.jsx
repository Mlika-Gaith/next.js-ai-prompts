"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";
import Spinner from "@components/Spinner";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("name");
  const [isFetching, setIsFetching] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts}`);
      const data = await response.json();
      setUserPosts(data);
    };
    if (params?.id) {
      fetchPosts();
      setIsFetching(false);
    }
  }, [params.id]);
  if (isFetching) return <Spinner />;
  else
    return (
      <Profile
        name={`${username}'s profile`}
        desc={`Welcome to ${username}'s profile page. Here you will find all of his shared AI prompts.`}
        data={userPosts}
      />
    );
};

export default UserProfile;

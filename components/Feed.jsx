"use client";
import { useState, useEffect, useRef } from "react";
import Card from "./Card";
import Spinner from "./Spinner";

const CardsList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return (
          <Card key={post._id} post={post} handleTagClick={handleTagClick} />
        );
      })}
    </div>
  );
};

const Feed = ({ containerRef }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  // Limit Number of displayed Posts
  const [visiblePosts, setVisiblePosts] = useState([]);
  const isFetchingMore = useRef(false);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setAllPosts(data);
    setVisiblePosts(data.slice(0, Math.min(10, data.length)));
  };
  useEffect(() => {
    fetchPosts();
    setIsFetching(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        !isFetchingMore.current &&
        containerRef.current &&
        containerRef.current.getBoundingClientRect().bottom <=
          window.innerHeight + 10 // this for precision cause containerRef is always a little bigger than the window height
      ) {
        isFetchingMore.current = true;
        loadMorePosts();
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visiblePosts.length]);

  const filterPrompts = (searchText) => {
    // case should be ignored while matching string
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const loadMorePosts = () => {
    // Calculate the range of posts to load
    const startIndex = visiblePosts.length;

    // Check if there are more posts to load
    if (startIndex < allPosts.length) {
      // Calculate the actual number of posts to load
      const numPostsToLoad = Math.min(10, allPosts.length - startIndex);

      // Use slice to get the new posts and update the visiblePosts count
      const newPosts = allPosts.slice(startIndex, startIndex + numPostsToLoad);

      // Update the visiblePosts count and append the new posts to the existing ones
      setVisiblePosts((prevVisiblePosts) => [...prevVisiblePosts, ...newPosts]);
    }

    // Set isFetchingMore to false after loading
    isFetchingMore.current = false;
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  if (isFetching) {
    return <Spinner />;
  } else {
    return (
      <section className="feed" ref={containerRef}>
        <form className="relative w-full flex-center">
          <input
            type="text"
            placeholder="Search for a tag or a username"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="form_input"
          />
        </form>
        {searchText ? (
          <CardsList data={searchedResults} handleTagClick={handleTagClick} />
        ) : (
          <CardsList data={visiblePosts} handleTagClick={handleTagClick} />
        )}
      </section>
    );
  }
};

export default Feed;

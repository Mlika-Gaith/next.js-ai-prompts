"use client";
import { useState, useEffect } from "react";
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

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setAllPosts(data);
  };
  useEffect(() => {
    fetchPosts();
    setIsFetching(false);
  }, []);

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

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
    //console.log(searchedResults);
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
      <section className="feed">
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
          <CardsList data={allPosts} handleTagClick={handleTagClick} />
        )}
      </section>
    );
  }
};

export default Feed;

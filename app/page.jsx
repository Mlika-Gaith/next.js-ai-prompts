import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover and Share
        <br className="max-md:hidden" />
        <span className="indigo_gradient text-center"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        AI Prompts: Your hub for creative inspiration. Discover, create, and
        share with ease Ai prompts.
      </p>
      {/* Feed */}
      <Feed />
    </section>
  );
};

export default Home;

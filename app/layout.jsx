import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Ai Prompts",
  description: "Discover and share AI Prompts.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main" />
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;

import "@styles/globals.css";
import React from "react";

export const metadata = {
  title: "Ai Prompts",
  description: "Discover and share AI Prompts.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main" />
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;

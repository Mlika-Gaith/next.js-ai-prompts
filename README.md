# AI Prompt Sharing App with Authentication

This is a web application built with Next.js that allows users to authenticate using email, Google, or GitHub providers. Users can also share AI prompts with the community.

## Main Features

- **Authentication**: Users can sign up and log in using their email, Google, or GitHub accounts.
- **AI Prompt Sharing**: Authenticated users can create and share AI prompts with others.
- **AI Prompts Search**: You can search prompts by tags, usernames, or specific prompt content, making it simple to discover the content you're interested in.

## How to Use

To get started with this project, clone the repository to your local machine:

```bash
git clone https://github.com/Mlika-Gaith/next.js-ai-prompts.git
```

You need to set up environment variables for the application. Create a .env.local file in the project root directory and add the following variables:

```plaintext
GOOGLE_ID=
GOOGLE_SECRET=
GITHUB_ID=
GITHUB_SECRET=
EMAIL_SERVER=
EMAIL_FROM=
MONGODB_URI=
NEXTAUTH_URL=
NEXTAUTH_URL_INTERNAL=
NEXTAUTH_SECRET=

```

Generate your NEXt_AUTH_SECRET using:

```bash
openssl rand -base64 32
```

If you're unsure about where to obtain Google and GitHub client IDs and secrets, you can find the necessary information through these helpful links:

- **Google**: [Get Google API Client ID](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid)
- **GitHub**: [Building OAuth Apps - Authenticating to the REST API with an OAuth App](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authenticating-to-the-rest-api-with-an-oauth-app)

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The app should be running at [http://localhost:3000](http://localhost:3000).

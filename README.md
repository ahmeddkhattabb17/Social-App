# Social App

A responsive social media application built with React, TypeScript, Vite, Tailwind CSS, HeroUI, and the Route Posts API.

## Overview

Social App lets users register, log in, browse a feed, create and manage posts, interact with posts, write comments, view profile content, receive notifications, and update account settings.

## Features

- User authentication with login and registration
- Feed pagination with remote posts
- Create, edit, and delete posts
- Upload post and comment images
- Like, share, and bookmark post actions
- Post details page with comments
- Create, edit, and delete comments
- Profile page with user stats and personal posts
- Notifications page with read/unread states
- Password change form
- Organized API service layer by feature
- Reusable UI components and page-based structure

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- HeroUI
- Lucide React icons
- Route Posts API

## Project Structure

```text
src/
  assets/
  Components/
  Pages/
  services/
    auth/
    comments/
    core/
    notifications/
    posts/
    profile/
    settings/
  App.tsx
  SocialApp.tsx
  constants.ts
  types.ts
  utils.ts
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Deployment

The production build is generated in the `dist` folder:

```bash
npm run build
```

Upload the contents of `dist` to your hosting provider.

## API

This project uses the Route Posts API:

```text
https://route-posts.routemisr.com
```

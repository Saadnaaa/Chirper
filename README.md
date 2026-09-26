# Chirper

Chirper is a microblogging app built with Next.js. Users can post, follow accounts, browse Following and For You feeds, and interact through likes, reposts, comments, and notifications. Profiles support editable details and images. The interface includes Dark, Light, Valentine, Dim, Cupcake, and Dracula themes.

## Setup

Requirements: Node.js, npm, and a MongoDB database. Cloudinary credentials are needed for profile and post image uploads.

1. Install dependencies: `npm install`
2. Create `.env.local` in the project root:

```env
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

3. Start the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) and register an account.

## Scripts

- `npm run dev` starts the development server.
- `npm run lint` runs ESLint.
- `npm run build` creates a production build.
- `npm start` serves the production build.

## Stack

Next.js App Router, React, MongoDB with Mongoose, Tailwind CSS, DaisyUI, and Cloudinary.

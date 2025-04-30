This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Web Article Management
A simple web application to manage articles with role-based access. This project allows users to view and read articles, while admins have full control to create, edit, and delete articles.

✨ Features
📰 View and read articles (User)

✍️ Add, edit, and delete articles (Admin only)

👥 Role-based access (User & Admin)

🌐 Responsive UI using Tailwind CSS

🚀 Tech Stack
Next.js 15

TypeScript

Tailwind CSS

📦 Installation
Clone this repository and install the dependencies:

bash
Copy
Edit
git clone https://github.com/username/repo-name.git
cd repo-name
npm install
npm run dev
🔐 Environment Variables
Buat file .env.local dan isi:

env
Copy
Edit
NEXT_PUBLIC_API_URL=your-api-url-here
⚠️ NEXT_PUBLIC_API_URL adalah variabel environment yang dapat diakses publik dari browser, jadi pastikan backend kamu tetap aman walaupun ini terbuka.

🌍 Live Demo
https://tes-fe-fikriif.vercel.app/

👤 Author
Fikri Ibnu Fajar



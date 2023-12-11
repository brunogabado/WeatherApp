This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This website for the final project of the course is a weather app where you can search the forecast for 5 days with a 3-hour gap for any city. You can also do some comparisons between the city chosen by you and a list of cities also created by you.

Landing page : The page where the user lands when opening the link to the website. On this page, there will be a small introduction to what the app can do. Will have a search bar for the user to search for a city and get the forecast for 5 days in a gap of 3 hours.

Home page: To use the features on this page, the user needs to be logged in. When logged in, the user will have a search bar to add cities to a list (with a max of 4 cities) and an option to delete any of the cities inside it. Then there will be another search bar to change the user's city, which will be compared with all the cities inside the list. There will also be an opportunity to pick the date of the comparison. Below these inputs for the user, there will be some information for the user about the comparison, and at the end, in case we have a user city and a non-empty list, we will have tables with the comparisons



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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

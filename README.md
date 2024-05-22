This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Definitions
  ### LRU (Least Recently Used):
  It is a caching algorithm removes the least recently accessed item when the cache reaches its limit. This means that the item that has not been used for the longest period of time will be evicted first. 
  ### LFU (Least Frequency Used):
  It is a caching algorithm that keeps track of how often items are accessed and evicts the item with the lowest access frequency when the cache reaches its capacity. This algorithm is useful in scenarios where items that are frequently accessed are more likely to be reused, and thus should be kept in the cache.

   This caching strategy can help to reduce API calls in an image gallery application by storing recently fetched data in memory, so it can be quickly retrieved without needing to make 
  additional API requests. 
## System Design
![diagram-export-5-22-2024-12_00_42-AM](https://github.com/shivam12k/ImageGallary/assets/63141401/c70e0246-6a32-4267-b3ef-5fa28a185aa4)



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

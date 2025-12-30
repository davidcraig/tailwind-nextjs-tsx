Tailwind TSX components for NextJS

Components:
- Card
- ExternalLink (Adds rel="noopener noreferrer", has external link icon with style prop)



# Installation

    bunx jsr add @davidcraig/tailwind-nextjs-tsx
  
## tailwind.config.js:

Add the following:

    content: [
      ...
      "./node_modules/@davidcraig/**/*.tsx",
    ]

## next.config.js:

Add:

    const nextConfig = {
      ...
      transpilePackages: ["@davidcraig/tailwind-nextjs-tsx"],
    }

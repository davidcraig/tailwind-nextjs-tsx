Tailwind TSX components for NextJS

Components:
- Card
- ExternalLink (Adds rel="noopener noreferrer", has external link icon with style prop)



# Installation

    bunx jsr add @davidcraig/tailwind-nextjs-tsx
  
tailwind.config.js:

Add the following to your tailwind.config.js file:

    content: [
      ...
      "./node_modules/@davidcraig/**/*.tsx",
    ]

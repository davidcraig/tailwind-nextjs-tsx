Tailwind TSX components for NextJS

Components:
- Card
- ExternalLink (Adds rel="noopener noreferrer", has external link icon with style prop)
- Navbar


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


# Card

# ExternalLink

# Navbar

TSX
    import { Navbar } from "@davidcraig/tailwind-nextjs-tsx";

    return (
      <Navbar
        brand={brand}
        Link={Link}
        useState={useState}
        pages={...pages}
      />
    
Pages can be single items.

    const pages = [
      { name: "Crafting", href: "/crafting" },
      { name: "Professions", href: "/professions" },
      { name: "Roster", href: "/roster" },
    ];
  
Pages can also have dropdowns.

    const pages = [
    ...
    {
        name: "War Within",
        pages: [
          {
            name: "Raids",
            pages: [
              { name: "Nerub-ar Palace", href: "/warwithin/raid/nerubarpalace" },
              { name: "Manaforge Omega", href: "/warwithin/raid/manaforge" },
            ],
          },
        ],
      }
    ]

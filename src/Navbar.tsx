import React from "react";

interface PageLink {
  name: string;
  href: string;
  className?: string;
}

interface DropdownLink {
  name: string;
  pages: NavbarItem[];
}

export type NavbarItem = PageLink | DropdownLink;

interface DetailsLinkProps {
  id: string;
  title: string;
  children: React.ReactNode;
  depth: number;
  openByDepth: Record<number, string>;
  setOpenByDepth: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  className?: string;
}

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  title?: string;
}

const DetailsLink = ({
  id,
  title,
  children,
  depth,
  openByDepth,
  setOpenByDepth,
  className,
}: DetailsLinkProps) => {
  const isOpen = openByDepth[depth] === id;
  const handleToggle = (e: any) => {
    const el = e.currentTarget;
    setOpenByDepth((prev) => {
      const next = { ...prev };
      if (el.open) {
        next[depth] = id;
        // close deeper levels when opening a new branch at this depth
        Object.keys(next).forEach((k: any) => {
          if (Number(k) > depth) delete next[k];
        });
      } else {
        if (next[depth] === id) delete next[depth];
        Object.keys(next).forEach((k: any) => {
          if (Number(k) > depth) delete next[k];
        });
      }
      return next;
    });
  };
  return (
    <details
      key={id}
      className={`navbar-item nav-details nav-depth-${depth} ${className}`}
      open={isOpen}
      onToggle={handleToggle}
    >
      <summary className="navbar-link">{title}</summary>
      <div className="navbar-dropdown">{children}</div>
    </details>
  );
};

function renderNavigationItem(
  item: any,
  onNavigate: any,
  openByDepth: any,
  setOpenByDepth: any,
  Link: React.FC<LinkProps>,
  detailsClassName: string = "",
  depth = 0,
) {
  if ("pages" in item) {
    return (
      <DetailsLink
        key={item.name}
        className={detailsClassName}
        id={item.name}
        title={item.name}
        depth={depth}
        openByDepth={openByDepth}
        setOpenByDepth={setOpenByDepth}
      >
        {item.pages.map((dropdownPage: NavbarItem) => {
          return renderNavigationItem(
            dropdownPage,
            onNavigate,
            openByDepth,
            setOpenByDepth,
            Link,
            detailsClassName,
            depth + 1,
          );
        })}
      </DetailsLink>
    );
  }
  return (
    <Link
      className={item.className ? `${item.className} navbar-link` : "navbar-link"}
      key={item.href}
      title={item.name}
      href={item.href}
      onClick={onNavigate}
    >
      {item.name}
    </Link>
  );
}

interface NavigationProps {
  brand: string;
  pages: NavbarItem[];
  Link: React.FC;
  useState: Function;
  className?: string;
  detailsClassName?: string;
  children?: React.ReactNode;
}

export default function Navigation({
  brand,
  pages,
  Link,
  useState,
  className = "navbar p-4 flex flex-col gap-4 md:flex-row",
  detailsClassName = "",
  children,
}: NavigationProps): React.ReactElement {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openByDepth, setOpenByDepth] = useState({});
  return (
    <nav className={className}>
      <div className="flex items-center w-full md:w-auto justify-between md:justify-start">
        <a className="brand font-bold text-xl shrink-0 mr-4" href="/">
          {brand}
        </a>
        <button
          aria-label="Toggle navigation"
          className="navbar-burger md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span>{mobileOpen ? "×" : "☰"}</span>
        </button>
      </div>
      <div
        className={`nav-links mt-4 md:mt-0 w-full gap-4 flex-col md:flex-wrap md:min-w-0 md:max-w-full md:flex-row md:flex md:flex-1 md:ml-auto md:justify-end ${mobileOpen ? "flex" : "hidden"} md:items-center`}
      >
        {pages.map((page) => {
          return renderNavigationItem(
            page,
            () => {
              setMobileOpen(false);
              setOpenByDepth({});
            },
            openByDepth,
            setOpenByDepth,
            Link,
            detailsClassName,
          );
        })}
        {children}
      </div>
    </nav>
  );
}

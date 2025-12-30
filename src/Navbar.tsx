interface PageLink {
  name: string;
  url: string;
}

interface DropdownLink {
  name: string;
  pages?: NavbarItem[];
}

type NavbarItem = PageLink | DropdownLink;

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
      className={`navbar-item ml-4 nav-details nav-depth-${depth} ${className}`}
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
  depth = 0,
) {
  if (item.pages) {
    return (
      <DetailsLink
        key={item.name}
        className="pr-2 mr-4 ml-4"
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
            depth + 1,
          );
        })}
      </DetailsLink>
    );
  }
  let itemCssClass = item.cssClass || "";
  return (
    <Link
      className={itemCssClass}
      key={item.slug}
      title={item.name}
      href={item.slug}
      onClick={onNavigate}
    >
      {item.name}
    </Link>
  );
}

interface NavigationProps {
  brand: string;
  className?: string;
  pages: NavbarItem[];
  Link: React.FC;
  useState: Function;
}

export default function Navigation({
  className,
  Link,
  pages,
  brand,
  useState,
}: NavigationProps): React.ReactElement {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openByDepth, setOpenByDepth] = useState({});
  return (
    <nav className={`navbar p-4 flex flex-col gap-4 md:flex-row ${className}`}>
      <div className="flex items-center w-full md:w-auto justify-between md:justify-start">
        <a className="brand font-bold text-xl shrink-0 mr-4" href="/">
          {brand}
        </a>
        <button
          aria-label="Toggle navigation"
          className="navbar-burger md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span>☰</span>
        </button>
      </div>
      <div
        className={`nav-links w-full gap-4 md:flex-1 md:ml-auto md:justify-end md:items-center text-center ${mobileOpen ? "is-open" : ""}`}
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
          );
        })}
      </div>
    </nav>
  );
}

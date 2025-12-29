const DetailsLink = ({
  id,
  title,
  children,
  depth,
  openByDepth,
  setOpenByDepth,
}) => {
  const isOpen = openByDepth[depth] === id;
  const handleToggle = (e) => {
    const el = e.currentTarget;
    setOpenByDepth((prev) => {
      const next = { ...prev };
      if (el.open) {
        next[depth] = id;
        // close deeper levels when opening a new branch at this depth
        Object.keys(next).forEach((k) => {
          if (Number(k) > depth) delete next[k];
        });
      } else {
        if (next[depth] === id) delete next[depth];
        Object.keys(next).forEach((k) => {
          if (Number(k) > depth) delete next[k];
        });
      }
      return next;
    });
  };
  return (
    <details
      key={id}
      className={`navbar-item ml-4 nav-details nav-depth-${depth}`}
      open={isOpen}
      onToggle={handleToggle}
    >
      <summary className="navbar-link">{title}</summary>
      <div className="navbar-dropdown">{children}</div>
    </details>
  );
};

function renderNavigationItem(
  item,
  onNavigate,
  openByDepth,
  setOpenByDepth,
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
        {item.pages.map((dropdownPage) => {
          return renderNavigationItem(
            dropdownPage,
            onNavigate,
            openByDepth,
            setOpenByDepth,
            depth + 1,
          );
        })}
      </DetailsLink>
    );
  }
  let itemCssClass = "";
  if (item.wowClassColour) {
    itemCssClass = item.slug.replace("/classes/", "");
  }
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

const externalLink = (href, title) => {
  return (
    <a
      key={href}
      className="ml-4 p-4 md:p-0 flex"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {title}{" "}
      <span style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
        {externalLinkSvg}
      </span>
    </a>
  );
};

export default function Navigation(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openByDepth, setOpenByDepth] = useState({});
  return (
    <nav
      className={`navbar p-4 flex flex-col gap-4 md:flex-row ${props.className}`}
    >
      <div className="flex items-center w-full md:w-auto justify-between md:justify-start">
        <a className="brand font-bold text-xl shrink-0 mr-4" href="/">
          &lt;Not Safe for Azeroth&gt;
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
        {wikiPages.map((page) => {
          return renderNavigationItem(
            page,
            () => {
              setMobileOpen(false);
              setOpenByDepth({});
            },
            openByDepth,
            setOpenByDepth,
          );
        })}
        {pages.map((page) => {
          return renderNavigationItem(
            page,
            () => {
              setMobileOpen(false);
              setOpenByDepth({});
            },
            openByDepth,
            setOpenByDepth,
          );
        })}
      </div>
    </nav>
  );
}

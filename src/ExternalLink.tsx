import React from "react";

const externalLinkSvg = (size: number = 20, style?: React.CSSProperties): React.ReactElement => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path
      fill={style?.fill || "#ececec"}
      d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"
    />
  </svg>
);

interface ExternalLinkProps {
  href: string;
  title: string;
  externalLinkSpanStyle?: React.CSSProperties;
  externalLinkSize?: number;
  externalLinkStyle?: React.CSSProperties;
  className?: string;
  showSvg?: boolean;
}

const ExternalLink = ({
  href,
  title,
  externalLinkSpanStyle = {
    marginLeft: "0.5rem",
    marginRight: "0.5rem",
  },
  className = "ml-4 p-4 md:p-0 flex",
  externalLinkSize = 20,
  externalLinkStyle = {},
  showSvg = true,
}: ExternalLinkProps): React.ReactElement => {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {title} {showSvg && <span style={externalLinkSpanStyle}>{externalLinkSvg(externalLinkSize, externalLinkStyle)}</span>}
    </a>
  );
};

export default ExternalLink;

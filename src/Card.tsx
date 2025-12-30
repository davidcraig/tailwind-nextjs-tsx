interface CardProps {
  title: string;
  children?: any;
  className?: string; // Card overall class
  headerStyle?: React.CSSProperties;
  headerClassName?: string;
}

const Card = ({
  title,
  children,
  className,
  headerClassName,
  headerStyle,
}: CardProps): React.ReactElement => {
  return (
    <div className={`card ${className}`}>
      <div className="card-meta"></div>
      <div className={`card-header ${headerClassName}`} style={headerStyle}>
        <div className="card-header-title">{title}</div>
      </div>
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;

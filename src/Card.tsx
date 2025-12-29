interface CardProps {
  title: string;
  children: any;
  headerStyle?: React.CSSProperties;
  headerClassName?: string;
}

const Card = ({
  title,
  children,
  headerClassName,
  headerStyle,
}: CardProps): JSX.Element => {
  return (
    <div className="card">
      <div className="card-meta"></div>
      <div className={`card-header ${headerClassName}`} style={headerStyle}>
        <div className="card-header-title">{title}</div>
      </div>
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;

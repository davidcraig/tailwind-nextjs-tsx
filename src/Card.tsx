interface CardProps {
  title: string;
  children: any;
  cardClassName?: string;
  headerStyle?: React.CSSProperties;
  headerClassName?: string;
}

const Card = ({
  title,
  children,
  cardClassName,
  headerClassName,
  headerStyle,
}: CardProps): JSX.Element => {
  return (
    <div className={`card ${cardClassName}`}>
      <div className="card-meta"></div>
      <div className={`card-header ${headerClassName}`} style={headerStyle}>
        <div className="card-header-title">{title}</div>
      </div>
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;

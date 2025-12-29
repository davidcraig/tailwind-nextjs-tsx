const Card = ({ title, children }) => {
  return (
    <div className="card">
      <div className="card-meta"></div>
      <div className="card-header">
        <div className="card-header-title">{title}</div>
      </div>
      <div className="card-content">{children}</div>
    </div>
  );
};

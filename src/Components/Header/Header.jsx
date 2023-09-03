import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <div className="icon">🎮</div>
        <h1 className="heading">Rock-Paper-Scissors</h1>
      </div>
      <div className="header-right">
        <div className="header-right_links">
          <div>Leader Board</div>
          <div>Play</div>
        </div>
        <div className="header-right_user">Welcome Arun!</div>
      </div>
    </div>
  );
};

export default Header;

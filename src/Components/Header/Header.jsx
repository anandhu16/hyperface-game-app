import { useEffect, useState } from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";
import podium from "../../assets/images/podium.png"
import play from "../../assets/images/play.png"

const Header = () => {
  const [name, setName] = useState();
  let queue = new BroadcastChannel("login");
  const navigate = useNavigate();

  queue.addEventListener("message", (e) => {
    if (e.data === "change") {
      setName(sessionStorage.getItem("user"));
    }
  });
  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setName(sessionStorage.getItem("user"));
    }
  });
  return (
    <div className="main-header-container">
      <div className="header">
        <div className="header-left">
          <div className="icon">🎮</div>
          <h1 className="heading">Rock-Paper-Scissors</h1>
        </div>
        {name && (
          <div className="header-right">
            <div className="header-right_links">
              <img
                onClick={() => navigate("/leaderBoard")}
                className="leader-board"
                src={podium}
                alt=""
              ></img>
              <img className="play" src={play} alt=""></img>
            </div>
            <div className="header-right_user">{`Hello ${name}! 👋🏼`}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

import { useEffect, useState } from "react";
import "./leaderboard.css";

const LeaderBoard = () => {
  // const userData = [
  //   {
  //     userName: "anandhu1",
  //     win: 5,
  //     loss: 3,
  //   },
  //   {
  //     userName: "anandhu2",
  //     win: 7,
  //     loss: 3,
  //   },
  //   {
  //     userName: "anandhu3",
  //     win: 3,
  //     loss: 3,
  //   },
  //   {
  //     userName: "anandhu4",
  //     win: 2,
  //     loss: 3,
  //   },
  // ];
  const [userData, setUserData] = useState([]);

  const india = [1, 2, 4, 5];
  useEffect(() => {
    setUserData(
      JSON.parse(localStorage.getItem("userDataList")).sort(
        (a, b) => b.WinCount - a.WinCount
      )
    );
  }, []);

  // const userData = JSON.parse(localStorage.getItem("userDataList"));
  // userData.sort((a, b) => b.win - a.win);
  console.log(userData);
  return (
    <div className="leaderboard-container">
      <div className="leaderboard-top3-container">
        <div className="leaderboard-podium">
          {userData[1] && (
            <div className="leaderboard-second">
              <span>🥈</span>
              <span className="podium-text">{userData[1].UserName}</span>
            </div>
          )}
          {userData[0] && (
            <div className="leaderboard-first">
              <span>🥇</span>
              <span className="podium-text">{userData[0].UserName}</span>
            </div>
          )}
          {userData[2] && (
            <div className="leaderboard-third">
              <span>🥉</span>
              <span className="podium-text">{userData[2].UserName}</span>
            </div>
          )}
        </div>
      </div>
      <div className="leaderboard-lower-container">
        {userData.map(
          (user, index) =>
            index > 2 && (
              <div className="leaderboard-item">
                <span>Name {user.UserName}</span>
                <span>Wins {user.WinCount}</span>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default LeaderBoard;

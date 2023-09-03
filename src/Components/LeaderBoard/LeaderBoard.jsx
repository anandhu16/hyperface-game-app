import "./leaderboard.css";

const LeaderBoard = () => {
  const userData = [
    {
      userName: "anandhu1",
      win: 5,
      loss: 3,
    },
    {
      userName: "anandhu2",
      win: 7,
      loss: 3,
    },
    {
      userName: "anandhu3",
      win: 3,
      loss: 3,
    },
    {
      userName: "anandhu4",
      win: 2,
      loss: 3,
    },
  ];

  const india = [1, 2, 4, 5];

  // const userData = JSON.parse(localStorage.getItem("userDataList"));
  userData.sort((a, b) => b.win - a.win);
  console.log(userData);
  return (
    <div className="leaderboard-container">
      <div className="leaderboard-top3-container">
        <div className="leaderboard-podium">
          {userData[1] && <div className="leaderboard-second">f</div>}
          {userData[0] && <div className="leaderboard-first">s</div>}
          {userData[2] && <div className="leaderboard-third">s</div>}
        </div>
      </div>
      <div className="leaderboard-lower-container">
        {userData.map((user, index) => (
          <div>
            {index > 2 && (
              <div>
                <span>{index + 1}</span>
                <span>{user.userName}</span>
                <span>{user.win}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;

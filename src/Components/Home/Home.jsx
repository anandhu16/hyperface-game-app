import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const [queueFull, setQueueFull] = useState();
  const [userQueued, setUSerQueued] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [OpponentName, setOpponentName] = useState();

  const queue = new BroadcastChannel("dcode");
  useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      navigate("/");
    } else {
      setUserName(location.state.userName);
    }
  }, []);

  queue.addEventListener("message", (e) => {
    console.log(e);
    if (e.data !== userName) {
      setOpponentName(e.data);
      console.log(e.data);
      if (userQueued) {
        navigate("/game", {
          state: { userName: userName, OpponentName: OpponentName },
        });
      }
    }
  });

  const handleQueue = () => {
    if (localStorage.getItem("queueList") !== null) {
      const tempQueueList = JSON.parse(localStorage.getItem("queueList"));
      if (tempQueueList.length === 2) {
        setQueueFull(true);
      } else {
        setOpponentName(tempQueueList[0]);
        tempQueueList.push(userName);
        localStorage.setItem("queueList", JSON.stringify(tempQueueList));
        queue.postMessage(userName);
        if (userName && tempQueueList[0]) {
          navigate("/game", {
            state: { userName: userName, OpponentName: OpponentName },
          });
        }
      }
    } else {
      localStorage.setItem("queueList", JSON.stringify([userName]));
      setUSerQueued(true);
      queue.postMessage(userName);
    }
  };

  return (
    <div className="main-container-home">
      <div className="status-text">
        {!queueFull && !userQueued && (
          <p>Click on the Play Button to Start the Game</p>
        )}
        {userQueued && <p>Waiting for Opponent</p>}
        {queueFull && <p>No slots available</p>}
      </div>
      <button
        className="button-home"
        role="button"
        onClick={() => {
          handleQueue();
        }}
        disabled={queueFull}
      >
        Play
      </button>
    </div>
  );
};

export default Home;

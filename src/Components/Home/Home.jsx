import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Redirect } from "react-router-dom";

const Home = () => {
  const [queueFull, setQueueFull] = useState();
  const [queueSize, setQueueSize] = useState();
  const location = useLocation();
  const userName = location.state.userName;
  const [OpponentName, setOpponentName] = useState();

  const queue = new BroadcastChannel("dcode");

  queue.addEventListener("message", (e) => {
    console.log(e);
    if (e.data !== userName) {
      queueSize = queueSize + 1;
      setOpponentName(e.data);
    }
  });

  const handleQueue = () => {
    if (localStorage.getItem("queueList") !== null) {
      const tempQueueList = JSON.parse(localStorage.getItem("queueList"));
      if (tempQueueList.length === 2) {
        setQueueFull(true);
      } else {
        tempQueueList.push(userName);
        setOpponentName(tempQueueList[0]);
        localStorage.setItem("queueList", JSON.stringify(tempQueueList));
        queue.postMessage(userName);
      }
    } else {
      localStorage.setItem("queueList", JSON.stringify([userName]));
      setQueueSize(1);
      queue.postMessage([userName]);
    }
  };

  return (
    <div>
      {!queueFull && <p>Click on the Play Button to Start the Game</p>}
      {queueSize === 1 && <p>Waiting for Opponent</p>}
      {queueFull && <p>No slots available</p>}
      <button
        className="button"
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

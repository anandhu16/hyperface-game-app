import { useEffect, useState } from "react";
import "./game.css";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const navigate = useNavigate();

  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [userPoints, setUserPoints] = useState(0);
  const [computerPoints, setComputerPoints] = useState(0);
  const [turnResult, setTurnResult] = useState(null);
  const [result, setResult] = useState("Let's see who wins");
  const [waiting, setWaiting] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const choiceName = ["rock", "paper", "scissors"];
  const choices = ["🪨", "📄", "✂️"];
  const bc = new BroadcastChannel("game");

  bc.addEventListener("message", (e) => {
    console.log(e.data, "-----------s");
    if (e?.data?.user !== sessionStorage.getItem("user")) {
      console.log(
        sessionStorage.getItem("user"),
        "is user and openent chose",
        e.data.userChoice
      );
      // let opponent = JSON.parse(localStorage.getItem("queueList"))[
      //   1 -
      //     JSON.parse(localStorage.getItem("queueList")).indexof(
      //       sessionStorage.getItem("user")
      //     )
      // ];
      // let opponentChoiceList = JSON.parse(localStorage.getItem(opponent)) || [];
      setComputerChoice(e.data.userChoice);
      // if(userChoice){

      // }
    }
  });

  const handleClick = (value, index) => {
    if (!waiting) {
      console.log("aeaf");
      setUserChoice(choiceName[index]);
      let choiceList =
        JSON.parse(localStorage.getItem(sessionStorage.getItem("user"))) || [];

      choiceList.push(choiceName[index]);
      console.log(choiceList);
      localStorage.setItem(
        sessionStorage.getItem("user"),
        JSON.stringify(choiceList)
      );
      bc.postMessage({
        user: sessionStorage.getItem("user"),
        userChoice: choiceName[index],
      });
    }
    // generateComputerChoice();
  };

  const generateComputerChoice = () => {
    const randomChoice = choiceName[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
  };

  const reset = () => {
    localStorage.removeItem("queueList");
    navigate("/home", { state: { userName: sessionStorage.getItem("user") } });
    window.location.reload();
  };

  useEffect(() => {
    if (userChoice && computerChoice) {
      const comboMoves = userChoice + computerChoice;
      if (userPoints <= 4 && computerPoints <= 4) {
        if (
          comboMoves === "scissorspaper" ||
          comboMoves === "rockscissors" ||
          comboMoves === "paperrock"
        ) {
          // userPoints.current += 1
          const updatedUserPoints = userPoints + 1;
          setUserPoints(updatedUserPoints);
          setTurnResult("User gets the point!");
          if (updatedUserPoints === 5) {
            setResult("User Wins");
            let tempGameMeta = JSON.parse(localStorage.getItem("userDataList"));
            for (let i = 0; i < tempGameMeta.length; i++) {
              if (tempGameMeta[i].UserName === sessionStorage.getItem("user")) {
                tempGameMeta[i].WinCount += 1;
              }
            }

            localStorage.setItem("userDataList", JSON.stringify(tempGameMeta));
            const gameOff = true;
            setGameOver(gameOff);
          }
        }

        if (
          comboMoves === "paperscissors" ||
          comboMoves === "scissorsrock" ||
          comboMoves === "rockpaper"
        ) {
          // computerPoints.current += 1
          const updatedComputerPoints = computerPoints + 1;
          setComputerPoints(updatedComputerPoints);
          setTurnResult("Oponent gets the point!");
          if (updatedComputerPoints === 5) {
            setResult("Oponent Wins");
            const gameOff = true;
            setGameOver(gameOff);
          }
        }

        if (
          comboMoves === "paperpaper" ||
          comboMoves === "rockrock" ||
          comboMoves === "scissorsscissors"
        ) {
          setTurnResult("No one gets a point!");
        }
      }
      setWaiting(true);
      setTimeout(() => {
        setComputerChoice("");
        setUserChoice("");
        setWaiting(false);
      }, [2000]);
    }
  }, [computerChoice, userChoice]);

  return (
    <div className="Game">
      <div className="score">
        <h1>User Points: {userPoints}</h1>
        <h1>Oponent Points: {computerPoints}</h1>
      </div>

      <div className="choice">
        <div className="choice-user">
          {userChoice ? (
            <img
              className="user-hand"
              src={`../images/${userChoice}.png`}
              alt=""
            ></img>
          ) : (
            <div className="shake-game">
              <img
                className="user-hand"
                src={`../images/rock.png`}
                alt=""
              ></img>{" "}
            </div>
          )}
        </div>
        <div className="choice-computer">
          {computerChoice && userChoice ? (
            <img
              className="computer-hand"
              src={`../images/${computerChoice}.png`}
              alt=""
            ></img>
          ) : (
            <div className="shake-game">
              <img
                className="computer-hand"
                src={`../images/rock.png`}
                alt=""
              ></img>{" "}
            </div>
          )}
        </div>
      </div>

      <div className="button-div">
        {choices.map((choice, index) => (
          <button
            className="button"
            key={index}
            onClick={() => handleClick(choice, index)}
            disabled={gameOver}
          >
            {choice}
          </button>
        ))}
      </div>

      <div className="result">
        <h1>Turn Result: {turnResult}</h1>
        <h1>Final Result: {result}</h1>
      </div>

      <div className="button-div">
        {gameOver && (
          <button className="button" onClick={() => reset()}>
            End Game?
          </button>
        )}
      </div>
    </div>
  );
};

export default Game;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState();

  const handleLogin = () => {
    if (localStorage.getItem("userList") !== null) {
      const tempUserList = JSON.parse(localStorage.getItem("userList"));
      const tempUserData = JSON.parse(localStorage.getItem("userDataList"));

      if (!tempUserList.includes(userName)) {
        tempUserList.push(userName);
        tempUserData.push({
          UserName: userName,
          WinCount: 0,
          LostCount: 0,
        });
        localStorage.setItem("userList", JSON.stringify(tempUserList));
        localStorage.setItem("userDataList", JSON.stringify(tempUserData));
      }
    } else {
      localStorage.setItem("userList", JSON.stringify([userName]));
      localStorage.setItem(
        "userDataList",
        JSON.stringify([
          {
            UserName: userName,
            WinCount: 0,
            LostCount: 0,
          },
        ])
      );
    }
    navigate("/home", { state: { userName: userName } });
  };

  return (
    <div className="container">
      <div className="form-box">
        <div className="form-content">
          <form>
            <div className="">
              <div className="">
                <span className="">
                  <i class="fa fa-user-circle" style={{ color: "white" }}></i>
                </span>
              </div>
              <input
                type="text"
                className=""
                placeholder="Username"
                value={userName}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
            </div>

            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={() => {
                handleLogin();
              }}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

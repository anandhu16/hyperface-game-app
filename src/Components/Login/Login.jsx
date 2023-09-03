import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const login = new BroadcastChannel("login");

  const handleLogin = () => {
    sessionStorage.setItem("user", userName);
    login.postMessage("change");
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
            <div className="login-top">
              <div className="login-icon-container">
                <i className="fa fa-user-circle" style={{ color: "white" }}></i>
              </div>
              <div className="form__group field">
                <input
                  type="input"
                  className="form__field"
                  placeholder="Name"
                  name="name"
                  id="name"
                  value={userName}
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                  required
                />
                <label for="name" className="form__label">
                  Name
                </label>
              </div>
            </div>
          </form>
        </div>
        <div className="button-login-div">
          <button
            type="button"
            className="button-34"
            role="button"
            onClick={() => {
              handleLogin();
            }}
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

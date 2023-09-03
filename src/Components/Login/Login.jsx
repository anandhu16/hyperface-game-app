import "./login.css";

const Login = () => {
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
              <input type="text" className="" placeholder="Username" />
            </div>

            <button type="button" className="btn btn-secondary btn-block">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

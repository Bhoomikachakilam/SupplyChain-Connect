import Login from "../components/login";
import "../css/login.css";
import loginSvg from "../svgs/login.svg";
import Navbar from "../components/Navbar";
function Loginpage() {
  return (
    <>
      <Navbar link={"/register"} name={ "Register" }/>
      <div className="login">
        <div className="login-container">
          <img className="loginsvg" src={loginSvg} alt="Login Svg" />
          <div className="form-container"><Login /> </div>
        </div>
      </div>
    </>
  );
}
export default Loginpage;

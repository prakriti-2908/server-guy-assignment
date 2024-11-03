import { useNavigate } from "react-router-dom";
import { useName } from "./context/NameContext";
import "./styles/LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { updateName } = useName();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    updateName(name);
    navigate("/dashboard");
  };

  return (
    <div className="center">
      <div className="login-page common-bg">
        <h1>LOGIN</h1>
        <div className="center">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

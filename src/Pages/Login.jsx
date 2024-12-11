import { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "../style/login.css";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import facebook from "../assets/facebook.png";
import whatsapp from "../assets/icon-whatsapp.png";
import instagram from "../assets/instagram.png";
import telegram from "../assets/icon-telegram.png";
import { useAuthContext } from "../context/AuthContext";
import { Toast } from "primereact/toast";
import useErrorHandler from "../Helpers/useErrorHandler";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

const Login = () => {
  const toast = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { error, success } = useSelector((state) => state.error);
  const handleErrors = useErrorHandler(error, success);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const { login } = useAuthContext();

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    login({ email, password });
  };

  useEffect(() => {
    handleErrors(toast.current);
  }, [error, success]);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  return (
    <>
      <Toast ref={toast} />
      <div className="containerLogin">
        <div className="login-container">
          <img src={logo} width={160} alt="logo" />
          <p style={{ fontWeight: 500 }}>
            ¿No tienes una cuenta?{" "}
            <Link
              style={{
                color: "#2f73f1",
                cursor: "pointer",
                textDecoration: "none",
              }}
              to="/register-sellers"
            >
              Registrate
            </Link>
          </p>
          <form onSubmit={handleSubmit}>
            <label>Correo electrónico</label>
            <InputText
              type="email"
              value={email}
              placeholder="Ingresa tu correo"
              onChange={handleEmailChange}
              required
            />
            <label>Contraseña</label>
            <InputText
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <Button
              type="submit"
              label="Ingresar"
              className="p-button-rounded p-button-info"
              loading={loading}
              disabled={loading}
            />
          </form>
          <div className="redes">
            <p>Contactanos</p>
            <a
              href="http://wa.me/573223547930"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <img src={whatsapp} alt="Whatsapp" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100083373969240&mibextid=LQQJ4d"
              target="_blank"
              rel="noreferrer"
            >
              <img src={facebook} alt="Facebook" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../style/LoginForm.css";
import logo from '../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux'
import facebook from '../assets/facebook.png';
import whatsapp from '../assets/icon-whatsapp.png';
import instagram from '../assets/instagram.png';
import telegram from '../assets/icon-telegram.png';
import { removeError, removeSuccess } from "../features/error/errorSlice";
import { useAuthContext } from "../context/AuthContext";



const Login = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { error, success } = useSelector(state => state.error);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);


    const { login } = useAuthContext();


    const handleErrror = () => {
        if (error) {
            setEmail("");
            setPassword("");
            toast.error(error, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            });
            dispatch(removeError());
        } else if (success) {
            toast.success(success, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            });
            dispatch(removeSuccess());
        }
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        login({ email, password });
    };

    useEffect(() => {
        handleErrror();
    }, [error, success])

    return (
        <div className="containerLogin">
            <ToastContainer />
            <div className="login-container">
                <h2>INICIAR SESIÓN</h2>
                <img src={logo} width={200} alt="logo"
                className="logo"
                />
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <button type="submit">Iniciar sesión</button>
                    <p style={{ marginTop: '10px' }}>¿No tienes una cuenta? <a href="#/register-sellers">Registrate</a></p>
                </form>
                <div className="redes">
                    <p>Contactanos</p>
                    <a href="http://wa.me/573246409461" target="_blank"> <img src={whatsapp} alt="Whatsapp" /></a>
                    <a href="https://www.facebook.com/profile.php?id=100083373969240&mibextid=LQQJ4d" target="_blank"><img src={facebook} alt="Facebook" /></a>
                </div>
            </div>
        </div>
    );
};

export default Login;

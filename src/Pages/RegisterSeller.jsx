import React from 'react';
import "../style/LoginForm.css";
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { createUserSellerThunk } from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { removeError } from '../features/error/errorSlice';
import { useNavigate } from 'react-router-dom';

const RegisterSeller = () => {

    const initialData = {
        username: '',
        email: '',
        password: '',
        role: 'seller'
    }

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { error, success } = useSelector(state => state.error);

    const [dataUser, setDataUser] = React.useState(initialData);

    const handleChange = (e) => {
        setDataUser({
            ...dataUser,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(dataUser);
        if (dataUser != initialData) {
            dispatch(createUserSellerThunk(dataUser));
        }
    }

    const handleErrors = () => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salió mal!',
            })
            dispatch(removeError());
        } else if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Registro Exitoso!',
            }).then((result) => {
                if (result.isConfirmed) {
                    setDataUser(initialData);
                    navigate('/login');
                }
            })
        }
    }

    React.useEffect(() => {
        handleErrors();
    }, [error, success]);

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="colored"
            />
            <div className="containerLogin">
                <div className="login-container">
                    <h2>Registro para vendedores</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Nombre de usuario"
                            name="username"
                            value={dataUser.username}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            name="email"
                            value={dataUser.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            name="password"
                            value={dataUser.password}
                            onChange={handleChange}
                            required
                        />
                        <p style={{ marginTop: '5px', fontWeight: '500' }}>Nota: Favor agregar correo existente</p>
                        <button type="submit"
                            {...dataUser != initialData ? 'disabled' : ''}
                        >
                            Registrarme
                        </button>
                        <p style={{ marginTop: '10px' }}>¿Ya tienes una cuenta? <a href="#/login">Inicia sesión</a></p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterSeller;

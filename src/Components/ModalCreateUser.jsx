import React, { useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { createUserThunk } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, removeSuccess } from '../features/error/errorSlice';
import Swal from 'sweetalert2';

// eslint-disable-next-line react/prop-types
const ModalCreateUser = ({ open, onClose, recharge }) => {
    const dispatch = useDispatch();
    const { error, success } = useSelector(state => state.error);

    const initialData = {
        username: '',
        email: '',
        password: '',
        role: ''
    };

    const [dataUser, setDataUser] = React.useState(initialData);

    const handleChange = (e) => {
        setDataUser({
            ...dataUser,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createUserThunk(dataUser));
        onClose();
        setDataUser(initialData);
    };

    const handleErrors = () => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salió mal!',
            });
            dispatch(removeError());
        } else if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Registro Exitoso!',
            }).then((result) => {
                if (result.isConfirmed) {
                    recharge();
                }
            });
            dispatch(removeSuccess());
        }
    };

    useEffect(() => {
        handleErrors();
    }, [error]);

    return (
        <Dialog
            visible={open}
            onHide={onClose}
            className="p-fluid"
            header="Crear usuario"
            footer={
                <div>
                    <Button label="Crear usuario" icon="pi pi-check" className="p-button-success" onClick={handleSubmit} />
                </div>
            }
        >
            <div style={{ padding: '20px' }}>
            <div className="flex flex-column gap-2">
           <label htmlFor="username">Nombre de usuario</label>
           <InputText id="username" aria-describedby="username-help"
           name="username"
           onChange={handleChange}
           value={dataUser.username}
           />
            </div>
            <br />
                <div className="p-field">
                    <label htmlFor="email">Correo electrónico</label>
                    <InputText
                        id="email"
                        name="email"
                        onChange={handleChange}
                        value={dataUser.email}
                    />
                </div>
                <br />
                <div className="p-field">
                    <label htmlFor="password">Contraseña</label>
                    <InputText
                        id="password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        value={dataUser.password}
                    />
                </div>
                <br />
                <div className="p-field">
                    <label htmlFor="role">Selecciona el Rol del usuario</label>
                    <Dropdown
                        id="role"
                        name="role"
                        options={[
                            { label: 'Vendedor', value: 'seller' },
                            { label: 'Administrador', value: 'admin' },
                        ]}
                        onChange={handleChange}
                        value={dataUser.role}
                        placeholder="Selecciona el rol"
                    />
                </div>
            </div>
        </Dialog>
    );
};

export default ModalCreateUser;

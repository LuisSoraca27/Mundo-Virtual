import React, { useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { editUserThunk } from '../features/user/userSlice';

const ModalEditUser = ({ open, onClose, recharge, data }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        setValue('username', data?.username || '');
        setValue('email', data?.email || '');
    }, [data, setValue]);

    const onSubmit = (formData) => {
        const editData = {
            username: formData.username,
            email: formData.email,
        };

        dispatch(editUserThunk(editData))
            .then(() => {
                setValue('username', '');
                setValue('email', '');
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario editado correctamente',
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .finally(() => {
                onClose();
                recharge();
            });
    };

    return (
        <Dialog
            visible={open}
            onHide={onClose}
            className="p-fluid"
            header="Editar usuario"
            footer={
                <div>
                    <Button label="Confirmar" icon="pi pi-check" severity='success' onClick={handleSubmit(onSubmit)} />
                </div>
            }
        >
            <div style={{ padding: '0px' }}>
                <form>
                    <div className="row">
                        <div className="mb-2">
                            <label htmlFor="username">
                                <span style={{ fontSize: '17px', fontWeight: '400' }}>Nombre de Usuario</span>
                            </label>
                            <InputText
                                id="username"
                                type="text"
                                name="username"
                                placeholder="Ingrese el nombre de usuario"
                                {...register('username', { required: true })}
                            />
                        </div>
                         <br />
                        <div className="mb-2">
                            <label htmlFor="email">
                                <span style={{ fontSize: '17px', fontWeight: '400' }}>Correo</span>
                            </label>
                            <InputText
                                id="email"
                                type="text"
                                name="email"
                                placeholder="Ingrese el correo"
                                {...register('email', { required: true })}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </Dialog>
    );
};

export default ModalEditUser;

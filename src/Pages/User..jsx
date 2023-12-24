import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import '../style/users.css'
import { setUsersAdminThunk, setUsersSellerThunk, deleteUserThunk } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ModalCreateUser from '../Components/ModalCreateUser';
import ModalRecharge from '../Components/ModalRecharge'
import { setIsLoading } from '../features/isLoading/isLoadingSlice'
import IsLoading from '../Components/IsLoading'
import Swal from 'sweetalert2';
import ModalEditUser from '../Components/ModalEditUser';
import { removeError } from '../features/error/errorSlice';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { InputText } from 'primereact/inputtext';

import { Badge } from 'primereact/badge';
        

const User = () => {

    const [open, setOpen] = React.useState(false);
    const onClose = () => setOpen(false);

    const [openRecharge, setOpenRecharge] = React.useState(false);
    const onCloseRecharge = () => setOpenRecharge(false);

    const [openEdit, setOpenEdit] = React.useState(false);
    const onCloseEdit = () => setOpenEdit(false);
    const [userEdit, setUserEdit] = React.useState(null);

    const [reload, setReload] = React.useState(false);
    const [idUser, setIdUser] = React.useState('');
    const [usersFilter, setUsersFilter] = React.useState('');

    const dispatch = useDispatch();
    const { usersAdmin } = useSelector(state => state.user);
    const { usersSeller } = useSelector(state => state.user);
    const isLoadingState = useSelector((state) => state.isLoading);
    const { error } = useSelector((state) => state.error);

    const filteredUsers = usersFilter
        ? usersSeller.filter(user =>
            user.email.toLowerCase().includes(usersFilter.toLowerCase())
        )
        : usersSeller;

        
    const handleRecharge = (id) => {
        setIdUser(id);
        setOpenRecharge(true);
    }

    const handleEdit = (user) => {
        setUserEdit(user);
        setOpenEdit(true);
    }

    React.useEffect(() => {
        handleErrors();
        dispatch(setIsLoading(true));
        dispatch(setUsersAdminThunk());
        dispatch(setUsersSellerThunk())
            .finally(() => {
                dispatch(setIsLoading(false));
            })
    }, [dispatch, reload])

    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '!Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUserThunk(id))
                    .finally(() => {
                        Swal.fire(
                            'Eliminado!',
                            'El usuario ha sido eliminado.',
                            'success'
                        )
                    }
                    )
                setReload(!reload)
            }
        });
    }

    const handleErrors = () => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
                cancelButtonText: 'Ok'
            })
            dispatch(removeError())
        }
    }

    return (
        <>
            {isLoadingState ? <IsLoading /> :
                <>
                    <ModalCreateUser open={open} onClose={onClose} recharge={() => setReload(!reload)} />
                    <ModalRecharge
                        open={openRecharge}
                        onClose={onCloseRecharge}
                        recharge={() => setReload(!reload)}
                        idUser={idUser}
                    />
                    <ModalEditUser
                        open={openEdit}
                        onClose={onCloseEdit}
                        recharge={() => setReload(!reload)}
                        data={userEdit}
                    />
                    <div className='container-users'>
                        <div className="header-users">
                            <span style={{ padding: '10px', borderRadius: '5px'}}>
                                <i className="pi pi-users mr-2 title-users"></i>
                                <span className="vertical-align-middle title-users">  Usuarios</span>
                            </span>
                            <Button label="Crear usuario" icon="pi pi-plus" 
                                onClick={() => setOpen(true)}
                                severity='success'
                                rounded
                            />
                        </div>
                        <Accordion  activeIndex={0}>
                        <AccordionTab header={
                                <div>
                                      <i className="pi pi-user mr-2"></i>
                                      <span className="vertical-align-middle">  Usuarios administradores</span>
                                </div>
                            }>
                           <DataTable value={usersAdmin} size='small' >
                            <Column field="username" header="Nombre de usuario" />
                            <Column field="email" header="Correo" />
                            <Column header="Acciones" body={(rowData) => (
                                <div >
                                    <Button
                                        label="Editar"
                                        severity='primary'
                                        rounded
                                        size='small'
                                        style={{ marginLeft: '5px' }}
                                        onClick={() => handleEdit(rowData)}
                                    />
                                    <Button
                                        label="Eliminar"
                                        severity='danger'
                                        rounded
                                        size='small'
                                        style={{ marginLeft: '5px' }}
                                        onClick={() => handleDelete(rowData.id)}
                                    />
                                </div>
                            )} />
                        </DataTable>
                            </AccordionTab>
                            <br />
                            <br />
                        </Accordion>
                       <div style={{position: 'relative'}}>
                       <Badge value={usersSeller.length}
                       style={{position: 'absolute', right: '15px', top: '20px', zIndex: '1'}}
                       ></Badge>
                       <Accordion  activeIndex={0} 
                       style={{marginTop: '10px', zIndex: '0'}}
                       >
                        <AccordionTab header={
                                <div>
                                      <i className="pi pi-user mr-2"></i>
                                      <span className="vertical-align-middle">  Usuarios vendedores</span>
                                </div>
                            }>
{/*                                  */}
                                <span className="p-input-icon-left"
                                 style={{marginBottom: '10px'}}
                                >
                                 <i className="pi pi-search" />
                                 <InputText placeholder="Buscar por correo..."
                                 className="p-inputtext-sm" 
                                  onChange={(e) => setUsersFilter(e.target.value)}
                                  size={"small"}
                                 />
                               </span>
                            <DataTable value={filteredUsers} size='small' responsiveLayout="scroll" paginator rows={50}>
                            <Column field="username" header="Nombre de usuario" />
                            <Column field="email" header="Correo" />
                            <Column field="balance" header="Saldo" />
                            <Column header="Acciones" body={(rowData) => (
                                <div>
                                    <Button
                                        label="Recargar"
                                        onClick={() => handleRecharge(rowData.id)}
                                        severity='success'
                                        rounded
                                        size='small'
                                        style={{ marginLeft: '5px' }}
                                    />
                                    <Button
                                        label="Editar"
                                        onClick={() => handleEdit(rowData)}
                                        severity='primary'
                                        rounded
                                        size='small'
                                        style={{ marginLeft: '5px' }}
                                    />
                                    <Button
                                        label="Eliminar"
                                        onClick={() => handleDelete(rowData.id)}
                                        severity='danger'
                                        rounded
                                        size='small'
                                        style={{ marginLeft: '5px' }}
                                    />
                                </div>
                            )} />
                        </DataTable>
                            </AccordionTab>
                        </Accordion>
                       </div>
                    </div>
                </>
            }
        </>
    );
};

export default User;

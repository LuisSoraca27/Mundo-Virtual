import React, { useEffect, useState } from 'react';
import '../style/orders.css';
import { useSelector, useDispatch } from 'react-redux';
import { getOrdersDay, getOrdersMonth } from '../features/orders/OrdersSlice';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import Detailorder from '../Components/Order/Detailorder';

const Order = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const handleClose = () => setShowModal(false);
  const handleShow = (data) => {
    setData(data);
    setShowModal(true);
  };

  const dispatch = useDispatch();
  const { ordersDay, ordersMonth } = useSelector((state) => state.orders);

  const orders = ordersDay.map((order) => order.priceProduct);
  const total = orders.reduce((a, b) => a + b, 0);

  useEffect(() => {
    dispatch(getOrdersDay());
    dispatch(getOrdersMonth());
  }, [dispatch]);

  const createdAtTemplate = (rowData) => {
    const createdAt = new Date(rowData.createdAt);
    const dia = createdAt.getDate();
    const mes = createdAt.toLocaleString('es-ES', { month: 'long' });
    const anio = createdAt.getFullYear();
    const hora = createdAt.getHours();
    const minutos = createdAt.getMinutes();
    return `${dia} de ${mes} de ${anio}, a las ${hora}:${minutos}`;
  };

  return (
    <>
      <Detailorder showModal={showModal} handleClose={handleClose} data={data} />
      <div className="container-orders-father">
        <h2>Ventas</h2>
        <div className="container-orders">
          <div className="info-orders">
            <h3>${total}</h3>
            <h2>Ventas del día de hoy </h2>
          </div>
          <div className="info-orders">
            <h3>${ordersMonth}</h3>
            <h2>Total ventas del mes </h2>
          </div>
        </div>
        <div style={{ marginTop: '50px' }}>
          <DataTable value={ordersDay} className="p-datatable-striped" responsiveLayout="scroll" stripedRows 
          paginator rows={10} rowsPerPageOptions={[20,30, 50, 100]} size='small'
          >
            <Column field="nameProduct" header="Nombre del producto" />
            <Column field="username" header="Comprador" />
            <Column field="priceProduct" header="Precio" />
            <Column field="createdAt" header="Fecha de Compra" body={createdAtTemplate} />
            <Column body={(rowData) => <Button label="Ver detalles" onClick={() => handleShow(rowData)} className="p-button-rounded p-button-info" />} />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default Order;

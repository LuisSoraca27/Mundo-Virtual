import { useEffect, useRef } from 'react';
import { Messages } from 'primereact/messages';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationThunk } from '../features/notifications/notificationSlice';

const Home = () => {
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.notification);
    const msgs = useRef(null);

    const notificaciones = notifications.map((notification) => {
        return {
            sticky: true,
            severity: 'info',
            icon: 'pi pi-bell',
            detail: notification.message,
            closable: false
        };
    });

    useEffect(() => {
        dispatch(getNotificationThunk());
    }, [dispatch]);

    // Usar un useEffect para mostrar las notificaciones cuando estén disponibles
    useEffect(() => {
        if (msgs.current && notificaciones.length > 0) {
            msgs.current.clear();
            msgs.current.show(notificaciones);
        }
    }, [notificaciones, msgs.current]);


    return (
        <div className="container-notification">
            <div className="notificationView">
                <h2>Notificaciones</h2>
                <p>Conoce nuestras promociones y noticias</p>
                <hr />
                <div className="notifications">
                    {/* Aquí renderizamos el componente Messages de PrimeReact */}
                    <Messages ref={msgs} />
                </div>
            </div>
        </div>
    );
};

export default Home;

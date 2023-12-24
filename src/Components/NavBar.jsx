import  { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/navbar.css'; 
import logo from '../assets/logo.png';
import { useMediaQuery } from 'react-responsive';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';

const NavBar = () => {
  const [activeItem, setActiveItem] = useState('profiles');

  const user = JSON.parse(localStorage.getItem('user'));

  const isMobile = useMediaQuery({ maxWidth: 800 });

  const [visibleLeft, setVisibleLeft] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);

  const onHideLeft = () => setVisibleLeft(false);
  const onHideRight = () => setVisibleRight(false);

  const handleItemClick = (item) => {
    setActiveItem(item);
    // Puedes realizar otras acciones aquí al hacer clic en un elemento
  };

  const menuItems = [
    { label: 'Perfiles', path: '/profiles' },
    { label: 'Cuentas', path: '/accounts' },
    { label: 'Combos', path: '/combos' },
    { label: 'Cursos', path: '/courses' },
    { label: 'Mas servicios', path: '/licenses' },
  ];

  return (
   <>
    <div className="navbar">
     <div>
     {
      isMobile && (
        <div className="logo">
            <img
            src={logo}
            alt="Logo"
            onClick={() => setVisibleLeft(true)}
          />
      </div>
      )
     }
     </div>

    <div className='navOpcion'>
    <ul className="navmenu">
        {menuItems.map((item) => (
          <li
            key={item.label}
            className={activeItem === item.label ? 'active' : ''}
          >
            <Link to={item.path} onClick={() => handleItemClick(item.label)}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
     {user?.role === 'seller' && (
        <div className="balance-bar">
        <p>Saldo: ${user?.balance}</p>
      </div>
     )}
     {
      isMobile && (
        <i className="pi pi-align-right"
         style={{ fontSize: '1.7rem', color: 'white', marginRight: '10px', cursor: 'pointer' }}
         onClick={() => setVisibleRight(true)}
         >
         </i>
      )
     }
    </div>
    </div>
    <SidebarLeft visible={visibleLeft} onHide={onHideLeft} />
    <SidebarRight show={visibleRight} handleClose={onHideRight} />
   </>
  );
};

export default NavBar;

import React from 'react';
import '../style/support.css'
import soporte from '../assets/soporte-tecnico.png'
import whatsapp from '../assets/whatsapp.png'
import facebook from '../assets/facebook.png'
import instagram from '../assets/instagram.png'
import logo from '../assets/logo_2.png'

const Support = () => {
    return (
        <div className='container-support'>
            <div className="header-support">
                <h1>Soporte Tecnico</h1>
                <p>Gracias por elegir Mundo Virtual Streaming. En caso de duda, sugerencia o algún problema en el sitio web , por favor comuníquese a la administración a través de los siguientes medios.</p>
            </div>
            <div className="header-support">
                <img className='soporte' src={soporte} alt="" />
            </div>
            <div className='line-whatsapp'>
                <h2> Lineas de Whatsapp</h2>
                <div className="lines">
                    <a href="https://api.whatsapp.com/send/?phone=573223547930&text&type=phone_number&app_absent=0" target='_blank'>
                        <div className="line">
                            <img src={whatsapp} alt="" />
                            <h3>Soporte</h3>
                            <p>322 354 7930</p>
                        </div>
                    </a>
                    <a href="https://api.whatsapp.com/send/?phone=5732416409461&text&type=phone_number&app_absent=0" target='_blank'>
                        <div className="line">
                            <img src={whatsapp} alt="" />
                            <h3>Ventas </h3>
                            <p>324 640 9461</p>
                        </div>
                    </a>
                    {/* <a href="https://api.whatsapp.com/send/?phone=573242157339&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                        <div className="line">
                            <img src={whatsapp} alt="" />
                            <h3>Ventas 2</h3>
                            <p>324 215 7339</p>
                        </div>
                    </a> */}
                </div>
            </div>
            <div className="red-socials">
                <h2>siguenos en nuestras redes sociales</h2>
                <div className='socials'>
                    <a href="https://www.facebook.com/profile.php?id=100083373969240&mibextid=LQQJ4d" target='_blank'>
                        <div className="social">
                            <img src={facebook} alt="" />
                            <p>Mundovirtual.Col</p>
                        </div>
                    </a>
                    {/* <a href="">
                        <div className="social">
                            <img src={instagram} alt="" />
                            <p>@dk_soluciones_baq</p>
                        </div>
                    </a> */}
                </div>
            </div>
            <div className="footer-support">

                <img src={logo} alt="" />
                <p>© 2024 Mundo Virtual Streaming. Todos los derechos reservados.</p>
                <p>Dk Soluciones V1.5</p>
            </div>
        </div>
    );
};

export default Support;
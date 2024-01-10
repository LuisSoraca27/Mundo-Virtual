import  { useEffect, useState } from 'react';
import IsLoading from '../Components/IsLoading';
import { useDispatch, useSelector } from 'react-redux';
import CardProfile from '../Components/CardProfile';
import netflix from '../assets/img/netflix.png';
import amazon_prime from '../assets/img/amazon_prime.png';
import disney_plus from '../assets/img/disney_plus_p.webp';
import hbo from '../assets/img/hbo.png';
import crunchyroll from '../assets/img/crunchyroll.webp';
import paramount_plus from '../assets/img/paramount-plus.png';
import plex from '../assets/img/plex.png';
import star_plus from '../assets/img/star-plus.png';
import vix from '../assets/img/vix.png';
import spotify from '../assets/img/spotify.webp';
import tidal from '../assets/img/tidal.png';
import youtube from '../assets/img/youtube.png';
import { setAccountThunk } from '../features/account/accountSlice';
import { setIsLoading } from '../features/isLoading/isLoadingSlice';
import ModalAccount from './ModalAccount';
import { setBalanceThunk } from '../features/balance/balanceSlice';
import rakuten from '../assets/img/rakuten.png';
import apple_music from '../assets/img/apple_music.png';
import deezer from '../assets/img/deezer.webp';
import mubi from '../assets/img/mubi.png';
import apple_tv from '../assets/img/apple_tv.png';
import brazzers from '../assets/img/brazzers.png';
import canva from '../assets/img/canva.png';
import pornhub from '../assets/img/pornhub.png';
import xbox from '../assets/img/xbox.png';
import acorntv from '../assets/img/acorntv.png';
import profenet from '../assets/img/profenet.png';
import iptv from '../assets/img/iptv.webp';

const Account = () => {

    const categoryImageMap = {
        'netflix': [netflix, 'Netflix'],
        'amazon_prime': [amazon_prime, 'Amazon Prime Video'],
        'disney_plus': [disney_plus, 'Disney Plus'],
        'hbo_max': [hbo, 'HBO MAX'],
        'crunchyroll': [crunchyroll, 'Crunchyroll'],
        'profenet': [profenet, 'El profenet'],
        'paramount_plus': [paramount_plus, 'Paramount+'],
        'vix': [vix, 'Vix+'],
        'plex': [plex, 'Plex'],
        'star_plus': [star_plus, 'Star+'],
        'iptv': [iptv, 'IPTV'],
        'apple_tv': [apple_tv, 'Apple TV'],
        'pornhub': [pornhub, 'Pornhub'],
        'brazzers': [brazzers, 'Brazzers'],
        'rakuten': [rakuten, 'Rakuten Viki'],
        'acorntv': [acorntv, 'Acorn TV'],
        'mubi': [mubi, 'Mubi'],
        'spotify': [spotify, 'Spotify'],
        'tidal': [tidal, 'Tidal'],
        'youtube': [youtube, 'Youtube'],
        'dezzer': [deezer, 'Deezer'],
        'canva': [canva, 'Canva'],
        'xbox': [xbox, 'Xbox'],
        'apple_music': [apple_music, 'Apple Music'],
        'xbox_pass': [xbox, 'Xbox'],
    };

    const user = JSON.parse(localStorage.getItem('user'));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [reload, setReload] = useState(false);


    const filterAccounts = () => {
        const accounts0 = accounts.filter(account => account.total === '0');
        const accountsComplete = accounts.filter(account => account.total !== '0');
        return [...accountsComplete, ...accounts0];
    }

    const handleCardClick = (data) => {
        setModalData(data);
        setIsModalOpen(true);
    };

    const dispatch = useDispatch();
    let accounts = useSelector((state) => state.accounts.length);
    const isLoadingState = useSelector(state => state.isLoading);

    useEffect(() => {
        dispatch(setBalanceThunk(user?.id));
        dispatch(setIsLoading(true)); // Establecer isLoading en true antes de realizar la solicitud
        dispatch(setAccountThunk())
            .finally(() => {
                dispatch(setIsLoading(false)); // Establecer isLoading en false cuando se complete la solicitud
            });
    }, [dispatch, reload]);

    return (
        <>
            {isLoadingState ? <IsLoading /> :
            <div>
 <div className="container-title">
              <h1>Cuentas </h1>
              <p>Encuentra aqui cuentas de tu plataforma favorita</p>
            </div>
                <div className="container-profile">
                    {
                        filterAccounts().map((account, index) => {
                            const img = categoryImageMap[account?.categoryName]?.[0];
                            const title = categoryImageMap[account?.categoryName]?.[1];
                            return (
                                <div key={index}>
                                    <CardProfile

                                        total={account.total}
                                        background={account.categoryName}
                                        img={img}
                                        title={title}
                                        onClick={() => handleCardClick(
                                            {
                                                total: account.total,
                                                categoryName: account.categoryName,
                                                background: account.categoryName,
                                                img: img,
                                                title: title,
                                                open: isModalOpen,
                                            }
                                        )}
                                    />
                                </div>
                            );
                        }
                        )
                    }
                </div>
            </div>
                }
            {isModalOpen && <ModalAccount
                data={modalData}
                onClose={() => setIsModalOpen(false)}
                reCharge={() => setReload(!reload)}
            />}
        </>
    );
};

export default Account;
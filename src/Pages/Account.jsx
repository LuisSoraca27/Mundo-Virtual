import { useEffect, useState } from "react";
import IsLoading from "../Components/IsLoading";
import { useDispatch, useSelector } from "react-redux";
import CardProfile from "../Components/CardProfile";
import { setAccountThunk } from "../features/account/accountSlice";
import { setIsLoading } from "../features/isLoading/isLoadingSlice";
import ModalAccount from "./ModalAccount";
import { setBalanceThunk } from "../features/balance/balanceSlice";
import netflix from '../assets/img/netflix.png';
import amazon_prime from '../assets/img/amazon_prime.png';
import hbo from '../assets/img/hbo.png';
import crunchyroll from '../assets/img/crunchyroll.webp';
import paramount_plus from '../assets/img/paramount-plus.png';
import plex from '../assets/img/plex.png';;
import vix from '../assets/img/vix.png';
import spotify from '../assets/img/spotify.webp';
import tidal from '../assets/img/tidal.png';
import youtube from '../assets/img/youtube.png';
import rakuten from '../assets/img/rakuten.png';
import apple_music from '../assets/img/apple_music.png';
import deezer from '../assets/img/deezer.webp';
import mubi from '../assets/img/mubi.png';
import apple_tv from '../assets/img/apple_tv.png';
import canva from '../assets/img/canva.png';
import pornhub from '../assets/img/pornhub.png';
import xbox from '../assets/img/xbox.png';
import profenet from '../assets/img/profenet.png';
import iptv from '../assets/img/iptv.webp';
import dpremium from '../assets/img/dpremium.png';
import ViewNotificationImg from "../Components/Notifications/ViewNotificationImg";
import RegisterOrder from "../Components/Order/RegisterOrder";

const Account = () => {
  
  const categoryImageMap = {
    'netflix': [netflix, 'Netflix'],
    'amazon_prime': [amazon_prime, 'Amazon Prime Video'],
    'max': [hbo, 'Max'],
    'crunchyroll': [crunchyroll, 'Crunchyroll'],
    'profenet': [profenet, 'El profenet'],
    'paramount_plus': [paramount_plus, 'Paramount+'],
    'vix': [vix, 'Vix+'],
    'plex': [plex, 'Plex'],
    'iptv': [iptv, 'IPTV'],
    'apple_tv': [apple_tv, 'Apple TV'],
    'pornhub': [pornhub, 'Pornhub'],
    'rakuten': [rakuten, 'Rakuten Viki'],
    'mubi': [mubi, 'Mubi'],
    'spotify': [spotify, 'Spotify'],
    'tidal': [tidal, 'Tidal'],
    'youtube': [youtube, 'Youtube'],
    'dezzer': [deezer, 'Deezer'],
    'canva': [canva, 'Canva'],
    'xbox': [xbox, 'Xbox'],
    'apple_music': [apple_music, 'Apple Music'],
    'Dpremium': [dpremium, 'Dpremium'],
};


  const user = JSON.parse(localStorage.getItem("user"));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [reload, setReload] = useState(false);
  const [isCommunityPanelOpen, setIsCommunityPanelOpen] = useState(true);

  const filterAccounts = () => {
    const accounts0 = accounts.filter((account) => account.total === "0");
    const accountsComplete = accounts.filter(
      (account) => account.total !== "0"
    );
    return [...accountsComplete, ...accounts0];
  };

  const handleCardClick = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const dispatch = useDispatch();
  let accounts = useSelector((state) => state.accounts.length);
  const isLoadingState = useSelector((state) => state.isLoading);

  const renderModal = () => {
    if (user?.role === "admin") {
      return (
        <RegisterOrder
          data={modalData}
          onClose={() => setIsModalOpen(false)}
          typeAccountProp={"account"}
        />
      );
    }

    return (
      <ModalAccount
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recharge={() => setReload(!reload)}
        data={modalData}
      />
    );
  };


  useEffect(() => {
    dispatch(setBalanceThunk(user?.id));
    dispatch(setIsLoading(true)); // Establecer isLoading en true antes de realizar la solicitud
    dispatch(setAccountThunk()).finally(() => {
      dispatch(setIsLoading(false)); // Establecer isLoading en false cuando se complete la solicitud
    });
  }, [dispatch, reload]);

  return (
    <>
      <ViewNotificationImg />
      {isLoadingState ? (
        <IsLoading />
      ) : (
        <div>
          <div className="container-profile">
            <div className="container-title">
              <h1>Cuentas </h1>
              <p>Encuentra aqui cuentas de tu plataforma favorita</p>
            </div>
            {filterAccounts().map((account, index) => {
              const img = categoryImageMap[account?.categoryName]?.[0];
              const title = categoryImageMap[account?.categoryName]?.[1];
              switch (account?.categoryName) {
                case "acorntv":
                case "xbox_pass":
                case "disney_plus":
                case "star_plus":
                  return null;
                default:
                  return (
                    <div key={index}>
                      <CardProfile
                        total={account.total}
                        background={account.categoryName}
                        img={img}
                        title={title}
                        onClick={() =>
                          handleCardClick({
                            total: account.total,
                            categoryName: account.categoryName,
                            background: account.categoryName,
                            img: img,
                            title: title,
                            open: isModalOpen,
                          })
                        }
                      />
                    </div>
                  );
              }
            })}
          </div>
        </div>
      )}
      {isModalOpen && renderModal()}
    </>
  );
};

export default Account;

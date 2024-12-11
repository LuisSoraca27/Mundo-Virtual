import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardProfile from "../Components/CardProfile";
import { setProfileThunk } from "../features/user/profileSlice";
import IsLoading from "../Components/IsLoading";
import "../style/profile.css";
import "../style/cardprofile.css";
import netflix from '../assets/img/netflix.png';
import amazon_prime from '../assets/img/amazon_prime.png';
import hbo from '../assets/img/hbo.png';
import crunchyroll from '../assets/img/crunchyroll.webp';
import paramount_plus from '../assets/img/paramount-plus.png';
import plex from '../assets/img/plex.png';
import vix from '../assets/img/vix.png';
import iptv from '../assets/img/iptv.webp';
import pornhub from '../assets/img/pornhub.png';
import apple_tv from '../assets/img/apple_tv.png';
import mubi from '../assets/img/mubi.png';
import rakuten from '../assets/img/rakuten.png';
import profenet from '../assets/img/profenet.png';
import dpremium from '../assets/img/dpremium.png';
import { setIsLoading } from "../features/isLoading/isLoadingSlice";
import ModalProfile from "./ModalProfile";
import { setBalanceThunk } from "../features/balance/balanceSlice";
import ViewNotificationImg from "../Components/Notifications/ViewNotificationImg";
import RegisterOrder from "../Components/Order/RegisterOrder";

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
  'Dpremium': [dpremium, 'Disney+ Premium'],
};
const Profiles = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [reload, setReload] = useState(false);
  const [isCommunityPanelOpen, setIsCommunityPanelOpen] = useState(true);

  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profiles.length);
  const isLoadingState = useSelector((state) => state.isLoading);

  const renderModal = () => {
    if (user?.role === "admin") {
      return (
        <RegisterOrder
          data={modalData}
          onClose={() => setIsModalOpen(false)}
          typeAccountProp={"profile"}
        />
      );
    }

    return (
      <ModalProfile
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recharge={() => setReload(!reload)}
        data={modalData}
      />
    );
  };

  useEffect(() => {
    dispatch(setBalanceThunk(user?.id));
    dispatch(setIsLoading(true));
    dispatch(setProfileThunk()).finally(() => {
      dispatch(setIsLoading(false));
    });
  }, [dispatch, reload, user?.id]);

  const handleCardClick = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const filterProfiles = () => {
    const profiles0 = profiles.filter((profile) => profile.total === "0");
    const profilesComplete = profiles.filter(
      (profile) => profile.total !== "0"
    );
    return [...profilesComplete, ...profiles0];
  };

  return (
    <>
      <ViewNotificationImg />
      {isLoadingState ? (
        <IsLoading />
      ) : (
        <div style={{ position: "relative" }}>
          <div className="container-profile">
            <div className="container-title">
              <h1>Perfiles</h1>
              <p>
                Encuentra aquí el perfil individual de tu plataforma favorita
              </p>
            </div>
            {filterProfiles().map((profile, index) => {
              const img = categoryImageMap[profile?.categoryName]?.[0];
              const title = categoryImageMap[profile?.categoryName]?.[1];

              switch (profile.categoryName) {
                case "tidal":
                case "apple_music":
                case "youtube":
                case "dezzer":
                case "canva":
                case "acorntv":
                case "xbox_pass":
                case "brazzers":
                case "star_plus":
                case "disney_plus":
                case "spotify":
                  return null;

                default:
                  return (
                    <CardProfile
                      key={index}
                      total={profile.total}
                      background={profile.categoryName}
                      img={img}
                      title={title}
                      onClick={() =>
                        handleCardClick({
                          total: profile.total,
                          categoryName: profile.categoryName,
                          background: profile.categoryName,
                          img: img,
                          title: title,
                          open: isModalOpen,
                        })
                      }
                    />
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

export default Profiles;

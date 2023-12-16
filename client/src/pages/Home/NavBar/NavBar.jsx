import { NavBarLink } from "../../../components/NavBarLink/NavBarLink";
import {
  faBell,
  faCompass,
  faMessage,
  faSquarePlus,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faMagnifyingGlass,
  faHouse,
  faFilm,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const NavBar = () => {
  const dataNav = [
    {
      icons: faHouse,
      title: "Accueil",
      href: "/",
    },
    {
      icons: faMagnifyingGlass,
      title: "Recherche",
      href: "",
    },
    {
      icons: faCompass,
      title: "Découvrir",
      href: " ",
    },
    {
      icons: faFilm,
      title: "Reels",
      href: " ",
    },
    {
      icons: faMessage,
      title: "Messages",
      href: " ",
    },
    {
      icons: faBell,
      title: "Notificationss",
      href: " ",
    },
    {
      icons: faSquarePlus,
      title: "Créer",
      href: "/creer",
    },
    {
      icons: faUser,
      title: "Profil",
      href: "/connection",
    },
  ];
  return (
    <div className="navBar">
      <div className="navBar-logo">GALLERY</div>
      <div className="navBar-bloklienIcon">
        {dataNav.map((el, idx) => (
          <NavBarLink
            key={idx}
            icons={el.icons}
            title={el.title}
            href={el.href}
          />
        ))}
      </div>
      <div className="navBar-voirPlus">
        <FontAwesomeIcon icon={faBars} /> <span>Plus</span>
      </div>
    </div>
  );
};

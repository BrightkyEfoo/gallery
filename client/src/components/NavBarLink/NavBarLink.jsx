import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";
import {useNavigate} from "react-router-dom"

export const NavBarLink = ({ href, title, icons }) => {

  const navigate = useNavigate()
  const navigation = () =>{
    navigate(href)
  }

  return (
    <div className="navBar-iconLien" onClick={navigation}>
      <div >
        <FontAwesomeIcon icon={icons} className="icon" />
      </div>
      <div>
        {title}
      </div>
    </div>
  );
};

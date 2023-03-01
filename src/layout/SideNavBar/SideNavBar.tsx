import "./SideNavBar.scss";
import { images } from "../../constants/images";

export const SideNavBar = () => {
  return (
    <nav className="SideNavBar">
      <div className="SideNavBar__logo">
        <img className="SideNavBar__img" src={images.logo} alt="logo" />
        <div className="SideNavBar__part2"></div>
      </div>

      <div className="SideNavBar__content">
        <img className="SideNavBar__btnTheme" src={images.moon} alt="themple" />
        <div className="SideNavBar__contentUser">
          <img className="SideNavBar__user" src={images.usuario} alt="user" />
        </div>
      </div>
    </nav>
  );
};

import "./SideNavBar.scss";
import { images } from "../../constants/images";
import { useAppDispatch } from "../../hooks/redux";
import { toggleTheme } from "../../store";

export const SideNavBar = () => {
  const dispatch = useAppDispatch();

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className="SideNavBar">
      <div className="SideNavBar__logo">
        <img className="SideNavBar__img" src={images.logo} alt="logo" />
        <div className="SideNavBar__part2"></div>
      </div>

      <div className="SideNavBar__content">
        <button className="SideNavBar__btnTheme" onClick={handleThemeChange}>
          <img
            className="SideNavBar__btnThemeImg"
            src={images.moon}
            alt="theme"
          />
        </button>
        <div className="SideNavBar__contentUser">
          <img className="SideNavBar__user" src={images.usuario} alt="user" />
        </div>
      </div>
    </nav>
  );
};

import "./SideNavBar.scss";
import React, { useState } from "react";
import { images } from "../../constants/images";
import { useAppDispatch } from "../../redux/hooks";
import { toggleTheme } from "../../redux";
import { useNavigate } from "react-router-dom";

export const SideNavBar = () => {
  const navigate = useNavigate();
  const [isLightTheme, setIsLightTheme] = useState(true);

  const cambioImg = () => {
    setIsLightTheme(!isLightTheme);
  };

  const dispatch = useAppDispatch();

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className="SideNavBar">
      <div
        className="SideNavBar__logo"
        onClick={() => {
          navigate("/");
        }}
      >
        <img className="SideNavBar__img" src={images.logo} alt="logo" />
        <div className="SideNavBar__part2"></div>
      </div>

      <div className="SideNavBar__content">
        <button className="SideNavBar__btnTheme" onClick={handleThemeChange}>
          <img
            className="SideNavBar__btnThemeImg"
            src={isLightTheme ? images.moon : images.sol}
            alt="theme"
            onClick={cambioImg}
          />
        </button>
        <div className="SideNavBar__contentUser">
          <img className="SideNavBar__user" src={images.usuario} alt="user" />
        </div>
      </div>
    </nav>
  );
};

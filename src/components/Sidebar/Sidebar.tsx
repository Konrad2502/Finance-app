import "./Sidebar.scss";
import logo from "../../assets/images/logo-large.svg";
import logoSmall from "../../assets/images/logo-small.svg";
import arrowLogo from "../../assets/images/icon-minimize-menu.svg";
import arrowLogoHover from "../../assets/images/icon-minimize-menu-white.svg";
import { navItems } from "../../data/navItems";
import { useState } from "react";
import { NavLink } from "react-router-dom";
export default function Sidebar() {
  const [collapse, setCollapse] = useState(false);

  return (
    <aside className={`sidebar ${collapse ? "sidebar--collapse" : ""}`}>
      <div className="sidebar__header">
        <img
          src={collapse ? logoSmall : logo}
          alt="logo"
          className="sidebar__header-img"
        />
      </div>
      <div className="sidebar__nav">
        {navItems.map((item) => {
          const path = item.id === "overview" ? "/" : `/${item.id}`;

          return (
            <NavLink
              key={item.id}
              to={path}
              end={item.id === "overview"}
              className={({ isActive }) =>
                `sidebar__item ${isActive ? "sidebar__item--active" : ""}`
              }
            >
              <span className="sidebar__item-icon">
                <img
                  src={item.icon}
                  className="sidebar__item-img sidebar__item-img--default"
                  alt=""
                  aria-hidden="true"
                />
                <img
                  src={item.iconActive}
                  className="sidebar__item-img sidebar__item-img--active"
                  alt=""
                  aria-hidden="true"
                />
              </span>

              <span className="sidebar__item-text">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
      <div className="sidebar__footer" onClick={() => setCollapse((p) => !p)}>
        <span className="sidebar__footer-icon">
          <img
            src={arrowLogo}
            alt=""
            className="sidebar__footer-img sidebar__footer-img--default"
          />
          <img
            src={arrowLogoHover}
            alt=""
            className="sidebar__footer-img sidebar__footer-img--hover"
          />
        </span>
        <p className="sidebar__footer-text">Minimize Menu</p>
      </div>
    </aside>
  );
}

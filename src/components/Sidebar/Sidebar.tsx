import "./Sidebar.scss";
import logo from "../../assets/images/logo-large.svg";
import logoSmall from "../../assets/images/logo-small.svg";
import arrowLogo from "../../assets/images/icon-minimize-menu.svg";
import arrowLogoHover from "../../assets/images/icon-minimize-menu-white.svg";
import { navItems } from "../../data/navItems";
import { useState } from "react";
import type { NavItem } from "../../data/navItems";

export default function Sidebar() {
  const [collapse, setCollapse] = useState(false);
  const [activeId, setActiveId] = useState<NavItem["id"]>("overview");

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
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`sidebar__item ${
              activeId === item.id ? "sidebar__item--active" : ""
            }`}
            onClick={() => setActiveId(item.id)}
          >
            <span className="sidebar__item-icon">
              <img
                src={item.icon}
                className="sidebar__item-img sidebar__item-img--default"
                alt=""
              />
              <img
                src={item.iconActive}
                className="sidebar__item-img sidebar__item-img--active"
                alt=""
              />
            </span>
            <p className="sidebar__item-text">{item.label}</p>
          </div>
        ))}
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

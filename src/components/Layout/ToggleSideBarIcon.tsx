import React from "react";

const ToggleSideBarIcon = () => {
  return (
    <button
      className="navbar-toggler pe-2 border-0 menu-toggle order-3"
      onClick={() => {
        var side = document.getElementById("mainSideMenu");
        if (side) {
          if (side.classList.contains("open")) {
            side.classList.remove("open");
          } else {
            side.classList.add("open");
          }
        }
      }}>
      <span className="fa fa-bars" />
    </button>
  );
};

export default ToggleSideBarIcon;

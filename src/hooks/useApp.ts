import { useNavigate } from "react-router-dom";

const useApp = () => {
  const navigate = useNavigate();

  const handleNavigate = (payload: string) => {
    var side = document.getElementById("mainSideMenu");
    if (side) {
      if (side.classList.contains("open")) {
        side.classList.remove("open");
      }
    }
    let fullPath = payload.trim().split("/");
    if (fullPath.length > 2) {
      let comingFrom = localStorage.getItem("pathName");
      localStorage.setItem("backTo", comingFrom ? comingFrom : "/");
    }
    localStorage.setItem("pathName", payload);
    navigate(payload);
  };

  return {
    push: (payload: string) => handleNavigate(payload),
  };
};

export default useApp;

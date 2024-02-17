import { useUI } from "contexts/UIContext";
import { useNavigate } from "react-router-dom";

const useApp = () => {
  const navigate = useNavigate();
  const { showSuccess } = useUI();

  const handleNavigate = (payload: string, reload: boolean = false) => {
    var side = document.getElementById("mainSideMenu");
    if (side) {
      if (side.classList.contains("open")) {
        side.classList.remove("open");
      }
    }
    if (reload) {
      showSuccess();
      setTimeout(() => {
        navigate(payload);
        window.location.reload(); // Reload the page
      }, 1000)
    } else {
      navigate(payload);
    }
  };

  return {
    push: (payload: string, reload: boolean = false) => handleNavigate(payload, reload),
  };
};

export default useApp;

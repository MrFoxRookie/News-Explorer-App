import closeButton from "../../images/popup__close-button.svg";
import { useEffect } from "react";

function PopupWithForm({ isOpen, onClose, children }) {
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} onClick={onClose}>
      <div className="popup__content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="popup__close-buttom"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <img
            src={closeButton}
            alt="Icono para cerrar formulario"
            className="popup__close-icon"
          />
        </button>

        {children}
      </div>
    </div>
  );
}

export default PopupWithForm;

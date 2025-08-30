import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import ModalContent from "./ModalContent";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeModalOnBackgroundClick(event: MouseEvent) {
      if (
        event.target &&
        (event.target as HTMLElement).id === "modalBackground"
      )
        onClose();
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    function handleTab(event: KeyboardEvent) {
      if (event.key === "Tab" && modalRef.current) {
        const focusableElements =
          modalRef.current.querySelectorAll<HTMLElement>(
            "a, button, textarea, input, select"
          );

        if (focusableElements.length === 0) return;

        const activeElementIndex = Array.from(focusableElements).indexOf(
          document.activeElement as HTMLElement
        );

        let nextIndex = activeElementIndex;

        if (event.shiftKey === false) {
          nextIndex = activeElementIndex + 1;

          if (activeElementIndex === focusableElements.length - 1) {
            nextIndex = 0;
          }
        } else {
          nextIndex = activeElementIndex - 1;

          if (activeElementIndex === 0) {
            nextIndex = focusableElements.length - 1;
          }
        }

        focusableElements[nextIndex].focus();
        event.preventDefault();
      }
    }

    document.addEventListener("click", closeModalOnBackgroundClick);
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("keydown", handleTab);

    return () => {
      document.removeEventListener("click", closeModalOnBackgroundClick);
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("keydown", handleTab);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return;

  return ReactDOM.createPortal(
    <div ref={modalRef} className="max-w-11 ">
      <ModalContent>{children}</ModalContent>
    </div>,
    document.getElementById("modalRoot") as HTMLElement
  );
}

import Swal from "sweetalert2";

export const alertError = (text: string) => {
  Swal.fire({
    position: "top-end",
    title: "Error",
    text: text,
    showConfirmButton: false,
    timer: 4000,
    background: "#e36666",
  });
};

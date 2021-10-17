import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const SwalWarning = (payload) => {
  return MySwal.fire({
    icon: payload.type ?? "warning",
    title: payload.title ?? "Are you sure?",
    text: payload.text ?? "This process cannot undo",
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    // cancelButtonColor: "#DF013A",
    reverseButtons: true,
    buttonsStyling: false,
    customClass: {
      confirmButton: "btn mr-3 btn-outline-primary",
      cancelButton: "btn mr-3 btn-outline-danger",
    },
  });
};
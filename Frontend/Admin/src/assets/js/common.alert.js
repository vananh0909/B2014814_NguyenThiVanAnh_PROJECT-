import Swal from "sweetalert2";


export const alert_success = (title, text) => {
  Swal.fire({
    icon: "success",
    title: title,
    text: text,
    background: "#fff",
    didOpen: () => {
      const popup = Swal.getPopup();
      popup.style.border = "2px solid #fff";
    },
  });
};

export const alert_warning = (title, text) => {
  Swal.fire({
    icon: "warning",
    title: title,
    text: text,
    background: "#fff",
    didOpen: () => {
      const popup = Swal.getPopup();
      popup.style.border = "2px solid #fff";
    },
  });
};

export const alert_error = (title, text) => {
  Swal.fire({
    icon: "error",
    title: title,
    text: text,
    background: "#fff",
    didOpen: () => {
      const popup = Swal.getPopup();
      popup.style.border = "2px solid #fff";
    },
  });
};

export const alert_info = (title, text) => {
  Swal.fire({
    icon: "info",
    title: title,
    text: text,
    background: "#fff",
    didOpen: () => {
      const popup = Swal.getPopup();
      popup.style.border = "2px solid #fff";
    },
  });
};

// alert response

export const alert_delete = async (title, text) => {
  let isConfirmed = false;
  await Swal.fire({
    icon: "question",
    title: title,
    html: text,
    background: "#fff",
    didOpen: () => {
      const popup = Swal.getPopup();
      popup.style.border = "2px solid #fff";
    },
    showCancelButton: true,
    showConfirmButton: true,
    reverseButtons: true,
  }).then((result) => {
    isConfirmed = result.isConfirmed;
  });
  return isConfirmed;
};
import Swal from "sweetalert2";

export const SuccessAlert = ({ text, nextFunction }: { text: string | undefined; nextFunction?: () => void }) => {
  return Swal.fire({
    title: "حسنا",
    text: text,
    icon: "success",
    confirmButtonText: "حسنا",
    confirmButtonColor: "#ddb762",
  }).then((result) => {
    if (result.isConfirmed && nextFunction) {
      nextFunction(); // Explicit function call
    }
  });
};

export const ErrorAlert = ({ text, nextFunction }: { text: string | undefined; nextFunction?: () => void }) => {
  return Swal.fire({
    title: "خطأ",
    text: text,
    icon: "error",
    confirmButtonText: "حسنا",
    confirmButtonColor: "#ddb762",
  }).then((result) => {
    if (result.isConfirmed && nextFunction) {
      nextFunction(); // Explicit function call
    }
  });
};

import { toast } from 'react-toastify';
export const ShowError  = (error) => {
    toast.error( error || 'Something Went Wong', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

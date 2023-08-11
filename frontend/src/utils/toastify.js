import { toast } from 'react-toastify';
function toastify(operation,message){
    
    return toast[operation](message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
}
export {toastify}
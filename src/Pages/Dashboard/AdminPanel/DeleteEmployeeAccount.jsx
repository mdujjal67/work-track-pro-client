import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Swal from 'sweetalert2';

const DeleteEmployeeAccount = () => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            firebase.auth().currentUser.delete().then(() => {
                Swal.fire(
                    'Deleted!',
                    'Employee account has been deleted.',
                    'success'
                );
            }).catch((error) => {
                Swal.fire(
                    'Error!',
                    error.message,
                    'error'
                );
            });
        }
    });
};

export default DeleteEmployeeAccount;

import axios from "axios"
import { enqueueSnackbar } from "notistack";


const userLogin = async () => {

    try {
        const res = await axios.post("http://localhost:5173/login");
        return res.data

    }
    catch (error) {
        enqueueSnackbar(error?.message, {
            variant: "error",
            anchorOrigin: {
                vertical: "top",
                horizontal: "right",
            },
        });
    }
}

export default userLogin;
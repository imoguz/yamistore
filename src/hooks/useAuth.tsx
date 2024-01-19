import axios from "axios";
import { useAuthContext } from "../context/authContext";
import { toastifyError, toastifySuccess } from "../helpers/toastify";
const useAuth = () => {
  const { setUserData } = useAuthContext();

  const signup = async (formData: ISignupInitialValues) => {
    try {
      await axios.post("http://localhost:8000/yami/users", formData);
      signin({ email: formData.email, password: formData.password });
    } catch (error) {
      console.log(error);
      // hata durum mesajlarını spesific yazdır.
      toastifyError("An unexpected error occurred. Please try again later.");
    }
  };

  const signin = async (formData: ISigninInitialValues) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/yami/auth/login",
        formData
      );
      sessionStorage.setItem("userData", JSON.stringify(data));
      setUserData(data);
      toastifySuccess("You have successfully logged in.");
    } catch (error) {
      console.log(error);
      // hata durum mesajlarını spesific yazdır.
      toastifyError("An unexpected error occurred. Please try again later.");
    }
  };

  return { signup, signin };
};

export default useAuth;

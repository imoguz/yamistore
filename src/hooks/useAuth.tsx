import axios from "axios";
import { useAuthContext } from "../context/authContext";
import { toastifyError, toastifySuccess } from "../helpers/toastify";
const useAuth = () => {
  const { setUserData } = useAuthContext();
  const baseURL = process.env.REACT_APP_BASE_URL;

  const signup = async (formData: ISignupInitialValues) => {
    try {
      await axios.post(baseURL + "/users", formData);
      await signin(
        { email: formData.email, password: formData.password },
        true
      );
    } catch (error) {
      toastifyError(
        "Registration unsuccessful. Please check your information or connection and try again."
      );
    }
  };

  const signin = async (
    formData: ISigninInitialValues,
    signup: boolean = false
  ) => {
    try {
      const { data } = await axios.post(baseURL + "/auth/login", formData);
      sessionStorage.setItem("userData", JSON.stringify(data));
      setUserData(data);
      toastifySuccess(
        `You have successfully ${signup && "signup and"} sign in.`
      );
    } catch (error) {
      console.log(error);
      toastifyError(
        "Sign in unsuccessful. Please check your information or connection and try again."
      );
    }
  };

  return { signup, signin };
};

export default useAuth;

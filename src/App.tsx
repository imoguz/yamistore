import "./App.css";
import Theme from "../src/themes/themes";
import DarkModeProvider from "./context/themeContext";
import { UserProvider } from "./context/authContext";
import Router from "./router/Router";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Provider store={store}>
      <DarkModeProvider>
        <UserProvider>
          <Theme>
            <ToastContainer />
            <Router />
          </Theme>
        </UserProvider>
      </DarkModeProvider>
    </Provider>
  );
}

export default App;

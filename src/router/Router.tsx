import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import MainCategoryPage from "../pages/MainCategoryPage";
import ProductListingPage from "../pages/ProductListingPage";
import { ThemeContext } from "../context/themeContext";
import { useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import ProductDetailPage from "../pages/ProductDetailPage";
import Checkout from "../pages/Checkout";
import Wishlist from "../pages/Wishlist";
import { ScrollToTop } from "../helpers/ScrollToTop";

const Router = () => {
  const { backdrop } = useContext(ThemeContext) || { backdrop: false };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Backdrop sx={{ color: "#fff", zIndex: 5 }} open={backdrop} />
      <Routes>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/">
          <Route index element={<Main />} />
          <Route path="/shop/:mainMenu" element={<MainCategoryPage />} />
          <Route path="/shop" element={<ProductListingPage />} />
        </Route>
        <Route
          path="/productdetail/:productID"
          element={<ProductDetailPage />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;

import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/productSlice";
import WishlistReducer from "../features/wishlistSlice";
import CartReducer from "../features/cartSlice";
import BannerReducer from "../features/bannerSlice";

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    wishlist: WishlistReducer,
    cart: CartReducer,
    banner: BannerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
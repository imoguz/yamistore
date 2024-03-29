import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface ICartState {
  cart: ICart[];
  loading: boolean;
  error: string | null;
}

// thunk middleware for get
export const readCart = createAsyncThunk<ICart[], string>(
  "cart/readCart",
  async (id) => {
    const { data } = await axios<ICart[]>(
      process.env.REACT_APP_BASE_URL + `/carts`,
      {
        params: { userId: id },
      }
    );
    return data;
  }
);

// Async thunk middleware for post
export const createCart = createAsyncThunk<void, { newCart: INewCart }>(
  "cart/createCart",
  async ({ newCart }) => {
    await axios.post(process.env.REACT_APP_BASE_URL + `/carts`, newCart);
  }
);

// Async thunk middleware for update
export const updateCart = createAsyncThunk<
  void,
  { updateCartItem: IUpdateCartItem }
>("cart/updateCart", async ({ updateCartItem }) => {
  await axios.put(
    process.env.REACT_APP_BASE_URL + `/carts/${updateCartItem.cartId}`,
    updateCartItem.data
  );
});

// Async thunk middleware for delete
export const deleteCart = createAsyncThunk<void, string>(
  "cart/deleteCart",
  async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await axios.delete(process.env.REACT_APP_BASE_URL + `/carts/${id}`);
  }
);

const initialState: ICartState = {
  cart: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cleanCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(readCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readCart.fulfilled, (state, action: PayloadAction<ICart[]>) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(readCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Cart read failed.";
      })
      .addCase(createCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Cart creation failed.";
      })
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Cart update failed.";
      })
      .addCase(deleteCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Cart deletion failed.";
      });
  },
});

export const { cleanCart } = cartSlice.actions;

export default cartSlice.reducer;

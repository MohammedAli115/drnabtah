import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Initial state
const initialState = {
  data: {
    items: [],
    total: 0,
    count: 0,
    discount: 0,
    shipping: 0,
    grandTotal: 0,
  },
  loading: false,
  error: null,
  lastUpdated: null,
};

// Error handler
const handleError = (error) => {
  console.error("API Error:", error.response?.data || error.message);
  return error.response?.data || error.message;
};

// Helpers
const getSessionId = () => localStorage.getItem("session_id") || null;
const getConfig = (userToken, sessionId) => {
  const token = userToken || localStorage.getItem("token");
  const headers = {
    Accept: "application/json",
    "accept-language": "en",
    "device-type": "web",
  };
  if (userToken) headers.Authorization = `Bearer ${token}`;
  const params = !userToken && sessionId ? { session_id: sessionId } : {};
  return { headers, params };
};

// Thunks
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userToken } = {}, { rejectWithValue }) => {
    try {
      const sessionId = getSessionId();
      const { headers, params } = getConfig(userToken, sessionId);
      const response = await api.get("/cart", { headers, params });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (
    { productId, quantity = 1, userToken },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const sessionId = getSessionId();
      const { headers, params } = getConfig(userToken, sessionId);
      const response = await api.post(
        "/cart/add",
        { product_id: productId, quantity, session_id: sessionId },
        { headers, params }
      );
      if (response.data?.data?.session_id) {
        localStorage.setItem("session_id", response.data.data.session_id);
      }
      // Fetch cart immediately after adding for instant update
      dispatch(fetchCart({ userToken }));
      return response.data.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ itemId, quantity, userToken }, { rejectWithValue, dispatch }) => {
    try {
      const sessionId = getSessionId();
      const { headers, params } = getConfig(userToken, sessionId);
      const response = await api.put(
        `/cart/item/${itemId}`,
        { quantity, session_id: sessionId },
        { headers, params }
      );
      // Fetch cart immediately after update for instant update
      dispatch(fetchCart({ userToken }));
      return { ...response.data.data, itemId, quantity };
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async ({ itemId, userToken }, { rejectWithValue, dispatch }) => {
    try {
      const sessionId = getSessionId();
      const { headers, params } = getConfig(userToken, sessionId);
      await api.delete(`/cart/item/${itemId}`, { headers, params });
      // Fetch cart immediately after removal for instant update
      dispatch(fetchCart({ userToken }));
      return itemId;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.data = initialState.data;
      state.error = null;
      localStorage.removeItem("session_id");
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.lastUpdated = new Date().toISOString();
        const data = action.payload || {};
        state.data = {
          items: data.cart_items || [],
          total: data.total_price || 0,
          count: (data.cart_items || []).length,
          discount: data.discount_amount || 0,
          shipping: 0,
          grandTotal: data.total_price || 0,
        };
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearCart, setLoading } = cartSlice.actions;
export default cartSlice.reducer;

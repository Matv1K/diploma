import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { getCartItems } from '@/services/cart/cartService';
import { addLikedItem, deleteLikedItem } from '@/services/liked/likedService';

interface InstrumentState {
  cartItems: any[];
  likedItems: any[];
  loading: boolean;
  error: string | null;
}

const initialState: InstrumentState = {
  cartItems: [],
  likedItems: [],
  loading: false,
  error: null,
};

export const fetchCartItems = createAsyncThunk('instruments/fetchCartItems', async (_, { rejectWithValue }) => {
  try {
    const response = await getCartItems();
    return Array.isArray(response.cartItems) ? response.cartItems : [];
  } catch (error) {
    return rejectWithValue(`Error fetching cart items: ${error}`);
  }
});

export const likeItem = createAsyncThunk('instruments/likeItem', async (likedItem: any, { rejectWithValue }) => {
  try {
    const response = await addLikedItem(likedItem);
    return response;
  } catch (error) {
    return rejectWithValue(`Error liking item: ${error}`);
  }
});

export const unlikeItem = createAsyncThunk('instruments/unlikeItem',
  async (id: string | string[], { rejectWithValue }) => {
    try {
      await deleteLikedItem(id);
      return id;
    } catch (error) {
      return rejectWithValue(`Error unliking item: ${error}`);
    }
  });

const instrumentsSlice = createSlice({
  name: 'instruments',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<any>) => {
      if (!Array.isArray(state.cartItems)) {
        state.cartItems = [];
      }
      state.cartItems.push(action.payload);
    },

    setCartItems: (state, action: PayloadAction<any[]>) => {
      state.cartItems = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    increaseItemAmount: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find(item => item._id === action.payload);
      if (item) {
        item.amount += 1;
      }
    },

    decreaseItemAmount: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find(item => item._id === action.payload);
      if (item && item.amount > 1) {
        item.amount -= 1;
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        item => item._id !== action.payload,
      );
    },

    addLikedItemToState: (state, action: PayloadAction<any>) => {
      state.likedItems.push(action.payload);
    },

    removeLikedItemFromState: (
      state,
      action: PayloadAction<string | string[]>,
    ) => {
      state.likedItems = state.likedItems.filter(
        item => item.instrumentId !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCartItems.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.loading = false;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(likeItem.fulfilled, (state, action) => {
        state.likedItems.push(action.payload);
      })
      .addCase(unlikeItem.fulfilled, (state, action) => {
        state.likedItems = state.likedItems.filter(
          item => item.instrumentId !== action.payload,
        );
      });
  },
});

export const {
  addItemToCart,
  increaseItemAmount,
  decreaseItemAmount,
  removeItem,
  addLikedItemToState,
  removeLikedItemFromState,
} = instrumentsSlice.actions;

export default instrumentsSlice.reducer;
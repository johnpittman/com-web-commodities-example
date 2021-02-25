import { createSlice } from '@reduxjs/toolkit';
import * as asyncActions from './asyncActions';
import createAsyncStoreState from '@client/utils/createAsyncStoreState';

export const store = createSlice({
  name: 'commoditiesPricingSidebar',
  initialState: {
    commodityPrices: createAsyncStoreState(),
    favoriteCommodityIDs: []
  },
  reducers: {
    addFavoriteCommodity: (state: any, action: any) => {
      state.favoriteCommodityIDs.push(action.payload);
    },
    removeFavoriteCommodity: (state: any, action: any) => {
      state.favoriteCommodityIDs = state.favoriteCommodityIDs.filter(
        (id: string) => {
          return id !== action.payload;
        }
      );
    }
  },
  extraReducers: (builder) => {
    builder.addCase(asyncActions.retrieveCommodityPrices.pending, (state) => {
      state.commodityPrices.error = null;
      state.commodityPrices.loading++;
    });
    builder.addCase(
      asyncActions.retrieveCommodityPrices.fulfilled,
      (state, action) => {
        state.commodityPrices.data = action.payload;
        state.commodityPrices.loading--;
      }
    );
    builder.addCase(
      asyncActions.retrieveCommodityPrices.rejected,
      (state, action) => {
        state.commodityPrices.error = action.payload;
        state.commodityPrices.loading--;
      }
    );
  }
});

// Action creators are generated for each case reducer function
export const commoditiesPricingSidebarActions = {
  ...store.actions,
  ...asyncActions
};

export default store;

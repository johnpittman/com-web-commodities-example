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
      if (state.commodityPrices.dirty) {
        state.commodityPrices.loading++;
      }

      state.commodityPrices.error = null;
    });
    builder.addCase(
      asyncActions.retrieveCommodityPrices.fulfilled,
      (state, action) => {
        if (state.commodityPrices.dirty) {
          state.commodityPrices.loading--;
        }

        state.commodityPrices.data = action.payload;
        state.commodityPrices.dirty = false;
      }
    );
    builder.addCase(
      asyncActions.retrieveCommodityPrices.rejected,
      (state, action) => {
        state.commodityPrices.dirty = true;
        state.commodityPrices.error = action.payload;

        if (state.commodityPrices.dirty) {
          state.commodityPrices.loading--;
        }
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

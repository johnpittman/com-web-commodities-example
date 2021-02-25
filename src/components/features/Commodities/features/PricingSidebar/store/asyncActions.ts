import { createAsyncThunk } from '@reduxjs/toolkit';
import { retrievePrices } from '@client/services/prices';

export const retrieveCommodityPrices = createAsyncThunk(
  'commoditiesPricingSidebar/retrieveCommodityPrices',
  async (_, thunkAPI) => {
    try {
      const resp = await retrievePrices(null, {
        effects: {
          takeLast: 'retrievePrices'
        }
      });

      return resp;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

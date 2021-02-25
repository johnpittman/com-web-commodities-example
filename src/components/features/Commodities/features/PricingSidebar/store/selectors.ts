import { createSelector } from '@reduxjs/toolkit';
import slice from './';

export const selectPricingSidebar = (state: any) => {
  return state[slice.name];
};

export const selectCommodityPrices = (state: any) => {
  return selectPricingSidebar(state)?.commodityPrices.data;
};

export const selectCommodityPricesLoading = (state: any) => {
  return !!selectPricingSidebar(state)?.commodityPrices.loading;
};

export const selectFavoriteCommodityIDs = (state: any) => {
  return selectPricingSidebar(state)?.favoriteCommodityIDs;
};

export const selectCommodityPriceGroups = createSelector(
  [selectCommodityPrices, selectFavoriteCommodityIDs],
  (prices: any, favIDs: any) => {
    let result: any = {
      favorites: [],
      misc: []
    };

    if (prices && favIDs) {
      let sortedPrices = [...prices].sort((a: any, b: any) =>
        a.name < b.name ? -1 : 1
      );

      sortedPrices.forEach((priceInfo: any) => {
        let priceInfoModel = {
          id: priceInfo.id,
          name: priceInfo.name,
          price: priceInfo.price,
          createdAt: priceInfo.created_at,
          updatedAt: priceInfo.updated_at
        };

        if (favIDs.indexOf(priceInfo.id) >= 0) {
          result.favorites.push(priceInfoModel);
        } else {
          result.misc.push(priceInfoModel);
        }
      });
    }

    return result;
  }
);

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'redux-injectors';
import Component from './component';
import store, { commoditiesPricingSidebarActions } from './store';
import {
  selectCommodityPriceGroups,
  selectCommodityPricesLoading
} from './store/selectors';

function PricingSidebarContainer() {
  useInjectReducer({ key: store.name, reducer: store.reducer });
  let disptach = useDispatch();
  let commodityPriceGroups = useSelector(selectCommodityPriceGroups);
  let commodityPriceGroupsLoading = useSelector(selectCommodityPricesLoading);

  useEffect(() => {
    disptach(commoditiesPricingSidebarActions.retrieveCommodityPrices());

    // Simulate live updates
    let intervalID = setInterval(() => {
      disptach(commoditiesPricingSidebarActions.retrieveCommodityPrices());
    }, 5000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <Component
      loading={commodityPriceGroupsLoading}
      favoriteCommodityPrices={commodityPriceGroups.favorites}
      miscCommodityPrices={commodityPriceGroups.misc}
      onAddFavorite={(id) => {
        disptach(commoditiesPricingSidebarActions.addFavoriteCommodity(id));
      }}
      onRemoveFavorite={(id) => {
        disptach(commoditiesPricingSidebarActions.removeFavoriteCommodity(id));
      }}
    />
  );
}

export default React.memo(PricingSidebarContainer);

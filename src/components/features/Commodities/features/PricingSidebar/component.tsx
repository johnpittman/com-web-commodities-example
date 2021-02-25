import React from 'react';
import PricingSidebarRow from './features/PricingSidebarRow';

import './style.css';

export interface PricingSidebarProps {
  favoriteCommodityPrices: any;
  miscCommodityPrices: any;
  onAddFavorite: (id: number | string) => void;
  onRemoveFavorite: (id: number | string) => void;
}

function PricingSidebar(props: PricingSidebarProps) {
  const baseClassName = 'PricingSidebar';
  const classNames = {
    root: baseClassName,
    header: `${baseClassName}__header`,
    content: `${baseClassName}__content`,
    section: `${baseClassName}__section`
  };

  return (
    <aside className={classNames.root}>
      <span className={classNames.header}>Commodity Prices</span>
      <div className={classNames.content}>
        {!!props.favoriteCommodityPrices.length && (
          <section className={classNames.section}>
            {props.favoriteCommodityPrices.map((priceInfo: any) => {
              return (
                <PricingSidebarRow
                  key={priceInfo.id}
                  id={priceInfo.id}
                  name={priceInfo.name}
                  price={priceInfo.price}
                  updatedAt={priceInfo.updatedAt}
                  favorite
                  onAddFavorite={props.onAddFavorite}
                  onRemoveFavorite={props.onRemoveFavorite}
                />
              );
            })}
          </section>
        )}
        <section className={classNames.section}>
          {props.miscCommodityPrices.map((priceInfo: any) => {
            return (
              <PricingSidebarRow
                key={priceInfo.id}
                id={priceInfo.id}
                name={priceInfo.name}
                price={priceInfo.price}
                updatedAt={priceInfo.updatedAt}
                onAddFavorite={props.onAddFavorite}
                onRemoveFavorite={props.onRemoveFavorite}
              />
            );
          })}
        </section>
      </div>
    </aside>
  );
}

export default PricingSidebar;

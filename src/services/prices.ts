import request from '@client/utils/request';

export function retrievePrices(params: null, opts: any) {
  return request(
    'https://pp-interview-backend.herokuapp.com/commodity_prices',
    {
      effects: opts?.effects
    }
  );
}

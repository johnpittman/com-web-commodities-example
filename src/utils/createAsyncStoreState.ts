export interface AsyncStoreState {
  data: any;
  loading: number;
  error: null | any;
}

export default (data?: any): AsyncStoreState => ({
  data: data || null,
  loading: 0,
  error: null
});

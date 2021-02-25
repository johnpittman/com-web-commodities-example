export interface AsyncStoreState {
  data: any;
  dirty: boolean;
  loading: number;
  error: null | any;
}

export default (data?: any): AsyncStoreState => ({
  data: data || null,
  dirty: true,
  loading: 0,
  error: null
});

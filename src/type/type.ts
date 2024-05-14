export type Position = 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center';



export type ToastType = 'info'
| 'success'
| 'warning'
| 'error'
| 'default';



export type ToastOptions = {
  position?: Position;
  toastMsg?: string;
  autoCloseTime?: number;
  onClose?: (...args: any[]) => any;
  canClose?: boolean;
  showProgress?: boolean;
  pauseOnHover?: boolean;
  pauseOnFocusLoss?: boolean;
  type?: ToastType;
  theme?: 'dark' | 'light';
}
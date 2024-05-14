import { info, warning, error, success } from './assets/svg';
import { Position, ToastType, ToastOptions } from './type/type';
import './style.css';


const DEFAULT_OPTIONS: ToastOptions = {
  position: 'top-right',
  toastMsg: 'TypeScript Toastify',
  autoCloseTime: 5000,
  onClose: () => { },
  canClose: true,
  showProgress: true,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  type: 'default',
  theme: 'light',
};


export default class Toast {

  [key: string]: ToastOptions[keyof ToastOptions];
  #toastEle: HTMLDivElement;
  #removeBinded: () => void;
  #onClose: (...args: any[]) => any;
  #autoCloseTime: number;
  #progressInterval: number | undefined;
  #timeVisible = 0;
  #isPaused = false;
  #autoCloseInterval: number | undefined = undefined;
  #unpause;
  #pause;
  #visibilityChange;
  #shouldUnPause: boolean = false;
  #type: ToastType = "default";


  constructor(options: ToastOptions) {
    this.#toastEle = document.createElement('div');
    this.#toastEle.classList.add('toast');

    requestAnimationFrame(() => {
      this.#toastEle.classList.add('show');
    });

    this.#onClose = options.onClose || (() => { });
    this.#unpause = () => (this.#isPaused = false);
    this.#pause = () => (this.#isPaused = true);

    this.#visibilityChange = () => {
      this.#shouldUnPause = document.visibilityState === "visible";
    }

    this.#removeBinded = this.remove.bind(this);
    this.update({ ...DEFAULT_OPTIONS, ...options });
    this.#autoCloseTime = options.autoCloseTime ?? DEFAULT_OPTIONS.autoCloseTime!;
  }


  set position(value: Position) {
    const currentContainer = this.#toastEle.parentElement;

    const container = document.querySelector(`.toast-container[data-position="${value}"]`) || (() => {
      const newContainer = document.createElement('div');
      newContainer.classList.add('toast-container');
      newContainer.dataset.position = value;
      document.body.append(newContainer);
      return newContainer;
    })();

    container.append(this.#toastEle);

    if (currentContainer == null || currentContainer.hasChildNodes()) return;
    currentContainer.remove();
  }


  set toastMsg(value: string) {
    this.#toastEle.textContent = value;
  }


  set autoCloseTime(value: number) {
    this.#autoCloseTime = value;
    this.#timeVisible = 0;
    if (!!value === false) return;

    let lastTime: number | null;

    const func = (time: number) => {
      if (this.#shouldUnPause) {
        lastTime = null;
        this.#shouldUnPause = false;
      }

      if (lastTime == null) {
        lastTime = time;
        this.#autoCloseInterval = requestAnimationFrame(func);
        return;
      }

      if (!this.#isPaused) {
        this.#timeVisible += time - lastTime;
        if (this.#timeVisible >= this.#autoCloseTime) {
          this.remove();
          return;
        }
      }
      lastTime = time;
      this.#autoCloseInterval = requestAnimationFrame(func);
    }
    this.#autoCloseInterval = requestAnimationFrame(func);
  }


  set canClose(value: boolean) {
    this.#toastEle.classList.toggle('can-close', value);

    if (value) {
      this.#toastEle.addEventListener('click', this.#removeBinded);
    } else {
      this.#toastEle.removeEventListener('click', this.#removeBinded);
    }
  }


  set showProgress(value: boolean) {
    this.#toastEle.classList.toggle("progress", value);
    this.#toastEle.style.setProperty("--progress", `1`);

    if (value) {
      const func = () => {
        if (!this.#isPaused) {
          this.#toastEle.style.setProperty(
            "--progress",
            `${1 - this.#timeVisible / this.#autoCloseTime}`
          );
        }
        this.#progressInterval = requestAnimationFrame(func);
      }
      this.#progressInterval = requestAnimationFrame(func);
    }
  }


  set pauseOnHover(value: boolean) {
    if (value) {
      this.#toastEle.addEventListener("mouseover", this.#pause);
      this.#toastEle.addEventListener("mouseleave", this.#unpause);
    } else {
      this.#toastEle.removeEventListener("mouseover", this.#pause);
      this.#toastEle.removeEventListener("mouseleave", this.#unpause);
    }
  }


  set pauseOnFocusLoss(value: boolean) {
    if (value) {
      document.addEventListener("visibilitychange", this.#visibilityChange);
    } else {
      document.removeEventListener("visibilitychange", this.#visibilityChange);
    }
  }


  set type(value: ToastType) {
    const existingIcon = this.#toastEle.querySelector('.toast-icon');
    if (existingIcon) {
        existingIcon.remove();
    }

    const svgContainer = document.createElement('div');
    svgContainer.classList.add('toast-icon');
    this.#type = value;

    if (value === 'default') {
        this.#toastEle.textContent = '🦚 TypeScript Toastify';

    } else if (value === 'error') {
        svgContainer.innerHTML = error;
        this.#toastEle.style.setProperty('--light_bg', `var(--error-primary)`);
        this.#toastEle.style.setProperty('--dark_bg', `var(--error-primary)`);
        this.#toastEle.style.setProperty('--light-border', `var(--error-secondary)`);
        this.#toastEle.classList.add('error');
        this.#toastEle.classList.remove('info');
        this.#toastEle.classList.remove('success');
        this.#toastEle.classList.remove('warning');

    } else if (value === 'info') {
        svgContainer.innerHTML = info;
        this.#toastEle.style.setProperty('--light_bg', `var(--info-primary)`);
        this.#toastEle.style.setProperty('--dark_bg', `var(--info-primary)`);
        this.#toastEle.style.setProperty('--light-border', `var(--info-secondary)`);
        this.#toastEle.classList.add('info');
        this.#toastEle.classList.remove('error');
        this.#toastEle.classList.remove('success');
        this.#toastEle.classList.remove('warning');

    } else if (value === 'success') {
        svgContainer.innerHTML = success;
        this.#toastEle.style.setProperty('--light_bg', `var(--success-primary)`);
        this.#toastEle.style.setProperty('--dark_bg', `var(--success-primary)`);
        this.#toastEle.style.setProperty('--light-border', `var(--success-secondary)`);
        this.#toastEle.classList.add('success');
        this.#toastEle.classList.remove('info');
        this.#toastEle.classList.remove('error');
        this.#toastEle.classList.remove('warning');

    } else if (value === 'warning') {
        svgContainer.innerHTML = warning;
        this.#toastEle.style.setProperty('--light_bg', `var(--warning-primary)`);
        this.#toastEle.style.setProperty('--dark_bg', `var(--warning-primary)`);
        this.#toastEle.style.setProperty('--light-border', `var(--warning-secondary)`);
        this.#toastEle.classList.add('warning');
        this.#toastEle.classList.remove('info');
        this.#toastEle.classList.remove('success');
        this.#toastEle.classList.remove('error');
    }
    this.#toastEle.prepend(svgContainer);
}




  set theme(value: 'dark' | 'light') {

    if (this.#type === 'info' || this.#type === 'success' || this.#type === 'warning' || this.#type === 'error') {
      this.#toastEle.classList.remove('dark');
      this.#toastEle.classList.remove('light');
      if (value === 'dark') {
        this.#toastEle.style.setProperty('--light_color', 'var(--dark_color)');
      }
      return;
    }
    if (value === 'dark') {
      this.#toastEle.style.setProperty('--light_bg', 'var(--dark_bg)');
      this.#toastEle.style.setProperty('--light_color', 'var(--dark_color)');
      this.#toastEle.classList.add('dark');  
    } else {
      this.#toastEle.style.setProperty('--dark_bg', 'var(--light_bg)');
      this.#toastEle.style.setProperty('--dark_color', 'var(--light_color)');
      this.#toastEle.classList.add('light');
    }
  }


  remove() {
    if (this.#autoCloseInterval !== undefined) {
      cancelAnimationFrame(this.#autoCloseInterval);
    }
    if (this.#progressInterval !== undefined) {
      cancelAnimationFrame(this.#progressInterval);
    }
    const container = this.#toastEle.parentElement!;
    this.#toastEle.classList.remove('show');
    this.#toastEle.addEventListener('transitionend', () => {
      this.#toastEle.remove();
      if (container.hasChildNodes()) return;
      container.remove();
    });
    this.#onClose();
  }


  update(options: ToastOptions) {
    Object.entries(options).forEach(([key, val]) => {
      this[key] = val;
    })
  }
}
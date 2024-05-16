# TypeScript-Toastify


![Twitter](https://img.shields.io/twitter/follow/aayushmaan54.svg?style=social&label=aayushmaan54) ![npm](https://img.shields.io/npm/v/typescript-toastify.svg?style=for-the-badge) ![NPM](https://img.shields.io/npm/l/typescript-toastify.svg?label=%F0%9F%93%9Clicense&style=for-the-badge)
[![npm](https://img.shields.io/npm/dt/typescript-toastify.svg)](https://www.npmjs.com/package/typescript-toastify)


🦚 TypeScript Toastify allows you to add toast notifications to your web app easily.

[](https://github.com/aayushmaan-54/TypeScript-Toastify-Library/assets/146665161/bf858fa2-0b08-4dd1-9360-c698ef00b6ad)

[](https://github.com/aayushmaan-54/TypeScript-Toastify-Library/assets/146665161/5040238a-0389-44e1-8ad7-558b30f65faf)

## Installation

```
> npm i typescript-toastify
```

## Features

- Easy to set up
- Super easy to customize
- Has ```onClose``` function, which runs function you define when toast closes
- Can remove a toast programmatically
- Update toast in between
- Pause toast when the window loses focus 👁
- pause toast on toast hover
- Fancy progress bar to display the remaining time
- Dark mode 🌑
- set custom position
- set toast closing time
- can use diffrent type of toast like info, error, warning
- And much more !

## The gist

```typescript
import Toast from 'typescript-toastify';

const toast = new Toast({
  position: 'top-right',
  toastMsg: 'Hello, world!',
  autoCloseTime: 3000,
  onClose: () => {
    alert('TS Toast 🍞');
  },
  canClose: true,
  showProgress: true,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  type: 'info',
  theme: 'dark',
});

```

## Demo

[A demo is worth a thousand words](https://typescript-toastify.vercel.app/)

## Documentation
Check the [documentation](https://typescript-toastify.vercel.app/) to get you started!

## Reach me at 🠮
<p align="center">
<a href="https://twitter.com/@aayushmaan54" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg" alt="@aayushmaan54" height="30" width="40" /></a>
  &nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://linkedin.com/in/aayushmaan54" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="@aayushmaan54" height="30" width="40" /></a>
</p>

## License
Licensed under MIT
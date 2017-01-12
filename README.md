## Scrol indicator for vue.js apps

### Demo

 See [DEMO](https://shershen08.github.io/vue-plugins-demo-static/index.html#/scroll) here

### Install

Run ```npm install vue-content-scroll-progress --save```

### Usage

Add in the component ```import MyScrollPugin from 'vue-content-scroll-progress'; ```

Add tag ```<content-scroll-progress spy=".content-list"><content-scroll-progress>```

- **spy** is a required parameter; pass it a selector of the scrolled container element
- **color**, optional; e.g. "#ffcc00" - color of the indicator
- **extraClass**, optional; e.g. "someclass" - add more complicated styling on the progress bar

### License

MIT


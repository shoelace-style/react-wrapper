# React Wrapper for Shoelace

A lightweight utility that wraps custom elements ("web components") so they can be used like native React components.

---

**⚠️ This package has been deprecated!** You should use [`@lit-labs/react`](https://www.npmjs.com/package/@lit-labs/react) instead. If you're looking for an official Shoelace + React package, head on over to [`@shoelace-style/react`](https://www.npmjs.com/package/@shoelace-style/react).

---

## Usage

```jsx
import wrapCustomElement from '@shoelace-style/react-wrapper';

const ShoelaceButton = wrapCustomElement('sl-button');

return <ShoelaceButton type="primary">Click me</ShoelaceButton>;
```

A reference (“ref”) to the underlying custom element is exposed through the `element` property so you can access it directly. This is useful for calling methods.

```jsx
<ShoelaceButton 
  ref={el => this.button = el} 
  onClick={() => this.button.element.current.removeFocus()}
>
  Click me
</ShoelaceButton>
```

This utility was built for [Shoelace](https://shoelace.style), but it should work for just about any custom element.

## Why is this necessary?

React and custom elements don't play nicely together. The problem is best described by [Custom Elements Everywhere](https://custom-elements-everywhere.com/#react):

> **Handling data**
>
> React passes all data to Custom Elements in the form of HTML attributes. For primitive data this is fine, but the system breaks down when passing rich data, like objects or arrays. In these instances you end up with stringified values like some-attr="[object Object]" which can't actually be used.
>
> **Handling events**
>
> Because React implements its own synthetic event system, it cannot listen for DOM events coming from Custom Elements without the use of a workaround. Developers will need to reference their Custom Elements using a ref and manually attach event listeners with addEventListener. This makes working with Custom Elements cumbersome.

This utility solves these problems by exposing a native React component that maps properties and events to the underlying custom element. ✨

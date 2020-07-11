import React from 'react';

export default tagName => {
  const CustomElement = tagName;

  return class extends React.Component {
    constructor(props) {
      super(props);
      this.element = React.createRef();
    }

    componentDidMount() {
      this.syncProps(this.props);
    }

    componentDidUpdate(props) {
      this.syncProps(props);
    }

    syncProps(props) {
      const el = this.element.current;
      Object.keys(props).forEach(name => {
        if (name === 'children' || name === 'style') {
          return;
        }

        if (name.indexOf('on') === 0 && name[2] === name[2].toUpperCase()) {
          this.syncEvent(name.substring(2), props[name]);
        } else {
          el[name] = props[name];
        }
      });
    }

    syncEvent(eventName, newEventHandler) {
      const el = this.element.current;
      const eventNameLc = eventName[0].toLowerCase() + eventName.substring(1);
      const eventStore = el.__events || (el.__events = {});
      const oldEventHandler = eventStore[eventNameLc];

      if (oldEventHandler) {
        el.removeEventListener(eventNameLc, oldEventHandler);
      }

      if (newEventHandler) {
        el.addEventListener(
          eventNameLc,
          (eventStore[eventNameLc] = function handler(event) {
            newEventHandler.call(this, event);
          })
        );
      }
    }

    render() {
      return (
        <CustomElement ref={this.element} style={this.props.style}>
          {this.props.children}
        </CustomElement>
      );
    }
  };
};

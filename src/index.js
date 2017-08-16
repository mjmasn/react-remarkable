'use strict';

import React from 'react';
import Markdown from 'remarkable';

class Remarkable extends React.Component {

  render() {
    var Container = this.props.container;
    var className = this.props.className;

    className = className ? className+' Markdown' : 'Markdown';

    return (
      <Container className={className} dangerouslySetInnerHTML={{ __html: this.content() }} />
    );
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.options !== this.props.options) {
      this.md = new Markdown(nextProps.options);
    }
  }

  content() {
    if (this.props.source) {
      return this.renderMarkdown(this.props.source);
    } else {
      return React.Children.map(this.props.children, (child) => {
        if (typeof child === 'string') {
          return this.renderMarkdown(this.props.source);
        } else {
          return child;
        }
      });
    }
  }

  renderMarkdown(source) {
    if (!this.md) {
      this.md = new Markdown(this.props.options);
    }

    var inline = this.props.inline === false ? false : true;

    if (inline) {
      return this.md.renderInline(source);
    } else {
      return this.md.render(source);
    }
  }
}

Remarkable.defaultProps = {
  container: 'div',
  options: {},
};

export default Remarkable;

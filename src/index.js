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
    }
  }

  renderMarkdown(source) {
    if (!this.md) {
      this.md = new Markdown(this.props.options);
    }

    var inline = typeof this.props.inline === undefined ? true : this.props.inline;

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

/* @flow */
import * as React from 'react';
import type { SortLinkProps } from "../../../../flow-typed/gridViewLibDef";

export default class SortLink extends React.PureComponent<SortLinkProps> {
  setSort = (e: SyntheticInputEvent<>) => {
    e.preventDefault();
    let sort;
    if (!this.props.sort) {
      sort = 'ASC';
    } else if (this.props.sort === 'ASC') {
      sort = 'DESC';
    } else {
      sort = null;
    }
    this.props.setSort(e.target.getAttribute('data-column'), sort);
  };
  render(): React.Node {
    return <a className={ this.props.sort } onClick={ this.setSort } data-column={ this.props.column }>
      { this.props.value }
    </a>;
  }
}

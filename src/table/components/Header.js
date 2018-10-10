/* @flow */
import * as React from 'react';
import Row from './Row';
import Filter from './Filter';
import type { HeaderProps } from '../../flow-typed/gridViewLibDef';

export default class Header extends React.Component<HeaderProps> {
  id: string;
  constructor(props: HeaderProps) {
    super(props);
    this.id = `th-${this.props.tableId}`;
  }

  render(): React.Node {
    let tableHeader = [<Row
      data={ {
        row: this.props.headerCells,
        idx: 0,
        isTh: true,
        checked: this.props.allRowsChecked,
      } }
      options={ this.props.options }
      columns={ this.props.columns }
      sort={ this.props.sort }
      allRowsSelect={ this.props.allRowsSelect }
      id={ this.id }
      key={ this.id }
      setSort={ this.props.setSort }
    />];
    if (this.props.filters) {
      tableHeader.push(<Filter
        key={ `${this.id}-filters` }
        id={ this.id }
        filters={ this.props.filters }
        columns={ this.props.columns }
        tableId={ this.props.tableId }
        applyFilter={ this.props.applyFilter }
      />);
    }
    return <thead>{ tableHeader }</thead>;
  }
}

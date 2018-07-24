import {Component} from 'react'
import TableRow from './TableRow';
import TableFilter from './TableFilter';

class TableHeader extends Component {
  constructor(props) {
    super(props);
    this.id = `th-${this.props.tableId}`;
  }
  filterTimeout = null;
  filterChanged = (filters) => {
    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout)
    }
    this.filterTimeout = setTimeout(() => this.props.onFilterChange(filters), this.props.filterDelay * 1000);
  };

  render() {
    let tableHeader = [<TableRow
      cells={this.props.headerCells}
      options={this.props.options}
      id={this.id}
      key={this.id}
    />];
    if (this.props.filters) {
      tableHeader.push(<TableFilter filters={ this.props.filters } tableId={ this.props.tableId } onFilterChange={ this.filterChanged }/>)
    }
    return <thead>{ tableHeader }</thead>;
  }
}

export default TableHeader;
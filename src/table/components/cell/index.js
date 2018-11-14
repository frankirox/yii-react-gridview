/* @flow */
import * as React from 'react';
import SelectionCheckbox from './content/SelectionCheckbox';
import SortLink from './content/SortLink';
import { PageContext } from "../../../contexts/PageContext";

type CellProps = { content: any };
type CellRule = ((cell: mixed, rowId?: string) => React.Node ) | 'serial' | 'checkbox';
type CellOptions = {
  rule: CellRule,
  cellData: any,
  rowId?: string,
  idx: number,
  checked?: boolean
}

export default class Cell extends React.Component<CellProps> {
  _prepareContent = (cellOptions: CellOptions, currentPage: number, pageSize: number) => {
    if (typeof cellOptions.rule === 'function') {
      return cellOptions.rule(cellOptions.cellData, cellOptions.rowId);
    }
    if (cellOptions.rule === 'serial' && cellOptions.idx !== undefined) {
      return currentPage * pageSize + 1 + cellOptions.idx;
    }
    if (cellOptions.rule === 'checkbox' && cellOptions.cellData === undefined) {
      return <SelectionCheckbox { ...{
        type: 'checkbox',
        rowId: cellOptions.rowId,
        checked: cellOptions.checked,
      } } />
    }
    return cellOptions.cellData
  };

  shouldComponentUpdate(nextProps: CellProps) {
    return !(this.props.content === nextProps.content ||
      this.props.content.value === nextProps.content.value ||
      this.props.content.isFilter ||
      (
        typeof this.props.content === 'object' &&
        typeof nextProps === 'object' &&
        typeof this.props.content.value === 'object' &&
        typeof nextProps.content.value === 'object' &&
        this.props.content.value.idx === nextProps.content.value.idx &&
        this.props.content.value.cellData === nextProps.content.value.cellData
      ));
  }

  render(): React.Node {
    return <PageContext.Consumer>{
      ({ pageSize, currentPage }) => {
        let content = this.props.content;
        let preparedContent;
        if (content && typeof content === 'object' && content.value) {
          if (content.enableSorting) {
            preparedContent = <SortLink { ...content }/>;
          } else {
            if (typeof content.value === 'object') {
              const cellOptions: cellOptions = content.value;
              preparedContent = this._prepareContent(cellOptions, currentPage, pageSize)
            } else {
              preparedContent = content.value;
            }
          }
        } else {
          preparedContent = content;
        }
        return <td>{ preparedContent }</td>;
      }
    }</PageContext.Consumer>;
  }
}

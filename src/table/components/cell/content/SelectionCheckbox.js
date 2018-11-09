/* @flow */
import * as React from 'react';
import type { SelectionCheckboxProps, SelectionChange } from '../../../../gridViewTypes';

export default class SelectionCheckbox extends React.PureComponent<SelectionCheckboxProps> {
  selectRow = (callback: SelectionChange, e: SyntheticInputEvent<HTMLInputElement>) => {
    callback(e.currentTarget.checked)
  };
  render(): React.Node {
    return <input
      type={ this.props.type }
      checked={ this.props.checked }
      onChange={ this.selectRow.bind(this, this.props.selectionChange) }
    />;
  }
}

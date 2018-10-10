/* @flow */
import * as React from 'react';
import Button from './components/Button';
import type { ButtonSettings, PagerProps, GeneralButtonOptions } from "../flow-typed/gridViewLibDef";

export default class Pager extends React.Component<PagerProps> {
  static defaultProps = {
    maxButtonCount: 10,
    pageSize: 20,
    pagerTag: 'ul',
    nextPageLabel: '»',
    prevPageLabel: '«',
    firstPageLabel: null,
    lastPageLabel: null,
  };
  buttonSettings: ButtonSettings;
  pageCount: number;
  generalOptions: GeneralButtonOptions;

  constructor(props: PagerProps) {
    super(props);
    this.buttonSettings = {};
    this.buttonSettings.activePageCssClass = this.props.activePageCssClass;
    this.buttonSettings.disabledPageCssClass = this.props.disabledPageCssClass;
    this.buttonSettings.nextPageCssClass = this.props.nextPageCssClass;
    this.buttonSettings.prevPageCssClass = this.props.prevPageCssClass;
    this.buttonSettings.lastPageCssClass = this.props.lastPageCssClass;
    this.buttonSettings.firstPageCssClass = this.props.firstPageCssClass;
    this.buttonSettings.pageTag = this.props.pageTag;
    this.buttonSettings.onPageButtonClick = this.props.onPageButtonClick;
    this.pageCount = 0;
    this.generalOptions = {
      isFirstPage: false,
      isLastPage: false,
      isPrevPage: false,
      isNextPage: false,
    };
  }

  _addButton = (buttons: Array<React.Node>, pageButtonOptions: {idx: string | number}) => {
    let options = Object.assign({}, this.generalOptions, pageButtonOptions, this.buttonSettings);
    options.key = `pg-${this.props.tableId}-${pageButtonOptions.idx}`;
    buttons.push(<Button { ...options } />);
  };

  _addFirstButton = (buttons: Array<React.Node>) => {
    let page = 0;
    let isActive = this.props.currentPage === page;
    this._addButton(buttons, {
      page: page,
      content: this.props.firstPageLabel,
      active: isActive,
      disabled: isActive,
      isFirstPage: true,
      idx: 'f'
    });
  };
  _addLastButton = (buttons: Array<React.Node>) => {
    this._addButton(buttons, {
      page: this.pageCount - 1,
      content: this.props.lastPageLabel || this.pageCount,
      active: false,
      disabled: this.props.currentPage >= this.pageCount - 1,
      isLastPage: true,
      idx: 'l'
    });
  };
  _addPrevButton = (buttons: Array<React.Node>) => {
    let page;
    if ((page = this.props.currentPage - 1) < 0) {
      page = 0;
    }
    this._addButton(buttons, {
      page: page,
      content: this.props.prevPageLabel,
      active: false,
      disabled: this.props.currentPage <= 0,
      isPrevPage: true,
      idx: 'p'
    });
  };
  _addNextButton = (buttons: Array<React.Node>) => {
    let page;
    let penultimate = this.pageCount - 1;
    if ((page = (+this.props.currentPage) + 1) >= penultimate) {
      page = penultimate;
    }
    this._addButton(buttons, {
      page: page,
      content: this.props.nextPageLabel,
      active: false,
      disabled: this.props.currentPage >= penultimate,
      isNextPage: true,
      idx: 'n'
    });
  };
  _addButtons = (buttons: Array<React.Node>) => {
    let beginPage = Math.max(0, this.props.currentPage - Math.round(this.props.maxButtonCount / 2));
    let endPage = beginPage + this.props.maxButtonCount - 1;
    if (endPage >= this.pageCount) {
      endPage = this.pageCount - 1;
      beginPage = Math.max(0, endPage - this.props.maxButtonCount + 1);
    }

    for (let i = beginPage, idx = 0; i <= endPage; ++i) {
      let isActive = this.props.currentPage === i;
      this._addButton(buttons, {
        page: i,
        content: i + 1,
        active: isActive,
        disabled: isActive,
        idx: idx++,
      });
    }
  };
  render(): React.Node {
    this.pageCount = Math.ceil(this.props.totalCount / this.props.pageSize) || 0;
    let Tag = this.props.pagerTag;
    let buttons = [];
    if (this.props.firstPageLabel) {
      this._addFirstButton(buttons);
    }
    if (this.props.prevPageLabel) {
      this._addPrevButton(buttons);
    }
    this._addButtons(buttons);
    if (this.props.nextPageLabel) {
      this._addNextButton(buttons);
    }
    if (this.props.lastPageLabel) {
      this._addLastButton(buttons);
    }
    return <Tag { ...this.props.pagerOptions }>
      { buttons }
    </Tag>;
  }
}

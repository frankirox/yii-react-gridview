/* @flow */
import * as React from 'react';
import Button from './components/Button';
import type { PagerProps, GeneralButtonOptions } from "../GridView";
import { PageContext } from "../contexts/PageContext";

export default class Pager extends React.Component<PagerProps> {
  static defaultProps = {
    maxButtonCount: 10,
    pagerTag: 'ul',
    nextPageLabel: '»',
    prevPageLabel: '«',
    firstPageLabel: null,
    lastPageLabel: null,
  };
  pageCount: number;
  generalOptions: GeneralButtonOptions;

  constructor(props: PagerProps) {
    super(props);
    this.pageCount = 0;
    this.generalOptions = {
      isFirstPage: false,
      isLastPage: false,
      isPrevPage: false,
      isNextPage: false,
    };
  }

  _addButton = (
    buttons: Array<React.Node>,
    pageButtonOptions: {idx: string | number, page: number, content: React.Node},
    tableId: string
  ) => {
    let options = Object.assign({}, this.generalOptions, pageButtonOptions);
    options.key = `pg-${tableId}-${pageButtonOptions.idx}`;
    buttons.push(<Button onPageButtonClick={ this.props.onPageButtonClick } { ...options } />);
  };

  _addFirstButton = (buttons: Array<React.Node>, currentPage: number, tableId: string) => {
    let page = 0;
    let isActive = currentPage === page;
    this._addButton(buttons, {
      page: page,
      content: this.props.firstPageLabel,
      active: isActive,
      disabled: isActive,
      isFirstPage: true,
      idx: 'f'
    }, tableId);
  };
  _addLastButton = (buttons: Array<React.Node>, currentPage: number, tableId: string) => {
    this._addButton(buttons, {
      page: this.pageCount - 1,
      content: this.props.lastPageLabel || this.pageCount,
      active: false,
      disabled: currentPage >= this.pageCount - 1,
      isLastPage: true,
      idx: 'l'
    }, tableId);
  };
  _addPrevButton = (buttons: Array<React.Node>, currentPage: number, tableId: string) => {
    let page;
    if ((page = currentPage - 1) < 0) {
      page = 0;
    }
    this._addButton(buttons, {
      page: page,
      content: this.props.prevPageLabel,
      active: false,
      disabled: currentPage <= 0,
      isPrevPage: true,
      idx: 'p'
    }, tableId);
  };
  _addNextButton = (buttons: Array<React.Node>, currentPage: number, tableId: string) => {
    let page;
    let penultimate = this.pageCount - 1;
    if ((page = (+currentPage) + 1) >= penultimate) {
      page = penultimate;
    }
    this._addButton(buttons, {
      page: page,
      content: this.props.nextPageLabel,
      active: false,
      disabled: currentPage >= penultimate,
      isNextPage: true,
      idx: 'n'
    }, tableId);
  };
  _addButtons = (buttons: Array<React.Node>, currentPage: number, tableId: string) => {
    let beginPage = Math.max(0, currentPage - Math.round(this.props.maxButtonCount / 2));
    let endPage = beginPage + this.props.maxButtonCount - 1;
    if (endPage >= this.pageCount) {
      endPage = this.pageCount - 1;
      beginPage = Math.max(0, endPage - this.props.maxButtonCount + 1);
    }
    const pageNumbers = []
    for (let i = beginPage, idx = 0; i <= endPage; ++i) {
      let isActive = currentPage === i;
      const content = i + 1
      this._addButton(buttons, {
        page: i,
        content,
        active: isActive,
        disabled: isActive,
        idx: idx++,
      }, tableId);
      pageNumbers.push(content)
    }
    return pageNumbers
  };
  render(): React.Node {
    return <PageContext.Consumer>{
      ({ tableId, currentPage, pageSize }) => {
        this.pageCount = Math.ceil(this.props.totalCount / pageSize) || 0;
        if (this.pageCount < 2) {
          return null;
        }
        let Tag = this.props.pagerTag;
        let buttons = [];
        let pages = [];
        const pageNumbers = this._addButtons(pages, currentPage, tableId);
        if (this.props.prevPageLabel) {
          this._addPrevButton(buttons, currentPage, tableId);
        }
        if (this.props.firstPageLabel && pageNumbers[0] > 1) {
          this._addFirstButton(buttons, currentPage, tableId);
        }
        buttons = [ ...buttons, ...pages ]
        if (this.props.lastPageLabel && pageNumbers.pop() < this.pageCount) {
          this._addLastButton(buttons, currentPage, tableId);
        }
        if (this.props.nextPageLabel) {
          this._addNextButton(buttons, currentPage, tableId);
        }
        return <Tag { ...this.props.pagerOptions }>
          { buttons }
        </Tag>;
      }
    }</PageContext.Consumer>;
  }
}

!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("prop-types"),require("react")):"function"==typeof define&&define.amd?define(["prop-types","react"],e):"object"==typeof exports?exports.YiiReactGridView=e(require("prop-types"),require("react")):t.YiiReactGridView=e(t.PropTypes,t.React)}(window,function(t,e){return function(t){var e={};function s(a){if(e[a])return e[a].exports;var r=e[a]={i:a,l:!1,exports:{}};return t[a].call(r.exports,r,r.exports,s),r.l=!0,r.exports}return s.m=t,s.c=e,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(a,r,function(e){return t[e]}.bind(null,r));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=3)}([function(e,s){e.exports=t},function(t,s){t.exports=e},function(t,e,s){"use strict";var a="0123456789",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",o="!$%^&*()_+|~-=`{}[]:;<>?,./";t.exports=function(t){var e,s,i="",n=(t=function(t){return t||(t={}),{length:t.length||8,numeric:"boolean"!=typeof t.numeric||t.numeric,letters:"boolean"!=typeof t.letters||t.letters,special:"boolean"==typeof t.special&&t.special,exclude:Array.isArray(t.exclude)?t.exclude:[]}}(t)).length,p=(t.exclude,function(t){var e="";t.numeric&&(e+=a),t.letters&&(e+=r),t.special&&(e+=o);for(var s=0;s<=t.exclude.length;s++)e=e.replace(t.exclude[s],"");return e}(t));for(e=1;e<=n;e++)i+=p.substring(s=Math.floor(Math.random()*p.length),s+1);return i}},function(t,e,s){"use strict";s.r(e);var a=s(1),r=s.n(a);var o=class extends a.Component{render(){return r.a.createElement("caption",this.props.options,this.props.text)}},i=s(0),n=s.n(i);class p extends a.Component{constructor(...t){var e;return e=super(...t),this.setSort=(t=>{let e;t.preventDefault(),e=this.props.content.sort?"ASC"===this.props.content.sort?"DESC":null:"ASC",this.props.setSort(t.target.getAttribute("data-column"),e)}),e}render(){let t=this.props.content;return t.value&&(t=t.enableSorting?r.a.createElement("a",{className:t.sort,onClick:this.setSort,"data-column":t.column},t.value):t.value),r.a.createElement("td",null,t)}}p.propTypes={content:n.a.oneOfType([n.a.string,n.a.node,n.a.object]),setSort:n.a.func};var l=p,h=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a])}return t};var c=class extends a.Component{render(){let t={};return this.props.setSort&&(t.setSort=this.props.setSort),r.a.createElement("tr",this.props.options,this.props.cells.map((e,s)=>r.a.createElement(l,h({key:`${this.props.id}-td-${s}`,content:e},t))))}},u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a])}return t};var g=class extends a.Component{constructor(t){super(t),this._renderFilters=(()=>{let t=[];for(let e in this.props.filters){let s=this.props.filters[e];t.push(this._prepareFilter(e,s))}return t}),this._getFieldName=(t=>`search-${this.props.tableId}-${t}`),this._renderFilter=((t,e,s={})=>{const a=this._getFieldName(t);switch(e){case"text":return r.a.createElement("input",u({name:a,type:"text"},s,{onChange:this.applyFilters}));case"checkbox":return r.a.createElement("input",u({name:a,type:"checkbox"},s,{onChange:this.applyFilters}));case"select":{let e=[];if(!s.data)throw new Error("Filter select has no options");let o=0;for(let t in s.data)e.push(r.a.createElement("option",{key:`${a}-${o++}`,value:t},s.data[t]));return delete s.data,r.a.createElement("select",u({name:this._getFieldName(t),onChange:this.applyFilters},s),e)}}return null}),this._prepareFilter=((t,e=null)=>{if(!e)return"";if("string"==typeof e)return this._renderFilter(t,e);if("object"==typeof e)return this._renderFilter(t,e.type,e.options||{});if("function"==typeof e)return e(this._getFieldName(t));throw new Error("Invalid filter param")}),this.applyFilters=(t=>{let e=Object.assign({},this.state.filters),s=t.target.name.split("-").pop();t.target.value?e[s]=t.target.value:delete e[s],this.setState({filters:e},()=>this.props.onFilterChange(this.state.filters))}),this.state={filters:{}}}render(){return r.a.createElement(c,{cells:this._renderFilters(),id:this.id,key:this.id})}};class d extends a.Component{constructor(t){super(t),this.filterTimeout=null,this.filterChanged=(t=>{this.filterTimeout&&clearTimeout(this.filterTimeout),this.filterTimeout=setTimeout(()=>this.props.onFilterChange(t),1e3*this.props.filterDelay)}),this.id=`th-${this.props.tableId}`}render(){let t=[r.a.createElement(c,{cells:this.props.headerCells,options:this.props.options,id:this.id,key:this.id,setSort:this.props.setSort})];return this.props.filters&&t.push(r.a.createElement(g,{key:`${this.id}-filters`,filters:this.props.filters,tableId:this.props.tableId,onFilterChange:this.filterChanged})),r.a.createElement("thead",null,t)}}d.propTypes={tableId:n.a.string,onFilterChange:n.a.func,filterDelay:n.a.number,headerCells:n.a.array,options:n.a.object,filters:n.a.object,setSort:n.a.func};var C=d;class f extends a.Component{render(){let t=this.props.data.map((t,e)=>{let s=`tr-${this.props.tableId}-${e}`;return r.a.createElement(c,{cells:t,options:this.props.options,id:s,key:s})});return r.a.createElement("tbody",null,t)}}f.propTypes={tableId:n.a.string,data:n.a.array,options:n.a.object},f.defaultProps={data:[],options:{}};var b=f;class P extends a.Component{constructor(t){super(t),this.id=`tf-${this.props.tableId}`}render(){return r.a.createElement("tfoot",null,r.a.createElement(c,{cells:this.props.footerCells,key:this.id,id:this.id}))}}P.propTypes={tableId:n.a.string,footerCells:n.a.array};var m=P;class v extends a.Component{constructor(...t){var e;return e=super(...t),this._prepareCell=((t,e,s)=>"function"==typeof s?s(t,e):"serial"===s?this.props.currentPage*this.props.pageSize+1+e:t),this._prepareRow=((t,e,s=!1)=>{let a=[];for(let r in this.props.columns){let o=this._prepareCell(t[r],e,this.props.columns[r]);if(s)if(this.props.headerCells&&this.props.headerCells[r])"string"==typeof(o=this.props.headerCells[r])&&(o={value:o,enableSorting:!0,column:r,sort:this.props.sort[r]});else{let t=r.replace(/([A-Z])/g," $1");o=(t.charAt(0).toUpperCase()+t.slice(1)).replace(/_/g," ")}o||(o=this.props.notSetText),a.push(o)}return a}),this._prepareFilters=(()=>{let t={};for(let e in this.props.columns)t[e]=this.props.filters[e];return t}),e}render(){let t,e=!0;if(this.props.data&&this.props.data.length?t=[r.a.createElement(b,{data:this.props.data.map((t,e)=>this._prepareRow(t,e)),options:this.props.rowOptions,tableId:this.props.tableId,key:`tbody-${this.props.tableId}`})]:(t=[],e=!1),this.props.showHeader&&t.unshift(r.a.createElement(C,{headerCells:this._prepareRow(this.props.headerCells,null,!0),options:this.props.headerRowOptions,tableId:this.props.tableId,filters:this.props.filters?this._prepareFilters():null,onFilterChange:this.props.onFilterChange,filterDelay:this.props.filterDelay,key:`thead-${this.props.tableId}`,setSort:this.props.setSort})),this.props.caption||!e){let s={options:this.props.captionOptions,key:`tcaption-${this.props.tableId}`,text:e?this.props.caption:this.props.emptyCaption};t[e?"unshift":"push"](r.a.createElement(o,s))}if(this.props.showFooter){let e=r.a.createElement(m,{footerCells:this.props.footerCells,options:this.props.footerRowOptions,tableId:this.props.tableId,key:`tfoot-${this.props.tableId}`});this.placeFooterAfterBody?t.push(e):t.unshift(e)}return r.a.createElement("table",this.props.tableOptions,t)}}v.defaultProps={headerCells:{},footerCells:[],captionOptions:{},tableOptions:{},showHeader:!0,showFooter:!1,headerRowOptions:{},footerRowOptions:{},rowOptions:{},filters:null,filterDelay:3,notSetText:"(not set)",emptyCaption:"Nothing found"};var y=v,x=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a])}return t};class O extends a.Component{constructor(...t){var e;return e=super(...t),this.clickTag=(t=>{t.preventDefault(),this.props.disabled||this.props.onPageButtonClick(this.props.page)}),e}render(){let t=this.props.pageTag,e="a",s={};return s.className=this.props.className,"string"==typeof s.className?s.className=s.className.split(" "):s.className=[],this.props.isNextPage&&s.className.push(this.props.nextPageCssClass),this.props.isPrevPage&&s.className.push(this.props.prevPageCssClass),this.props.isLastPage&&s.className.push(this.props.lastPageCssClass),this.props.isFirstPage&&s.className.push(this.props.firstPageCssClass),this.props.active&&s.className.push(this.props.activePageCssClass),this.props.disabled&&(s.className.push(this.props.disabledPageCssClass),e="span"),s.className.length?s.className=s.className.join(" "):delete s.className,r.a.createElement(t,null,r.a.createElement(e,x({onClick:this.clickTag},s),this.props.content))}}O.defaultProps={pageTag:"li",activePageCssClass:"active",disabledPageCssClass:"disabled",nextPageCssClass:"next",prevPageCssClass:"prev",firstPageCssClass:"first",lastPageCssClass:"last",onPageButtonClick:null};var S=O;class _ extends a.Component{constructor(t){super(t),this.componentDidUpdate=(()=>{this.pageCount=Math.ceil(this.props.totalCount/this.props.pageSize)||0}),this._addButton=((t,e)=>{let s=Object.assign({},this.generalOptions,e,this.buttonSettings);s.key=`pg-${this.props.tableId}-${e.idx}`,t.push(r.a.createElement(S,s))}),this._addFirstButton=(t=>{let e=0===this.props.currentPage;this._addButton(t,{page:0,content:this.props.firstPageLabel,active:e,disabled:e,isFirstPage:!0,idx:"f"})}),this._addLastButton=(t=>{this._addButton(t,{page:this.pageCount-1,content:this.props.lastPageLabel||this.pageCount,active:!1,disabled:this.props.currentPage>=this.pageCount-1,isLastPage:!0,idx:"l"})}),this._addPrevButton=(t=>{let e;(e=this.props.currentPage-1)<0&&(e=0),this._addButton(t,{page:e,content:this.props.prevPageLabel,active:!1,disabled:this.props.currentPage<=0,isPrevPage:!0,idx:"p"})}),this._addNextButton=(t=>{let e,s=this.pageCount-1;(e=+this.props.currentPage+1)>=s&&(e=s),this._addButton(t,{page:e,content:this.props.nextPageLabel,active:!1,disabled:this.props.currentPage>=s,isNextPage:!0,idx:"n"})}),this._addButtons=(t=>{let e=Math.max(0,this.props.currentPage-Math.round(this.props.maxButtonCount/2)),s=e+this.props.maxButtonCount-1;s>=this.pageCount&&(s=this.pageCount-1,e=Math.max(0,s-this.props.maxButtonCount+1));for(let a=e,r=0;a<=s;++a){let e=this.props.currentPage==a;this._addButton(t,{page:a,content:a+1,active:e,disabled:e,idx:r++})}}),this.buttonSettings={},({activePageCssClass:this.buttonSettings.activePageCssClass,disabledPageCssClass:this.buttonSettings.disabledPageCssClass,nextPageCssClass:this.buttonSettings.nextPageCssClass,prevPageCssClass:this.buttonSettings.prevPageCssClass,lastPageCssClass:this.buttonSettings.lastPageCssClass,firstPageCssClass:this.buttonSettings.firstPageCssClass,pageTag:this.buttonSettings.pageTag,onPageButtonClick:this.buttonSettings.onPageButtonClick}=this.props),this.generalOptions={isFirstPage:!1,isLastPage:!1,isPrevPage:!1,isNextPage:!1}}render(){let t=this.props.pagerTag,e=[];return this.props.firstPageLabel&&this._addFirstButton(e),this.props.prevPageLabel&&this._addPrevButton(e),this._addButtons(e),this.props.nextPageLabel&&this._addNextButton(e),this.props.lastPageLabel&&this._addLastButton(e),r.a.createElement(t,this.props.pagerOptions,e)}}_.defaultProps={maxButtonCount:10,pageSize:20,pagerTag:"ul",nextPageLabel:"»",prevPageLabel:"«",firstPageLabel:null,lastPageLabel:null};var j=_,w=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a])}return t};class F extends a.Component{constructor(t){super(t),this.setSort=((t,e)=>{if(this.props.onSortChange){let s=w({},this.state.sort);e?s[t]=e:delete s[t],this.setState({sort:s}),this.props.onSortChange(this.state.sort)}}),this.id=s(2)(),this.state={sort:{}}}render(){const t={currentPage:this.props.currentPage,pageSize:this.props.pageSize,tableId:this.id};let e={},s={};var a=this.props;return({pagerOptions:e.pagerOptions,totalCount:e.totalCount,maxButtonCount:e.maxButtonCount,pagerTag:e.pagerTag,pageTag:e.pageTag,activePageCssClass:e.activePageCssClass,disabledPageCssClass:e.disabledPageCssClass,nextPageCssClass:e.nextPageCssClass,prevPageCssClass:e.prevPageCssClass,firstPageCssClass:e.firstPageCssClass,lastPageCssClass:e.lastPageCssClass,nextPageLabel:e.nextPageLabel,prevPageLabel:e.prevPageLabel,firstPageLabel:e.firstPageLabel,lastPageLabel:e.lastPageLabel,onPageButtonClick:e.onPageButtonClick}=a),(s=function(t,e){var s={};for(var a in t)e.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(t,a)&&(s[a]=t[a]);return s}(a,["pagerOptions","totalCount","maxButtonCount","pagerTag","pageTag","activePageCssClass","disabledPageCssClass","nextPageCssClass","prevPageCssClass","firstPageCssClass","lastPageCssClass","nextPageLabel","prevPageLabel","firstPageLabel","lastPageLabel","onPageButtonClick"])).sort=this.state.sort,s.setSort=this.setSort,r.a.createElement("div",this.props.containerOptions,r.a.createElement(y,w({},t,s)),r.a.createElement(j,w({},t,e)))}}F.propTypes={data:n.a.array,headerCells:n.a.object,footerCells:n.a.array,caption:n.a.string,captionOptions:n.a.object,containerOptions:n.a.object,tableOptions:n.a.object,showHeader:n.a.bool,showFooter:n.a.bool,headerRowOptions:n.a.object,footerRowOptions:n.a.object,rowOptions:n.a.object,columns:n.a.object,filters:n.a.object,onSortChange:n.a.func,onFilterChange:n.a.func,filterDelay:n.a.number,pagerOptions:n.a.object,currentPage:n.a.number,totalCount:n.a.number,maxButtonCount:n.a.number,pageSize:n.a.number,pagerTag:n.a.string,pageTag:n.a.string,activePageCssClass:n.a.string,disabledPageCssClass:n.a.string,nextPageCssClass:n.a.string,prevPageCssClass:n.a.string,firstPageCssClass:n.a.string,lastPageCssClass:n.a.string,nextPageLabel:n.a.string,prevPageLabel:n.a.string,firstPageLabel:n.a.string,lastPageLabel:n.a.string,onPageButtonClick:n.a.func,notSetText:n.a.string,emptyCaption:n.a.string},F.defaultProps={containerOptions:{className:"grid-view"},tableOptions:{className:["table","table-striped","table-bordered"].join(" ")}};e.default=F}])});
import React, { Component } from 'react';
import RowLayout from './RowLayout';
import PropTypes from 'prop-types';
import createTableSection from './tableSection';
import { DEFAULT_COLUMN_WIDTH, SCROLLBAR_WIDTH } from '../constants';
import Pager from './Pager';
import functions from '../functions';
import Site from '@jsroot/common/site';

const clientWidth = document.body.clientWidth;

class Table extends Component {
    static propTypes = {
        onSort: PropTypes.func,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        maxWidth: PropTypes.number,
        minWidth: PropTypes.number,
        autoWidth: PropTypes.bool,
        bodyHeight: PropTypes.number,
        autoHeight: PropTypes.bool,
        header: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]).isRequired,
        body: PropTypes.arrayOf(PropTypes.object),
        footer: PropTypes.arrayOf(PropTypes.object),
        isPaging: PropTypes.bool,
        onPaging: PropTypes.func,
        pageOption: PropTypes.object,
        adjustedHeight: PropTypes.number,
        containerPadding: PropTypes.number,
        shouldResetScrollPosition: PropTypes.bool
    };

    static defaultProps = {
        onSort: null,
        width: clientWidth,
        maxWidth: clientWidth,
        autoWidth: true,
        isPaging: false,
        adjustedHeight: 0,
        bodyHeight: 0,
        autoHeight: true,
        containerPadding: 30,
        shouldResetScrollPosition: true
    };

    constructor(props) {
        super(props);

        this.bodyWrapper = null;
        this.footerWrapper = null;

        const headerContainerProps = { className: 'header-content', isHeader: true };
        this.Header = createTableSection(headerContainerProps);

        const bodyContainerProps = { className: 'body-content', getRef: element => this.bodyWrapper = element };
        this.Body = createTableSection(bodyContainerProps);

        const footerContainerProps = { className: 'footer-content', getRef: element => this.footerWrapper = element };
        this.Footer = createTableSection(footerContainerProps);

        const { maxWidth, bodyHeight, adjustedHeight } = this.props;
        const maxWidthValue = maxWidth || clientWidth;

        this.diffWidth = clientWidth - maxWidthValue;
        this.adjustedHeight = adjustedHeight;

        this.debounceResizing = Site.debounce(this._handleResize);

        this.state = {
            maxWidth: maxWidthValue,
            contentHeight: bodyHeight,
            columnsWidth: this._getColumnsWidth(props.header)
        };
    }

    componentDidMount() {
        this._handleResize();
        window.addEventListener('resize', this.debounceResizing);
    }

    componentDidUpdate(prevProps) {
        if (this.props.maxWidth !== prevProps.maxWidth) {
            const maxWidthValue = this.props.maxWidth || clientWidth;
            this.diffWidth = clientWidth - maxWidthValue;
            this.setState({ maxWidth: maxWidthValue });
        }

        if (this.props.header !== prevProps.header || this.props.maxWidth !== prevProps.maxWidth) {
            this.setState({ columnsWidth: this._getColumnsWidth(this.props.header) });
        }

        if (this.props.shouldResetScrollPosition && prevProps.body !== this.props.body) {
            functions.scrollToTop(this.bodyWrapper, 200);
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.debounceResizing);
    }

    get columnWidthSum() {
        const columnsWidth = this.state.columnsWidth;
        return !columnsWidth || !columnsWidth.length || columnsWidth.find(x => typeof x !== 'number') ?
            null : columnsWidth.reduce((prev, current) => prev + current, 0);
    }

    _getNextColspanCells(cells, fromCellIndex, toCellIndex) {
        const colspanCells = [];
        let toCellInternalIndex = toCellIndex;
        for (let i = fromCellIndex; i <= toCellInternalIndex; i++) {
            const cell = cells[i];
            const hasNext = i < cells.length;
            if (!(!cell && hasNext)) {
                if (cell.props.colSpan) {
                    toCellInternalIndex -= 1;
                }

                colspanCells.push(cell);
            } else {
                toCellInternalIndex += 1;
            }
        }

        return colspanCells;
    }

    _getColumnsWidth(headerRows) {
        const headerIsArray = Array.isArray(headerRows);
        if (headerIsArray && headerRows.length === 0) {
            return null;
        }

        const columnsWidth = [];
        const currentNextCellIndexByRow = {};
        const currentRowIndex = 0;
        const cellList = headerIsArray ? headerRows[currentRowIndex].props.children : headerRows.props.children;
        this._getWidthByCells(headerRows, columnsWidth, currentNextCellIndexByRow, cellList, currentRowIndex);

        return columnsWidth;
    }

    _getWidthByCells = (headerRows, columnsWidth, currentNextCellIndexByRow, cells, currentRowIndex) => {
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            if (cell) {
                this._handleWidthOneCell(headerRows, columnsWidth, currentNextCellIndexByRow, cell, currentRowIndex);
            }
        }
    };

    _handleWidthOneCell = (headerRows, columnsWidth, currentNextCellIndexByRow, cell, currentRowIndex) => {
        const cellProps = cell.props;
        const colspan = Number(cellProps.colSpan);

        if (colspan && colspan > 1) {
            const nextRowIndex = currentRowIndex + 1;
            if (currentNextCellIndexByRow[nextRowIndex] === undefined) {
                currentNextCellIndexByRow[nextRowIndex] = 0;
            }

            const fromNextCellIndex = currentNextCellIndexByRow[nextRowIndex];
            const toNextCellIndex = fromNextCellIndex + colspan - 1;
            const nextCells = headerRows[nextRowIndex].props.children;

            const nextColspanCells = this._getNextColspanCells(nextCells, fromNextCellIndex, toNextCellIndex);
            currentNextCellIndexByRow[nextRowIndex] += nextColspanCells.length;
            this._getWidthByCells(headerRows, columnsWidth, currentNextCellIndexByRow, nextColspanCells, nextRowIndex);
        } else {
            const cellWidth = cellProps.colWidth ? cellProps.colWidth : DEFAULT_COLUMN_WIDTH;
            columnsWidth.push(cellWidth);
        }
    };

    _handleResize = event => {
        event && event.preventDefault();

        if (this.bodyWrapper && this.props.autoHeight) {
            const bodyHeight = this._calculateBodyHeight();
            if (this.state.contentHeight !== bodyHeight) {
                this.setState({ contentHeight: bodyHeight });
            }
        }

        const maxWidth = document.body.clientWidth - this.diffWidth;
        if (this.state.maxWidth !== maxWidth) {
            this.setState({ maxWidth });
        }
    };

    _calculateBodyHeight() {
        const windowHeight = window.innerHeight;
        const footerHeight = this.footerWrapper ? this.footerWrapper.offsetHeight : 0;
        const tableContentHeight = windowHeight - (this.bodyWrapper.offsetTop + footerHeight + 70) - this.adjustedHeight;

        return tableContentHeight;
    }

    _getUpdatedColumnLayout() {
        const { width, autoWidth, containerPadding } = this.props;
        let sumOfColumnWidth = autoWidth ? this.state.maxWidth : width;
        sumOfColumnWidth = sumOfColumnWidth - containerPadding - SCROLLBAR_WIDTH;

        const newColumnsWidth = this.columnWidthSum && this.state.columnsWidth.map(cellWidth =>
            sumOfColumnWidth / this.columnWidthSum * cellWidth);

        return newColumnsWidth;
    }

    render() {
        const { width, autoWidth, minWidth, header, body, footer, isPaging, pageOption, onPaging, containerPadding } = this.props;
        const maxWidth = this.state.maxWidth - containerPadding;
        const actualWidth = width - containerPadding;
        const newColumnLayout = this.columnWidthSum && this.columnWidthSum !== actualWidth ?
            this._getUpdatedColumnLayout() :
            this.state.columnsWidth;

        if (!newColumnLayout) {
            return null;
        }

        const sectionProps = { width: actualWidth, autoWidth, minWidth, maxWidth };
        const headerSectionProps = { onSort: this.props.onSort, width: actualWidth, autoWidth, minWidth, maxWidth };
        const rowLayout = <RowLayout columnLayout={newColumnLayout} />;
        const { Header, Body, Footer } = this;

        return (
            <div>
                <div className='table-container' style={{ maxWidth }}>
                    <Header {...headerSectionProps}>
                        {rowLayout}
                        {header}
                    </Header>
                    {
                        body &&
                        <Body {...sectionProps} maxHeight={this.state.contentHeight}>
                            {rowLayout}
                            {body}
                        </Body>
                    }
                    {
                        footer &&
                        <Footer {...sectionProps}>
                            {rowLayout}
                            {footer}
                        </Footer>
                    }
                </div>
                {
                    isPaging && pageOption &&
                    <Pager pageOption={pageOption} onPaging={onPaging} {...sectionProps} />
                }
            </div>
        );
    }
}

export default Table;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SCROLLBAR_WIDTH } from '../constants';

const createTableSection = (extendedContainerProps, extendedTableProps) => {
    return class TableSection extends Component {
        static propTypes = {
            onSort: PropTypes.func,
            tableClass: PropTypes.string,
            width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            maxWidth: PropTypes.number.isRequired,
            minWidth: PropTypes.number,
            autoWidth: PropTypes.bool,
            maxHeight: PropTypes.number
        };

        static defaultProps = {
            onSort: null,
            tableClass: "table",
            autoWidth: true
        };

        constructor(props) {
            super(props);
            this.state = {
                sortBy: null,
                sortOrder: null
            };
        }

        get containerWidth() {
            const { autoWidth, maxWidth, width } = this.props;
            return autoWidth ? maxWidth : width;
        }

        get containerStyle() {
            const { minWidth, maxHeight } = this.props;

            return {
                ...this.props.style,
                width: this.containerWidth,
                minWidth,
                maxHeight
            };
        }

        get tableStyle() {
            const { minWidth } = this.props;
            const maxWidth = minWidth ? Math.max(this.containerWidth, minWidth) : this.containerWidth;
            const tableWidth = maxWidth - SCROLLBAR_WIDTH;

            return {
                width: tableWidth
            };
        }

        _renderHeaderChildren() {
            const children = this.props.children;
            const { sortBy, sortOrder } = this.state;

            // register onSort event
            return React.Children.map(children, child => React.cloneElement(child, { onSort: this.onSort, sortBy, sortOrder }));
        }

        onSort = (sortBy, sortOrder) => {
            const onSort = this.props.onSort;
            this.setState({
                sortBy: sortBy,
                sortOrder: sortOrder
            },
            () => {
                onSort && onSort(sortBy, sortOrder)
            })
        }

        render() {
            const { onSort, tableClass, width, autoWidth, maxWidth, minWidth, maxHeight, ...rest } = this.props;
            const { isHeader, getRef, ...restContainerProps } = extendedContainerProps;

            return (
                <div {...rest} style={this.containerStyle} ref={getRef} {...restContainerProps}>
                    <div className="table-wrapper">
                        <table style={this.tableStyle} className={tableClass} {...extendedTableProps}>
                            {
                                isHeader ?
                                    <thead>{this._renderHeaderChildren()}</thead> :
                                    <tbody>{this.props.children}</tbody>
                            }
                        </table>
                    </div>
                </div>
            );
        }
    };
};

export default createTableSection;
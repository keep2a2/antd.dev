import React from 'react'
import { Table } from 'antd'
import _ from 'lodash'
import './index.less'

class TableSelection extends React.Component {
    dataSource = null
    keyField = null

    constructor(props) {
        super(props)
        this.state = {
            showItems: []
        }
    }

    componentDidMount() {
        const { dataSet, filters } = this.props
        if (dataSet) this.keyField = dataSet.keyField;
        this.dataSource = this.getDataSource(dataSet, filters);

        this.setState({ showItems: this.dataSource })
    }

    componentWillReceiveProps(nextProps) {
        const { dataSet, filters } = nextProps
        if (dataSet) this.keyField = dataSet.keyField;
        this.dataSource = this.getDataSource(dataSet, filters);

        this.setState({
            showItems: this.dataSource
        })
    }

    getDataSource = (dataSet, filters) => {
        if (!dataSet) return [];

        let dataSource = [];
        const keyField = this.keyField ? this.keyField : 'key';

        dataSet.datas.forEach(data => {
            let item = {};
            dataSet.fields.forEach((field, index) => {
                item[field.code] = data[index];
                if (keyField === field.code) {
                    item.key = data[index];
                }
            })
            dataSource.push(item);
        });

        // apply filters
        let filterKeys = filters ? Object.keys(filters) : [];
        filterKeys = filterKeys.filter(k => filters[k] && filters[k].length);
        if (filterKeys.length) {
            dataSource = dataSource.filter(item => {
                let matchNum = 0;
                for (let k of filterKeys) {
                    if (filters[k].includes(item[k])) {
                        matchNum++;
                    }
                }
                return matchNum === filterKeys.length;
            });
        }

        return dataSource;
    }

    getColumns = (dataSet) => {
        if (!dataSet) return [];

        let columns = [];

        dataSet.displayFields.forEach(fieldcode => {
            const field = dataSet.fields.find(item => fieldcode === item.code);
            if(field){
                columns.push({
                    title: field.label || field.code,
                    dataIndex: field.code,
                    // sorter: (a, b) => a.age - b.age,
                    // sortDirections: ['descend', 'ascend'],
                })
            }
        })

        return columns;
    }

    getRowSelection = () => {
        const selectedKeys = undefined === selectedKeys ? this.state.selectedKeys : this.props.selectedKeys;

        return {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

                const validkeys = selectedRows.map(item => item.key);

                this.props.onChange(_.uniq(validkeys));
            },
            getCheckboxProps: record => ({
                name: record.name,
            }),
            selectedRowKeys: this.props.selectedKeys,
        };
    }

    render() {
        const { dataSet } = this.props
        const { showItems } = this.state

        const columns = this.getColumns(dataSet);
        const rowSelection = this.getRowSelection();

        return (
            <div className="table-selection">
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={showItems}
                    size="small"
                    pagination={{
                        pageSize: 6,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        showTotal: total => `共 ${total} 条`,
                    }}
                // scroll={{ y: 220 }}
                />
            </div>
        )
    }
}

export default TableSelection
import React from 'react'
import { Input, Table } from 'antd'

import './index.less'

const Search = Input.Search;

class TableSelection extends React.Component{
    dataSource = null
    keyField = null

    constructor(props){
        super(props)
        this.state = {
            showItems: []
        }
    }

    componentDidMount(){
        this.keyField = 'name';
        this.dataSource = this.getDataSource(this.props.dataSet);
        
        this.setState({
            showItems: this.dataSource
        })
    }

    componentWillReceiveProps(nextProps){
        this.dataSource = this.getDataSource(nextProps.dataSet);
        
        this.setState({
            showItems: this.dataSource
        })
    }

    handleSearch = (keyword) => {
        const items = this.dataSource.filter(item => item.key.indexOf(keyword) > -1)
        this.setState({showItems: items})
    }

    getDataSource = (dataSet) => {
        let dataSource = [];
        const keyField = this.keyField ? this.keyField : 'key';
        
        dataSet.datas.forEach( data => {
            let item = {};
            dataSet.fields.forEach((field, index) => {
                item[field.code] = data[index];
                if(keyField === field.code){
                    item.key = data[index];
                }
            })
            dataSource.push(item);
        });

        return dataSource;
    }

    getColumns = (dataSet) => {
        let columns = [];
        
        dataSet.fields.forEach(field => {
            columns.push({
                title: field.label || field.code,
                dataIndex: field.code,
                // sorter: (a, b) => a.age - b.age,
                // sortDirections: ['descend', 'ascend'],
            })
        });
        
        return columns;
    }

    getRowSelection = () => {
        return {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.props.onChange(selectedRowKeys);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
            selectedRowKeys: this.props.selectedKeys,
        };
    }

    render(){
        const {dataSet} = this.props
        const {showItems} = this.state
         
        const columns = this.getColumns(dataSet);
        const rowSelection = this.getRowSelection();

        return (
            <div className="table-selection">
                <Search
                    placeholder="input search text"
                    onSearch={this.handleSearch}
                />
                <Table 
                    rowSelection={rowSelection} 
                    columns={columns} 
                    dataSource={showItems}
                    size="small"
                />
            </div>
        )
    }
}

export default TableSelection
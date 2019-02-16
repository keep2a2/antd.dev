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
        const {dataSet, filters} = this.props
        this.dataSource = this.getDataSource(dataSet, filters);
        
        this.setState({
            showItems: this.dataSource
        })
    }

    componentWillReceiveProps(nextProps){
        const {dataSet, filters} = nextProps
        this.dataSource = this.getDataSource(dataSet, filters);
        
        this.setState({
            showItems: this.dataSource
        })
    }

    handleSearch = (keyword) => {
        const items = this.dataSource.filter(item => {
            let match = false
            const keys = Object.keys(item)
            for(let k of keys){
                if(String(item[k]).indexOf(keyword) > -1){
                    match = true
                    break
                }
            }
            return match
        })
        this.setState({showItems: items})
    }

    getDataSource = (dataSet, filters) => {
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

        const filterKeys = filters ? Object.keys(filters): [];
        if(filterKeys.length){
            dataSource = dataSource.filter(item => {
                let matchNum = 0;
                for(let k of filterKeys){
                    if(filters[k].includes(item[k])){
                        matchNum ++;
                    }
                }
                return matchNum === filterKeys.length;
            });
        }

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
        const selectedKeys = undefined === selectedKeys ? this.state.selectedKeys : this.props.selectedKeys;

        return {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

                const validkeys = selectedRows.map(item => item.key);
                this.props.onChange(validkeys);
            },
            getCheckboxProps: record => ({
                name: record.name,
            }),
            selectedRowKeys: this.props.selectedKeys,
        };
    }

    render(){
        const {dataSet, showSearch} = this.props
        const {showItems} = this.state
         
        const columns = this.getColumns(dataSet);
        const rowSelection = this.getRowSelection();

        return (
            <div className="table-selection">
                {showSearch && (<Search
                    placeholder="input search text"
                    onSearch={this.handleSearch}
                />)}
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
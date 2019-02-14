import React from 'react'
import { Table } from 'antd'

import './index.less'

class TableSelection extends React.Component{
    getDataSource = (dataSet, keyField = 'key') => {
        let dataSource = [];
        
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
                title: field.label || field.ocde,
                dataIndex: field.code,
                sorter: (a, b) => a.age - b.age,
                sortDirections: ['descend', 'ascend'],
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
        const dataSource = this.getDataSource(dataSet);
        const columns = this.getColumns(dataSet);
        const rowSelection = this.getRowSelection();

        return (
            <Table 
                rowSelection={rowSelection} 
                columns={columns} 
                dataSource={dataSource}
                size="small"
            />
        )
    }
}

export default TableSelection
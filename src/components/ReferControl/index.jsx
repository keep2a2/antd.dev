import React from 'react'
import { Input, Modal} from 'antd'
import FilterPanel from '../FilterPanel'
import TableSelection from '../TableSelection'

import './index.less'

class ReferControl extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modalVisible: false,
            value: [3, 5],
        }
    }

    openModal = () => {
        this.setState({modalVisible: true})
    }

    handleModalCancel = () => {
        this.setState({modalVisible: false})
    }

    handleModalOk = () => {
        this.setState({modalVisible: false})
    }

    handleTableChange = (value) => {
        this.setState({value})
    }

    handleInputChange = (value) => {
        const newValue = value.length ? value.split(',') : []
        this.setState({value: newValue})
    }

    render(){
        const {dataSource} = this.props        
        const {value} = this.state

        const suffix = <i className="icon ap ap-navmenu-light" onClick={this.openModal}/>;

        return (
            <div className="refer-control">
                <Input 
                    // allowClear={true}
                    suffix={suffix}
                    value={value.join(',')}
                    onChange={this.handleInputChange}
                />

                <Modal
                    className="refer-modal"
                    title="参照"
                    visible={this.state.modalVisible}
                    onOk={this.handleModalOk}
                    onCancel={this.handleModalCancel}
                    width={800}
                >
                    <FilterPanel 
                        dataSet={dataSource}
                        onOk={(filters) => {
                            console.log(filters)
                        }}
                    />
                    <TableSelection
                        showSearch={false}
                        dataSet={dataSource}
                        onChange={this.handleTableChange}
                        selectedKeys={value}
                    />
                </Modal>
            </div>
        )
    }
}

export default ReferControl
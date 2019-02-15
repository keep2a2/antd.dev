import React from 'react'
import { Input, Popover} from 'antd'
import TableSelection from '../TableSelection'

import './index.less'

class DropdownControl extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            dropdownVisible: false,
            value: [3, 5],
        }
    }

    toggleDropdown = () => {
        this.setState({ dropdownVisible: !this.state.dropdownVisible });
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
        const {value,dropdownVisible} = this.state

        const popoverContent = (
            
            <TableSelection
                showSearch={true}
                dataSet={dataSource}
                onChange={this.handleTableChange}
                selectedKeys={value}
            />
        );

        const suffix = (<i 
            className="icon ap ap-anglepointingtodown-copy" 
            onClick={this.toggleDropdown}
        />);

        return (
            <div className={`dropdown-control ${dropdownVisible ? 'spread':'collapse'}`} >
                <Popover
                    overlayClassName="dropdown-control-popover"
                    placement="bottom"
                    content={popoverContent}
                    trigger="click"
                    visible={dropdownVisible}
                    onVisibleChange={visible => {
                        this.setState({dropdownVisible: visible})
                    }}
                >
                    <Input 
                        // allowClear={true}
                        suffix={suffix}
                        value={value.join(',')}
                        onChange={this.handleInputChange}
                    />
                </Popover>
            </div>
        )
    }
}

export default DropdownControl
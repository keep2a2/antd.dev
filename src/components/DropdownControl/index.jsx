import React from 'react'
import { Input, Popover} from 'antd'
import TableSelection from '../TableSelection'
import './index.less'

const Search = Input.Search;

class DropdownControl extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            dropdownVisible: false,
            value: [],
            showItems: [],
            keyword: '',
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

    handleSearch = (keyword) => {
        const {dataSource} = this.props
        const items = dataSource.datas.filter(item => {
            let match = false
            const keys = Object.keys(item)
            for (let k of keys) {
                if (String(item[k]).indexOf(keyword) > -1) {
                    match = true
                    break
                }
            }
            return match
        })
        this.setState({ showItems: items, keyword })
    }

    render(){
        const {dataSource, showSearch} = this.props
        const {value, dropdownVisible, showItems, keyword} = this.state

        const dataSourceNew = {
            ...dataSource,
            datas: keyword ? showItems : dataSource.datas,
        }

        const popoverContent = (
            <React.Fragment>
                {showSearch && (<Search
                    placeholder="input search text"
                    onSearch={this.handleSearch}
                />)}
                <TableSelection
                    showSearch={true}
                    dataSet={dataSourceNew}
                    onChange={this.handleTableChange}
                    selectedKeys={value}
                />
            </React.Fragment>
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
                        size={'small'}
                    />
                </Popover>
            </div>
        )
    }
}

export default DropdownControl
import React from 'react'
import {Select, Button} from 'antd'
import './index.less'
import _ from 'lodash'

const Option = Select.Option;

class FilterPanel extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            filters: {}
        }
    }

    handleOk = () => {
        const {onOk} = this.props
        onOk && onOk(this.state.filters)
    }

    handleReset = () => {
        this.setState({filters: {}})
    }

    handleChange = (value, option) => {
        let fieldCode = option.props.fieldcode
        let filters = {...this.state.filters}
        filters[fieldCode] = value;
        this.setState({filters})
    }

    renderFilters = (fields, datas) => {
        const {filters} = this.state

        return fields.map((field, index) => {
            
            const options = _.uniqBy(datas, item => item[index])

            return (
                <div className="filter-component" key={index}>
                    <label>{field.label || field.code}</label>
                    <Select
                        onChange={this.handleChange}
                        value={filters[field.code]}
                        style={{width: '100%'}}
                    >
                        { 
                            options.map(item => (
                                <Option 
                                    key={item[index]}
                                    value={item[index]}
                                    fieldcode={field.code}
                                >{item[index]}</Option>
                            ))
                        }
                    </Select>
                </div>
            )
        })
    }

    render(){
        const {dataSet} = this.props

        return (
            <div className="filter-panel" >
                {this.renderFilters(dataSet.fields, dataSet.datas)}
                <div className="operations">
                    <Button type="primary" size='small' onClick={this.handleOk}>搜索</Button>
                    <Button type="default" size='small' onClick={this.handleReset}>重置</Button>
                </div>
            </div>
        )
    }
}

export default FilterPanel
import React from "react";
import { Select } from "antd";
import _ from "lodash";

const { Option } = Select;

class SelectControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [],
            showItems: [],
            keyword: ""
        };
    }

    onChange = val => {
        let value = typeof val === "string" ? [val] : val;
        this.setState({ value });
        this.props.onChange && this.props.onChange(value);
    };

    getOptions = dataSource => {
        if (!dataSource) return [];
        let options = [];
        const valIndex = dataSource.fields.findIndex(
            item => dataSource.keyField === item.code
        );
        const labelIndex = dataSource.fields.findIndex(
            item => dataSource.displayFields[0] === item.code
        );
        if (valIndex > -1) {
            dataSource.datas.forEach(item => {
                options.push({
                    val: item[valIndex],
                    label: item[labelIndex]
                });
            });
        }
        return _.uniqBy(options, item => item.val);
    };

    // 过滤掉不合法的value
    filterValues = (value, options) => {
        const keys = options.map(item => item.val);
        if (Array.isArray(value)) {
            return value.filter(item => keys.includes(item));
        } else if (null === value) {
            return [];
        } else {
            return value;
        }
    };

    render() {
        const { dataSource, showSearch, isMultiple } = this.props;
        const options = this.getOptions(dataSource);

        let value = this.props.value ? this.props.value : this.state.value;
        value = this.filterValues(this.state.value, options);

        return (
            <div className="select-control">
                <Select
                    size={"small"}
                    showSearch={showSearch}
                    style={{ width: "100%" }}
                    mode={isMultiple ? "multiple" : null}
                    loading={this.state.isLoading}
                    onChange={this.onChange}
                    value={value}
                >
                    {options.map(({ val, label }) => {
                        return (
                            <Option value={val} key={val}>
                                {label}
                            </Option>
                        );
                    })}
                </Select>
            </div>
        );
    }
}

export default SelectControl;

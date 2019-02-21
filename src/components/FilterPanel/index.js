import React from "react";
import { Select, Button } from "antd";
import "./index.less";
import _ from "lodash";

const Option = Select.Option;

class FilterPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: {}
        };
    }

    handleOk = () => {
        const { onOk } = this.props;
        onOk && onOk(this.state.filters);
    };

    handleReset = () => {
        this.setState({ filters: {} });
    };

    handleChange = (value, fieldCode) => {
        let filters = { ...this.state.filters };
        filters[fieldCode] = value;
        this.setState({ filters });
    };

    renderFilters = dataSet => {
        const { filters } = this.state;
        if (!dataSet || !dataSet.displayFields) return false;

        return dataSet.displayFields.map(fieldcode => {
            const fieldIdx = dataSet.fields.findIndex(
                item => fieldcode === item.code
            );
            const field = dataSet.fields[fieldIdx];
            if(!field) return null;
            const options = _.uniqBy(dataSet.datas, item => item[fieldIdx]);

            return (
                <div className="filter-component" key={fieldIdx}>
                    <label>{field.label || field.code}</label>
                    <Select
                        mode="multiple"
                        onChange={value => {
                            this.handleChange(value, field.code);
                        }}
                        value={filters[field.code]}
                        style={{ width: "100%" }}
                        size={'small'}
                    >
                        {options.map(item => (
                            <Option
                                key={item[fieldIdx]}
                                value={item[fieldIdx]}
                                fieldcode={field.code}
                            >
                                {item[fieldIdx]}
                            </Option>
                        ))}
                    </Select>
                </div>
            );
        });
    };

    render() {
        const { dataSet } = this.props;

        return (
            <div className="filter-panel">
                {dataSet && this.renderFilters(dataSet)}
                <div className="operations">
                    <Button type="primary" size="small" onClick={this.handleOk}>
                        搜索
                    </Button>
                    <Button
                        type="default"
                        size="small"
                        onClick={this.handleReset}
                    >
                        重置
                    </Button>
                </div>
            </div>
        );
    }
}

export default FilterPanel;

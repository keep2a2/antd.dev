import React, { Component } from "react";
import "./index.less";
import { Carousel } from "antd";

const CAROUSEL_ITEM_NUM = 8;

const createGroups = items => {
    let carousel = [];
    items.forEach((item, index) => {
        let firstIndex = Math.floor(index / CAROUSEL_ITEM_NUM);
        let secondIndex = index % CAROUSEL_ITEM_NUM;
        if (!carousel[firstIndex]) {
            carousel[firstIndex] = [];
        }
        carousel[firstIndex][secondIndex] = item;
    });
    return carousel;
};

class TilesSelection extends Component {
    state = {
        checked: [],
        options: []
    };

    componentDidMount() {
        this.setState({
            checked: Array.isArray(this.props.value) ? this.props.value : []
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            checked: Array.isArray(nextProps.value) ? nextProps.value : []
        });
    }

    onCheck = code => {
        const { isMultiple, onChange } = this.props;
        const { checked } = this.state;
        let newChecked = checked;
        if (isMultiple) {
            if (checked.includes(code)) {
                newChecked = newChecked.filter(item => code !== item);
            } else {
                newChecked.push(code);
            }
        } else {
            newChecked = [code];
        }
        this.setState({ checked: newChecked });

        if ("function" === typeof onChange) {
            onChange(newChecked);
        }
    };

    renderOptions = () => {
        const { options } = this.props;
        const { checked } = this.state;
        const groups = createGroups(options);
        return (
            <Carousel vertical dots={false} arrows={true} infinite={false}>
                {groups.map((group, index) => {
                    return (
                        <div key={index}>
                            {group.map(item => {
                                return (
                                    <span
                                        key={item.val}
                                        title={item.label}
                                        className={`tile-item ${
                                            checked.includes(item.val)
                                                ? "checked"
                                                : ""
                                        }`}
                                        onClick={this.onCheck.bind(
                                            this,
                                            item.val
                                        )}
                                    >
                                        {item.label}
                                    </span>
                                );
                            })}
                        </div>
                    );
                })}
            </Carousel>
        );
    };

    render() {
        return (
            <div className="tiles-selection">
                <div className="tiles-container">{this.renderOptions()}</div>
            </div>
        );
    }
}

export default TilesSelection;

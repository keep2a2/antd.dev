import React from "react";
import { Input, Modal } from "antd";
import FilterPanel from "../FilterPanel";
import TableSelection from "../TableSelection";

import "./index.less";

class ReferControl extends React.Component {
    selectedKeys = [];

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            filters: {},
            value: []
        };
    }

    componentDidMount() {
        const { value } = this.props;
        if (value) {
            this.setState({ value });
            this.selectedKeys = value;
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const { value } = nextProps;
        if (value) {
            this.setState({ value });
            this.selectedKeys = value;
        }
    }

    openModal = () => {
        this.setState({ modalVisible: true });
    };

    handleModalCancel = () => {
        this.setState({ modalVisible: false });
    };

    handleModalOk = () => {
        this.setState({ modalVisible: false });
        this.setState({ value: this.selectedKeys });

        if ("function" === typeof this.props.onChange) {
            this.props.onChange(this.selectedKeys);
        }
    };

    handleInputChange = value => {
        const newValue = value.length ? value.split(",") : [];
        this.setState({ value: newValue });
    };

    render() {
        const { title, dataSource } = this.props;
        const { filters, value } = this.state;

        const suffix = (
            <i className="icon ap ap-navmenu-light" onClick={this.openModal} />
        );

        return (
            <div className="refer-control">
                <Input
                    // allowClear={true}
                    suffix={suffix}
                    value={value.join(",")}
                    onChange={this.handleInputChange}
                    size={"small"}
                />

                <Modal
                    className="refer-modal"
                    title={title}
                    visible={this.state.modalVisible}
                    onOk={this.handleModalOk}
                    onCancel={this.handleModalCancel}
                    width={860}
                >
                    <FilterPanel
                        dataSet={dataSource}
                        onOk={filters => {
                            this.setState({ filters });
                        }}
                    />
                    <TableSelection
                        showSearch={false}
                        dataSet={dataSource}
                        onChange={value => {
                            this.selectedKeys = value;
                            this.forceUpdate();
                        }}
                        selectedKeys={this.selectedKeys}
                        filters={filters}
                    />
                </Modal>
            </div>
        );
    }
}

export default ReferControl;

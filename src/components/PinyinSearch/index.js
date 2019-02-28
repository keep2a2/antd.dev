import React from "react";
import { AutoComplete } from "antd";
import pinyinlite from 'pinyinlite';

class PinyinSearch extends React.Component {
    selectedKeys = [];

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            linkageOptions: [],
        };
    }

    componentDidMount() {
        const {dataSource} = this.props;
        this.setState({
            dataSource: this.processDataSource(dataSource)
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {dataSource} = nextProps;
        this.setState({
            dataSource: this.processDataSource(dataSource)
        })
    }

    processDataSource(dataSource){
        return dataSource.map(item => {
            const {pinyin, py} = this.getPinyin(item.name);
            return {
                ...item,
                pinyin,
                py,
            }
        })
    }

    getPinyin(chTxt){
        const pinyinArr = pinyinlite(chTxt);
        let pinyin = pinyinArr.map(item => item[0]).join('');
        let py = pinyinArr.map(item => item[0].substr(0,1)).join('');
        return {pinyin, py};
    }

    onSelect = (value) => {
        console.log('onSelect', value);
    }

    handleSearch = (k) => {
        const {dataSource} = this.state;
        const result = dataSource.filter(item => {
            return item.name.indexOf(k) > -1 ||  item.pinyin.indexOf(k) > -1 || item.py.indexOf(k) > -1;
        });

        this.setState({
            linkageOptions: !k ? [] : result.map(item => item.name)
        });
    }

    render() {
        const { linkageOptions } = this.state;

        console.log(pinyinlite('郗腾飞'));
        
        return (
            <div className="pinyin-search">
                <AutoComplete
                    dataSource={linkageOptions}
                    style={{ width: 200 }}
                    onSelect={this.onSelect}
                    onSearch={this.handleSearch}
                    placeholder="input here"
                />
            </div>
        );
    }
}

export default PinyinSearch;

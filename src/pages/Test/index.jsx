import React from 'react'
import { Layout } from 'antd'
import ReferControl from '../../components/ReferControl'
import DropdownControl from '../../components/DropdownControl'
import DropdownButton from './cases/DropdownButton'
import PinyinSearch from '../../components/PinyinSearch'
import {dataSetTransfer} from "../../tools/objectHelper"

import './index.less'

import {tableData2} from './mock/data01'

const { Header, Footer, Content } = Layout;

class Test extends React.Component{
    state = {
        referVal: [],
        dropVal: [],
    }
    render(){

        const listData = dataSetTransfer(tableData2);

        return (
            <Layout className="test-page">
                <Header>
                    Test Page
                </Header>

                <Content>
                    content
                    <div className="input-controls" style={{ width: 300 }}>
                        <ReferControl
                            title="参照"
                            dataSource={tableData2}
                            value={this.state.referVal}
                            onChange={value => {
                                this.setState({referVal: value})
                            }}
                        />

                        <DropdownControl
                            dataSource={tableData2}
                            showSearch={true}
                            value={this.state.dropVal}
                            onChange={value => {
                                this.setState({dropVal: value})
                            }}
                        />


                        <PinyinSearch
                            title={'ddd'}
                            dataSource={listData}
                        />
                    </div>

                    <div className="buttons-dropdowns">
                        <DropdownButton />
                    </div>
                </Content>

                <Footer>
                    footer
                </Footer>
            </Layout>
        )
    }
}

export default Test
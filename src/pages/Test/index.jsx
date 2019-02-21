import React from 'react'
import { Layout } from 'antd'
import ReferControl from '../../components/ReferControl'
import DropdownControl from '../../components/DropdownControl'
import './index.less'

import {tableData2} from './mock/data01'

const { Header, Footer, Content } = Layout;

class Test extends React.Component{
    state = {
        referVal: [],
    }
    render(){
        return (
            <Layout className="test-page">
                <Header>
                    Test Page
                </Header>

                <Content>
                    content
                    <div style={{ width: 300 }}>
                        <ReferControl
                            dataSource={tableData2}
                            value={this.state.referVal}
                            onChange={value => {
                                this.setState({referVal: value})
                            }}
                        />

                        <DropdownControl
                            dataSource={tableData2}
                        />
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
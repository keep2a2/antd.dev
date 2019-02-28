import React from 'react'
import { Layout, List, Card, Icon } from 'antd'
import { Link, Route, Switch } from 'react-router-dom'

import SortableExample from './cases/SortableExample'
// import DNDSortExample from './cases/DNDSortExample'

const { Header, Footer, Content } = Layout;
const { Item } = List;

const contentStyle = {
    padding: '25px',
}
const IconStyle = {
    marginRight: '25px',
}

const CardsList = ({match}) => {
    const basePath = match.url.replace(/(\/*$)/g, '');

    return (
        <div className="cards=list">
            <Card
                title="组件示例"
                style={{ width: 500 }}
            >
                <List>
                    <Item><Link to={`${basePath}/sortable`}>拖动排序-sortable</Link></Item>
                    <Item><Link to={`${basePath}/sortableDND`}>拖动排序-sortableDND</Link></Item>
                    <Item><Link to={`test`}>其他</Link></Item>
                </List>
            </Card>
        </div>
    )
}

class Examples extends React.Component{
    state = {
        referVal: [],
        dropVal: [],
    }

    render(){
        const {match} = this.props;
        const basePath = match.url.replace(/(\/*$)/g, '');

        console.log(match);

        return (
            <Layout className="test-page">
                <Header>
                    <Link to={`${basePath}/`}><Icon type="home" style={IconStyle} /></Link>
                    Component Examples
                </Header>

                <Content style={contentStyle}>
                    <Switch>
                        <Route path={`${basePath}/`} exact component={CardsList}/>
                        <Route path={`${basePath}/sortable`} component={SortableExample}/>
                        {/* <Route path={`${basePath}/sortableDND`} component={DNDSortExample}/> */}
                    </Switch>
                </Content>

                <Footer>
                    footer
                </Footer>
            </Layout>
        )
    }
}


export default Examples
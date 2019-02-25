import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from "@/pages/Home"
import Test from "@/pages/Test"
import Examples from "@/pages/Examples"

export default class RouteConfig extends React.Component{
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/test" component={Test} />
                    <Route path="/examples" component={Examples} />
                </Switch>
            </BrowserRouter>
        )
    }
}
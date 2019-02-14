import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from "@/pages/Home"
import Test from "@/pages/Test"

export default class RouteConfig extends React.Component{
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Test} />
                    <Route path="/test" exact component={Home} />
                </Switch>
            </BrowserRouter>
        )
    }
}
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListUserComponent from "./ListUserComponent";
import AddUserComponent from "./AddUserComponent";
import EditUserComponent from "./EditUserComponent";
import React from "react";

const AppRouter = () => {
    return(
        <div>
            <Router>
                <div className="col-md-6">
                    <h1 className="text-center" style={style}>React User Application</h1>
                    <Switch>
                        <Route path="/" exact component={ListUserComponent} />
                        <Route path="/users" component={ListUserComponent} />
                        <Route path="/add-user" component={AddUserComponent} />
                        <Route path="/edit-user" component={EditUserComponent} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
};

const style = {
    color: 'red',
    margin: '10px'
};

export default AppRouter;
import { Switch,Route } from "react-router-dom";
import Auth from "./HighOrder/Auth";
import PublicLayout from "./Layout/Public/PublicLayout";
import PrivateLayout from "./Layout/Private/PrivateLayout";
import Login from "./Component/Public/Login";
import Home from "./Component/Public/Home";
import Dashboard from "./Component/Private/Dashboard";
const App = () => {
    return(
        <PublicLayout>
            <Switch>
                <Route path="/" exact component={Auth(Login,false)}/>
                <Route path="/home" exact component={Auth(Home,true)}/>
                <PrivateLayout>
                    <Route path="/user/dashboard" exact component={Auth(Dashboard,true)}/>
                </PrivateLayout>
            </Switch>
        </PublicLayout>
    );
}

export default App;
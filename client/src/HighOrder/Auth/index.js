import React, { Component } from 'react';
import { connect } from "react-redux";
import { auth } from "../../Action/User";
import CircularProgress from "@mui/material/CircularProgress"
export default (ComposedClass,reload,adminRoute = null) => {
    class AuthenticationCheck extends Component {
        state = {
            loading: true
        }
        componentDidMount(){
            this.props.dispatch(auth()).then(response => {
                let user = this.props.user.authUser;
                // console.log(user);
                if(!user.isAuth){
                    if(reload){
                        this.props.history.push("/");
                    }
                }else{
                    if(adminRoute && !user.isAdmin){
                        this.props.history.push("/user/dashboard");
                    }else{
                        if(reload === false){
                            this.props.history.push("/user/dashboard");
                        }
                    }
                }
                this.setState({
                    loading: false
                })
            })
        }
        render(){
            if(this.state.loading){
                return (
                    <div>
                        <CircularProgress thickness={7}/>
                    </div>
                );
            }
            return (
                <div>
                    <ComposedClass { ...this.props } user={this.props.user}/>
                </div>
            );
        }
    } /// CLASS COMPONENT END
    function mapStateToProps (state){
        return { user: state.user }
        // console.log(state)
    }
    return connect(mapStateToProps)(AuthenticationCheck);
}
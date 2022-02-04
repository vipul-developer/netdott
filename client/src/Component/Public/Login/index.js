import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter,Link } from 'react-router-dom';
import { Box,Grid,Card,CardHeader,CardContent,CardActions,FormControl,TextField,Button,Typography } from "@mui/material";
import BackgroundImage from "../../../Resources/Images/account_login.jpg";
import ButtonComponent from '../../../UserInterface/Button';
import FormFileds from "../../../UserInterface/Form/formFileds";
import { update,generateData,isFormValid } from "../../../UserInterface/Form/formAction";
import { login } from "../../../Action/User";
class LoginComponent extends Component {
    state = {
        formError: false,
        formSuccess: "",
        formdata:{
            userName:{
                element: "input",
                value: "",
                config:{
                    name: "userName",
                    type: "text",
                    label:"enter your user name",
                    required:true,
                    variant:"standard",
                    margin:"dense",
                    variant:"outlined",
                    className:"userName_input",
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                touched:false,
                validationMessage: ""
            },
            password:{
                element: "input",
                value: "",
                config:{
                    name: "password",
                    type: "password",
                    label:"enter your password",
                    required:true,
                    variant:"standard",
                    margin:"dense",
                    variant:"outlined",
                    className:"password_input",
                },
                validation: {
                    required: true,
                    email: false
                },
                valid: false,
                touched:false,
                validationMessage: ""
            }
        }
    }
    submitFrom = (event) => {
        event.preventDefault();
        let dataToSubmit = generateData(this.state.formdata,"login");
        let formIsValid = isFormValid(this.state.formdata,"login");
        if(formIsValid){
            this.props.dispatch(login(dataToSubmit)).then(response => {
                if(response.payload.loginSuccess){
                    this.props.history.push("/user/dashboard")
                }else{
                    this.setState({
                        formError:true
                    })
                }
            })
        }else{
            this.setState({
                formError: true
            })
        }
    }
    updateForm = (element) => {
        const newFormData = update(element,this.state.formdata,"login");
        this.setState({
            formError: false,
            formdata: newFormData
        })
    }
    render() {
        return (
            <Box sx={{paddingTop:"68px",background:`#777 url(${BackgroundImage}) no-repeat fixed left`,height:"100vh"}}>
                <Grid container sx={{justifyContent:"center"}}>
                    <Grid container item xl={6} lg={6} md={6} sm={8} xs={12} sx={{position:"absolute",top:"20%",bottom:"20%"}}>
                        <Card sx={{width:"100%",p:4}}>
                            <CardHeader
                                title="Account Login"
                                sx={{'& .MuiCardHeader-title':{fontWeight:600,fontSize:"32px"}}}
                            />
                            <CardContent>
                                <Box 
                                    component="form"
                                    noValidate
                                    autoComplete="off"
                                    sx={{
                                        '& .MuiTextField-root':{m:1}
                                    }}
                                    onSubmit={(event) => this.submitFrom(event)}
                                >
                                    <FormFileds
                                        id={"userName"}
                                        formdata={this.state.formdata.userName}
                                        change={(element) => this.updateForm(element)}
                                    />
                                    <FormFileds
                                        id={"password"}
                                        formdata={this.state.formdata.password}
                                        change={(element) => this.updateForm(element)}
                                    />
                                    <Box sx={{mt:2,ml:1}}>
                                        <ButtonComponent
                                            type={"radius"}
                                            title={"Login"}
                                            init={{"bck_color":"#FFFFFF","color":"#000000"}}
                                            click={(element) => this.submitFrom(element)}
                                        />
                                    </Box>
                                </Box>
                            </CardContent>
                            <CardActions disableSpacing>
                                <Typography variant="body2" component="p" sx={{flexGrow:1,ml:2}}>
                                    <Link to="/forgotPassword">Forgot password?</Link>
                                </Typography>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default connect()(withRouter(LoginComponent));
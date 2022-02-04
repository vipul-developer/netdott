import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Box,Grid,AppBar,Toolbar,Button,Typography,IconButton,CssBaseline } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SideDrawer from './SideDrawer';
import { MenuList } from "../../../Misc/Menu";
class Navigation extends Component {
    state = {
        open: false
    }
    hendleDrawer = (element) =>{
        this.setState({
            open: !element
        })
    }
    render() {
        const user = this.props.user.authUser;
        return (
            <Box sx={{display:"flex"}}>
                <CssBaseline/>
                <AppBar 
                    position="fixed" 
                    open={this.state.open}
                    sx={{
                        backgroundColor:"#fff",
                        color:"#000",
                        boxShadow:0,
                        borderBottom:"1px solid #ccc",
                        zIndex:1200 + 10,
                        ...(this.state.open && {
                            width:`calc(100% - ${240}px)`,
                        }),
                        transition:"all .5s"
                    }}
                >
                    <Toolbar>
                        <Grid container sx={{justifyContent:"center"}}>
                            <Grid container item xl={11} lg={11} md={11} sm={12} xs={12}>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={(element) => this.hendleDrawer(this.state.open)}
                                >
                                    {this.state.open ? <CloseIcon/>:<MenuIcon />}
                                </IconButton>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1, lineHeight:2.3 }}>
                                    News
                                </Typography>
                                <Button color="inherit">Login</Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <SideDrawer
                    open={this.state.open}
                    list={MenuList}
                    user={user}
                />
                <Box 
                    component="main" 
                    sx={{flexGrow:1,}}
                >
                    {this.props.children}
                </Box>
            </Box>
        );
    }
}
function mapStateToProps(state) {
    return { user: state.user }
}
export default connect(mapStateToProps)(withRouter(Navigation));
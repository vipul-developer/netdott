import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Grid,Box } from "@mui/material";
class DashboardComponent extends Component {
    render() {
        let user = this.props.user.authUser.user;
        return (
            <>
                <Box sx={{mt:5,pt:3}}>
                    <Grid container>
                        <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{border:1}}>Grid 1</Grid>
                            <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{border:1}}>Grid 2</Grid>
                            <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{border:1}}>Grid 3</Grid>
                            <Grid item xl={3} lg={3} md={3} sm={6} xs={12} sx={{border:1}}>Grid 4</Grid>
                        </Grid>
                    </Grid>
                </Box>
            </>
        );
    }
}
function mapStateToProps(state){
    return{
        user: state.user
    }
}
export default connect(mapStateToProps)(withRouter(DashboardComponent));
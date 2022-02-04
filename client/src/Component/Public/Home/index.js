import React, { Component } from 'react';
import { Grid,Box } from "@mui/material";
class HomeComponent extends Component {
    render() {
        return (
            <Box sx={{paddingTop:"68px"}}>
               <Grid container sx={{justifyContent:"center"}}>
                   <Grid container item xl={10} lg={10} md={10} sm={12} xs={12} sx={{pl:3,pr:3}}>
                       Home Component
                   </Grid>
               </Grid>
            </Box>
        );
    }
}

export default HomeComponent;
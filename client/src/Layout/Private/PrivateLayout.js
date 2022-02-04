import React from 'react';
import { Grid,Box } from "@mui/material";
import Navigation from '../../Component/Public/Navigation';
const PrivateLayout = (props) => {
    return (
        <div>
            <Navigation>
                {props.children}
            </Navigation>
        </div>
    );
};

export default PrivateLayout;
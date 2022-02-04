import React from 'react';
import { Box,Button } from "@mui/material";
const ButtonComponent = (props) => {
    const renderButton = () => {
        let buttonTemplate = null;
        switch(props.type){
            case("radius"):
                buttonTemplate = (
                    <Box>
                        <Button
                            variant="contained"
                            sx={{
                                padding:"12px 60px",border:"1px solid #000000",backgroundColor:`${props.init.bck_color}`,
                                color:`${props.init.color}`,cursor:"pointer",letterSpacing:"1px",transition:"all .5s",
                                fontWeight:"600",textTransform:"capitalize",fontSize:"16px",outline:"none",boxShadow:"none",
                                '&:hover':{
                                    color:`${props.init.bck_color}`,
                                    backgroundColor:`${props.init.color}`,
                                }
                            }}
                            onClick={(event) => props.click(event)}
                        >
                            {props.title}
                        </Button>
                    </Box>
                )
            break;
            case("square"):
                buttonTemplate = (
                    <Box>
                        <Button
                            variant="contained"
                            sx={{
                                padding:"10px 60px",border:`1px solid ${props.init.bck_color}`,backgroundColor:`${props.init.bck_color}`,
                                color:`${props.init.color}`,cursor:"pointer",letterSpacing:"1px",transition:"all .5s",
                                fontWeight:"600",textTransform:"capitalize",fontSize:"16px",outline:"none",boxShadow:"none",borderRadius:0,
                                '&:hover':{
                                    color:`${props.init.bck_color}`,
                                    backgroundColor:`${props.init.color}`,
                                }
                            }}
                            onClick={(event) => props.click(event)}
                        >
                            {props.title}
                        </Button>
                    </Box>
                )
            break;
            default:
                buttonTemplate = null;
        }
        return buttonTemplate;
    }
    return (
        <>
            {renderButton()}
        </>
    );
};

export default ButtonComponent;
import React,{ useState } from 'react';
import { connect } from "react-redux";
import { withRouter,Link } from 'react-router-dom';
import { Box,Drawer,List,ListItemButton,ListItemIcon,ListItemText,Collapse,Divider } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
const drawerWidth = 240;
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});
const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(9)} + 1px)`,
    },
    [theme.breakpoints.down('md')]: {
        width: `calc(${theme.spacing(0)} + 1px)`,
    },
});
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));
const SideDrawer = (props) => {
    const theme = useTheme();
    const [ open,setOpen ] = useState("");
    const renderList = (user,list) => {
       let listTemplate = null;
       if(!user.isAdmin){
        console.log(user)
       }else{
        <List
            component="nav"
        >
            {
                list.map((item,index) => {
                    if(!item.isAdmin){
                        if(item.linkTo){
                            return(
                                <Box key={item._id}>
                                    <Link to={item.linkTo}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                {item.icon === "" ? <DoDisturbIcon/>:item.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={item.name}/>
                                        </ListItemButton>
                                    </Link>
                                </Box>
                            )
                        }else{
                            return(
                                <Box key={item._id}>
                                    <ListItemButton onClick={() => handleCollapse(index)}>
                                        <ListItemIcon>
                                            {item.icon === "" ? <DoDisturbIcon/>:item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.name}/>
                                        {
                                            item.subMenu ? index === open ? <ExpandLess /> : <ExpandMore />:null
                                        }
                                    </ListItemButton>
                                    <Collapse in={index === open} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                    {
                                        item.subMenu ? 
                                        item.subMenu.map((subList,index) => (
                                            <Link to={subList.linkTo} key={subList._id}>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        {subList.icon === "" ? <DoDisturbIcon/>:item.icon}
                                                    </ListItemIcon>
                                                    <ListItemText primary={subList.name}/>
                                                </ListItemButton>
                                            </Link>
                                        ))
                                        :
                                        null
                                    }
                                        </List>
                                    </Collapse>
                                </Box>
                            )
                        }
                    }
                })
            }
        </List>
       }
       return listTemplate;
    }
    const handleCollapse = (index) => {
        if(open === index){
            setOpen("")
        }else{
            setOpen(index)
        }
    }
    return (
        <Box sx={{display:"flex"}}>
            <Drawer 
                variant="permanent" 
                open={props.open}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    boxSizing: 'border-box',
                    ...(props.open && {
                        ...openedMixin(theme),
                        '& .MuiDrawer-paper': openedMixin(theme),
                    }),
                    ...(!props.open && {
                        ...closedMixin(theme),
                        '& .MuiDrawer-paper': closedMixin(theme),
                    })
                }}
            >   
                <DrawerHeader/>
                {renderList(props.user,props.list)}
            </Drawer>
        </Box>
    );
};

export default connect()(withRouter(SideDrawer));
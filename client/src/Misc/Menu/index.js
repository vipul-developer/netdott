import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
export const MenuList = [
    {"_id":"01","name":"Dashboard","linkTo":"/user/dashboard","isAdmin":false,"isActive":true,"icon":<DashboardIcon/>},
    {
        "_id":"02","name":"Account","isAdmin":false,"isActive":true,"icon":<PersonIcon/>,"subMenu":[
        {"_id":"01","name":"Profile","linkTo":"/user/account/profile","isAdmin":false,"isActive":true},
        {"_id":"02","name":"Register","linkTo":"/user/account/register","isAdmin":true,"isActive":true},
        ]
    },
    {
        "_id":"03","name":"Account","isAdmin":false,"isActive":true,"icon":<PersonIcon/>,"subMenu":[
        {"_id":"01","name":"Profile","linkTo":"/user/account/profile","isAdmin":false,"isActive":true},
        {"_id":"02","name":"Register","linkTo":"/user/account/register","isAdmin":true,"isActive":true},
        ]
    }
]
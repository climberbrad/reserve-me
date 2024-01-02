import {
    AppBar,
    Avatar,
    Box,
    Divider,
    IconButton,
    ListItemIcon, Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import {useState} from "react";
import {Link} from "react-router-dom";
import {AltRoute} from "@mui/icons-material";


export default function HeaderBar(): React.ReactElement {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            <AppBar position="fixed">
                <Box sx={{display: 'flex', justifyContent: 'space-between', marginRight: 2}}>
                    <Toolbar>
                        <Box sx={{display: 'flex', gap: 1, marginTop: 1}}>
                            <AltRoute sx={{color: '#FFFFFF', width: 52, height: 52, marginLeft: -2}}/>
                            <Link key='home' to='/'>
                                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                    <Typography fontSize={36} color='#ffffff'>Weekends</Typography>
                                    <Typography color='#ffffff' sx={{marginTop: -1}} align='left' fontSize={14} fontFamily='sans-serif'>Find
                                        your next
                                        adventure</Typography>
                                </Box>
                            </Link>
                        </Box>
                    </Toolbar>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ml: 2}}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{width: 32, height: 32}}>M</Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    >
                        <MenuItem onClick={handleClose}>
                            <Avatar/> Profile
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Avatar/> My account
                        </MenuItem>
                        <Divider/>
                        <MenuItem onClick={handleClose}>
                            <Link key='trips' to='/trips/'>
                                <ListItemIcon>My Trips</ListItemIcon>
                            </Link>
                        </MenuItem>
                    </Menu>
                </Box>
            </AppBar>
        </>
    )

}
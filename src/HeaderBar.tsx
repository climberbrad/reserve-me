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
import {drawerWidth} from "./App.tsx";
import {useState} from "react";
import {Link} from "react-router-dom";

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
            <AppBar
                position="fixed"
                sx={{width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}
            >
            {/*    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>*/}
                <Box sx={{display: 'flex', justifyContent: 'space-between', marginRight: 2}}>
                    <Toolbar>
                        <Link key='home' to='/'>
                            <Typography fontSize={36} color='#ffffff'>Weekend Getaway</Typography>
                        </Link>
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
            <Toolbar/>
        </>
    )

}
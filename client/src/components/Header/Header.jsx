import React, {useState , useEffect} from "react";
import memories from "../../images/memories.png";
import useStyles from "../Header/styles";
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link , useLocation , useNavigate} from 'react-router-dom';
import { useDispatch } from'react-redux';
import { logout , reset } from  "../../features/auth/authSlice"
import { toast } from 'react-toastify'
import decode from 'jwt-decode'





const Header = () => {
 
  const [user, setUser] = useState(JSON?.parse(localStorage?.getItem('user')));
  const Location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
   
    setUser(JSON?.parse(localStorage?.getItem('user')) );

  }, [Location]);


  const onlogout = () => {
    dispatch(logout());
    
    dispatch(reset())

    setUser(null);
   toast.error("User LogOut")
    navigate('/')

  };
  
  return (
    <AppBar className={classes.appBar}  position="static" color="inherit" >
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.picture}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={onlogout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

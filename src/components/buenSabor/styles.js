import { makeStyles, fade } from '@material-ui/core/styles';

const drawerWidth = 0;

export default makeStyles((theme) => ({
  logoHeader: {
    width: '100px',
  },
  imgLogo: {
    width: '70%',
    height: 'auto',
    margin: '0px auto',
    display: 'block',
  },
  appBar: {
    boxShadow: '0px 5px 5px 0px rgb(0 0 0 / 16%) !important',
    background: '#F8F6E9',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    padding: '10px 0',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  titulo: {
    textDecoration: 'none',
    paddingLeft: '20px',
  },
  imagen: {
    marginRight: '10px',
  },
  menuBoton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  menu: {
    width: 'calc(100% - 150px)',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  grow: {
    width: '50px',
    flexGrow: 1,
  },
  buscar: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  iconoBuscar: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
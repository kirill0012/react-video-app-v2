import { createTheme, Shadows } from '@mui/material/styles'

const lightTheme = createTheme({
  typography: {
    fontFamily: 'Public Sans',
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#4C4CFC',
    },
    background: {
      default: '#F7F7F8',
    },
  },
  shadows: Array(25).fill('none') as Shadows,
})

export default lightTheme

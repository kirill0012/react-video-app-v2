// ** MUI Imports
import { styled } from '@mui/material/styles'
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar'
import MuiToolbar, { ToolbarProps } from '@mui/material/Toolbar'

// ** Type Imports
import { LayoutProps } from '../types'

// ** Util Import
import { hexToRGBA } from '../../utils/hex-to-rgba'

interface Props {
  appBarContent: NonNullable<LayoutProps['verticalLayoutProps']['appBar']>['content']
  appBarProps: NonNullable<LayoutProps['verticalLayoutProps']['appBar']>['componentProps']
}

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  transition: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  minHeight: theme.mixins.toolbar.minHeight,
}))

const Toolbar = styled(MuiToolbar)<ToolbarProps>(({ theme }) => ({
  width: '100%',
  borderRadius: 8,
  marginTop: theme.spacing(3),
  padding: `0px 10px !important`,
}))

const LayoutAppBar = (props: Props) => {
  // ** Props
  const { appBarProps, appBarContent: userAppBarContent } = props

  let userAppBarStyle = {}
  if (appBarProps && appBarProps.sx) {
    userAppBarStyle = appBarProps.sx
  }
  const userAppBarProps = Object.assign({}, appBarProps)
  delete userAppBarProps.sx

  return (
    <AppBar
      elevation={0}
      color="default"
      className="layout-navbar"
      sx={{ ...userAppBarStyle }}
      position={'static'}
      {...userAppBarProps}
    >
      <Toolbar
        className="navbar-content-container"
        sx={{
          minHeight: (theme) => `${theme.mixins.toolbar.minHeight as number}px !important`,
          backgroundColor: (theme) => hexToRGBA(theme.palette.background.default, 1),
          boxShadow: 6,
          //'@media (min-width:1440px)': { maxWidth: theme => `calc(1440px - ${theme.spacing(6 * 2)})` }
          maxWidth: '1080px',
        }}
      >
        {(userAppBarContent && userAppBarContent(props)) || null}
      </Toolbar>
    </AppBar>
  )
}

export default LayoutAppBar

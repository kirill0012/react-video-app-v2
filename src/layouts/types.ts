import { ReactNode } from 'react'
import { AppBarProps } from '@mui/material/AppBar'
import { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer'

export type Layout = 'vertical' | 'horizontal' | 'blank' | 'blankWithAppBar'

export type ContentWidth = 'full' | 'boxed'

export type AppBar = 'fixed' | 'static' | 'hidden'

export type Footer = 'fixed' | 'static' | 'hidden'

export type BlankLayoutProps = {
  children: ReactNode
}

export type BlankLayoutWithAppBarProps = {
  children: ReactNode
}

export type NavGroup = {
  icon?: string
  title: string
  action?: string
  subject?: string
  badgeContent?: string
  children?: (NavGroup | NavLink)[]
  badgeColor?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
}

export type NavLink = {
  icon?: string
  path?: string
  title: string
  action?: string
  subject?: string
  disabled?: boolean
  badgeContent?: string
  externalLink?: boolean
  openInNewTab?: boolean
  badgeColor?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
}

export type NavSectionTitle = {
  action?: string
  subject?: string
  sectionTitle: string
}

export type VerticalNavItemsType = (NavLink | NavGroup | NavSectionTitle)[]

export type VerticalLayoutProps = {
  appBar?: {
    componentProps?: AppBarProps
    content?: (props?: any) => ReactNode
  }
  navMenu: {
    lockedIcon?: ReactNode
    unlockedIcon?: ReactNode
    navItems?: VerticalNavItemsType
    content?: (props?: any) => ReactNode
    branding?: (props?: any) => ReactNode
    afterContent?: (props?: any) => ReactNode
    beforeContent?: (props?: any) => ReactNode
    componentProps?: Omit<SwipeableDrawerProps, 'open' | 'onOpen' | 'onClose'>
  }
}

export type LayoutProps = {
  children: ReactNode
  verticalLayoutProps: VerticalLayoutProps
}

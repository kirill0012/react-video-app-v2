// ** React Imports
import { ReactNode } from 'react'

// import AppBar from "@mui/material/AppBar";
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'

// ** Type Import
import { VerticalLayoutProps } from '../layouts/types'

import AppBar from '../layouts/components/AppBar'
import UserAppBar from './components/UserAppBar'

interface Props {
  children: ReactNode
}

const VerticalLayoutWrapper = styled('div')({
  height: '100%',
  display: 'flex',
})

const MainContentWrapper = styled(Box)<BoxProps>({
  flexGrow: 1,
  minWidth: 0,
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
})

const ContentWrapper = styled('main')(() => ({
  flexGrow: 1,
  width: '100%',
  padding: '10px',
  transition: 'padding .25s ease-in-out',
}))

const UserLayout = (props: Props) => {
  // ** Props
  const { children } = props

  const verticalLayoutProps: VerticalLayoutProps = {
    navMenu: {},
    appBar: {
      content: () => <UserAppBar />,
    },
  }

  return (
    <VerticalLayoutWrapper className="layout-wrapper">
      <MainContentWrapper className="layout-content-wrapper">
        {/* AppBar Component */}
        <AppBar
          appBarContent={verticalLayoutProps.appBar?.content}
          appBarProps={verticalLayoutProps.appBar?.componentProps}
          {...props}
        />

        {/* Content */}
        <ContentWrapper
          className="layout-page-content"
          sx={{
            mx: 'auto',
            maxWidth: '1080px',
          }}
        >
          {children}
        </ContentWrapper>

        {/* Footer Component */}
      </MainContentWrapper>
    </VerticalLayoutWrapper>
  )
}

export default UserLayout

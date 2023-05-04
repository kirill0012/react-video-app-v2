// ** MUI Imports
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import UserDropdown from './UserDropdown'

// ** Components
// import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
// import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'

const UserAppBar = () => {
  return (
    <Box
      sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
    >
      <Box className="actions-left" sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {/* <ModeToggler settings={settings} saveSettings={saveSettings} /> */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div>
            <Typography variant="h5" sx={{ fontWeight: 900, fontSize: '24px', lineHeight: '36px' }}>
              sett
            </Typography>
          </div>
          <div
            style={{
              display: 'flex',
              padding: '1px 15px',
              border: '1.5px solid #4C4CFC',
              borderRadius: '8px',
              marginLeft: '8px',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                fontSize: '24px',
                color: '#4C4CFC',
                lineHeight: '36px',
              }}
            >
              AI
            </Typography>
          </div>
        </div>
      </Box>
      <Box className="actions-right" sx={{ display: 'flex', alignItems: 'center' }}>
        <UserDropdown />
      </Box>
    </Box>
  )
}

export default UserAppBar

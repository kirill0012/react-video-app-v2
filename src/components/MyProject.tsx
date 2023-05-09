import { Box, Skeleton, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

import { getProject } from '../redux/reducers/userReducer'

const MyProject = () => {
  const project = useSelector(getProject)
  const isLoading = !project

  return (
    <Box
      sx={{
        border: '1px solid #DDDEE0',
        borderRadius: '16px',
        p: '16px',
        height: '96px',
        mb: '24px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          verticalAlign: 'top',
        }}
      >
        <div
          style={{
            width: '60px',
            height: '60px',
            position: 'relative',
            marginRight: '15px',
          }}
        >
          {!isLoading ? (
            <img
              src={project.avatar || undefined}
              alt="thumb"
              width={60}
              height={60}
              style={{ borderRadius: '8px' }}
            />
          ) : (
            <Skeleton variant="rounded" width={60} height={60} />
          )}
        </div>
        <div style={{ display: 'inline-block', width: '100%' }}>
          {!isLoading ? (
            <>
              <Typography sx={{ fontSize: '18px', fontWeight: '600', lineHeight: '31px' }}>
                Generate new gameplay ad concepts
              </Typography>
              <Typography
                sx={{
                  fontSize: '18px',
                  fontWeight: '600',
                  lineHeight: '31px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                for {project.title}
              </Typography>
            </>
          ) : (
            <>
              <Skeleton variant="text" sx={{ fontSize: '18px' }} />
              <Skeleton variant="text" sx={{ fontSize: '18px' }} />
            </>
          )}
        </div>
      </div>
    </Box>
  )
}

export default MyProject

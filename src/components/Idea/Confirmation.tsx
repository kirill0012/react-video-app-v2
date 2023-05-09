import { Button, ButtonProps, CircularProgress, Paper, styled, Typography } from '@mui/material'
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined'
import { IdeaItem, IdeaRequest, IdeasAPI } from '../../services/ideas'

import { useSelector, useDispatch } from 'react-redux'
import {
  addGeneration,
  getIdea,
  getRequestPending,
  setRequestRunning,
  setIdea,
  setRequest,
  getRequest,
} from '../../redux/reducers/genReducer'
import { Mixpanel } from '../../utils/Mixpanel'
import { ConceptsAPI } from '../../services/concepts'

// ** Styled Components
const ButtonSecondaryWrapper = styled(Button)<ButtonProps>(() => ({
  borderRadius: '8px',
  height: '48px',
  textTransform: 'none',
  fontSize: '18px',
  fontWeight: '400',
  background: 'rgba(76, 76, 252, 0.12)',
  color: '#4C4CFC',
  '&:hover': { background: 'rgba(76, 76, 252, 0.22)' },
}))

const IdeaConfirmation = () => {
  const dispatch = useDispatch()
  const idea = useSelector(getIdea)
  const request = useSelector(getRequest)
  const requestPending = useSelector(getRequestPending)

  if (idea == null) return null
  if (requestPending) return null

  const onConfirm = () => {
    Mixpanel.track('Confirm Ad Script', { idea: idea })
    ConceptsAPI.generateConcept(idea)
      .then((gen) => {
        dispatch(addGeneration(gen))
      })
      .catch(() => {
        //
      })
      .finally(() => {
        dispatch(setIdea(null))
      })
  }

  const onRegenerate = () => {
    Mixpanel.track('Re-Generate Ad Script')
    dispatch(setRequestRunning(true))
    // request for another idea with conceptIdea.request data
    IdeasAPI.generateIdea(request as IdeaRequest)
      .then((idea) => {
        dispatch(setIdea(idea))
      })
      .catch(() => {
        dispatch(setIdea(null))
        dispatch(setRequest(null))
      })
      .finally(() => {
        dispatch(setRequestRunning(false))
      })
  }

  if (requestPending) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '500px', // Fixed height
          width: '500px', // Fixed width
          boxSizing: 'border-box', // This ensures the height and width include padding and border
        }}
      >
        <CircularProgress size={75} thickness={5} color={'primary'} />
        <div
          style={{
            marginTop: '45px',
            fontSize: '1.25rem', // Larger font size
            fontWeight: 'bold', // Bold text
            color: '#3f51b5', // Same color as the "primary" CircularProgress
          }}
        >
          Generating Your Ad-Summary Now...
        </div>
      </div>
    )
  }

  return (
    <Paper
      sx={{
        p: '24px',
        margin: 'auto',
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
        borderRadius: '16px',
        mb: '24px',
      }}
    >
      <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#81848F', pb: '16px' }}>
        Got it! Here’s what I plan to generate:
      </Typography>
      <Typography
        sx={{
          fontSize: '18px',
          lineHeight: '31px',
          fontWeight: '600',
          color: '#272930',
          pb: '16px',
        }}
      >
        ”{idea?.title}”
      </Typography>
      <Typography
        sx={{
          fontSize: '16px',
          lineHeight: '24px',
          fontWeight: '400',
          color: '#272930',
          pb: '24px',
        }}
      >
        <b>Game Mechanics Description:</b>
        <br />
        {idea?.game_mechanics}
      </Typography>
      <Typography
        sx={{
          fontSize: '16px',
          lineHeight: '24px',
          fontWeight: '400',
          color: '#272930',
          pb: '24px',
        }}
      >
        <b>Ad Description:</b>
        <br />
        {idea?.summary}
      </Typography>
      <Button
        size="large"
        type="submit"
        variant="contained"
        onClick={onConfirm}
        sx={{
          borderRadius: '8px',
          height: '48px',
          textTransform: 'none',
          fontSize: '18px',
          fontWeight: '400',
          mr: '24px',
        }}
      >
        Confirm
      </Button>
      <ButtonSecondaryWrapper
        size="large"
        type="submit"
        variant="contained"
        startIcon={<CachedOutlinedIcon />}
        onClick={onRegenerate}
      >
        Re-generate
      </ButtonSecondaryWrapper>
    </Paper>
  )
}

export default IdeaConfirmation

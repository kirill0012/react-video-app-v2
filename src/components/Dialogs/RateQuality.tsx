import {
  Box,
  Button,
  ButtonProps,
  IconContainerProps,
  Modal,
  Rating,
  styled,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { TextField } from '@mui/material'

import { Mixpanel } from '../../utils/Mixpanel'

import { VideoItem } from '../../services/concepts'
import React, { useEffect, useState } from 'react'
import { VideosAPI } from '../../services/videos'
import Cookie from 'js-cookie'

type Props = {
  video: VideoItem | null
  open: boolean
  onClose: (ratingSent: boolean) => void
}

const style = {
  position: 'absolute' as const,
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -20%)',
  width: '624px',
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: '24px',
}

// ** Styled Components
const StyledRating = styled(Rating)(() => ({
  '& .MuiRating-iconEmpty img': {
    filter: 'grayscale(1.0)',
  },
  '& .MuiRating-iconActive': {
    transform: 'none',
  },
}))

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

const customIcons: {
  [index: string]: {
    icon: React.ReactElement
    label: string
  }
} = {
  1: {
    icon: (
      <img
        src="/images/emotics/Dissapointed.svg"
        width={50}
        height={50}
        alt="Dissatisfied"
        style={{ margin: 'auto' }}
      />
    ),
    label: 'Dissatisfied',
  },
  2: {
    icon: (
      <img
        src="/images/emotics/Neutral.svg"
        width={50}
        height={50}
        alt="Neutral"
        style={{ margin: 'auto' }}
      />
    ),
    label: 'Neutral',
  },
  3: {
    icon: (
      <img
        src="/images/emotics/Satisfied.svg"
        width={50}
        height={50}
        alt="Satisfied"
        style={{ margin: 'auto' }}
      />
    ),
    label: 'Satisfied',
  },
  4: {
    icon: (
      <img
        src="/images/emotics/Happy.svg"
        width={50}
        height={50}
        alt="Very Satisfied"
        style={{ margin: 'auto' }}
      />
    ),
    label: 'Very Satisfied',
  },
}

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props
  return (
    <Box
      {...other}
      sx={{
        width: 95,
        height: 95,
        background: '#F7F7F8',
        border: '1px solid rgba(76, 76, 252, 0.12)',
        borderRadius: '10px',
        boxShadow: '0px 1px 2px rgba(187, 187, 187, 0.12)',
        mr: '22px',
      }}
    >
      {customIcons[value].icon}
    </Box>
  )
}

const RateQualityComponent = (props: Props) => {
  const { video } = props
  const [selected, setSelected] = useState<number>(3)
  const [feedback, setFeedback] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [nameFromCookie, setNameFromCookie] = useState<string>('')

  useEffect(() => {
    if (props.open) {
      const storedName = Cookie.get('rater_name')
      if (storedName) {
        setName(storedName)
        setNameFromCookie(storedName)
      } else {
        setName('')
        setNameFromCookie('')
      }
    }
  }, [props.open])

  if (!video) return null

  const onChange = (event: React.SyntheticEvent, value: number | null) => {
    if (value) setSelected(value)
  }

  const onSubmit = () => {
    Mixpanel.track('Rate Quality', {
      video_link_to_s3: video.src,
      video_object: video,
      quality: selected,
      feedback: feedback,
    })

    VideosAPI.rate(video.id, name, selected, feedback) // Update the rate() function accordingly

    if (name) {
      Cookie.set('rater_name', name)
      setNameFromCookie(name)
    }

    onClose(true)
  }

  const onClose = (ratingSent = false) => {
    setSelected(3)
    props.onClose(ratingSent)
  }

  return (
    <Modal
      open={props.open}
      onClose={() => onClose(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 624, '&:focus': { outline: '0 !important' } }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <Typography sx={{ fontSize: '20px', fontWeight: 700, flexGrow: 1 }}>
            Quality feedback
          </Typography>
          <CloseIcon sx={{ cursor: 'pointer' }} onClick={() => onClose(false)} />
        </div>
        <Typography sx={{ fontSize: '16px', fontWeight: 400, pb: '24px' }}>
          How satisfied are you with this concept?
        </Typography>
        <StyledRating
          max={4}
          name="highlight-selected-only"
          defaultValue={3}
          IconContainerComponent={IconContainer}
          getLabelText={(value: number) => customIcons[value].label}
          highlightSelectedOnly
          sx={{ mb: '16px' }}
          value={selected}
          onChange={onChange}
        />
        <Typography sx={{ fontSize: '16px', fontWeight: 400, pb: '8px' }}>
          Have you any other thoughts about this video’s quality? Please provide your feedback
          below:
        </Typography>
        {!nameFromCookie && (
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            sx={{ marginBottom: '24px' }}
            placeholder="Enter your name here (done only once)"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        )}
        <TextField
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '24px' }}
          placeholder="Type your feedback here...."
          value={feedback}
          onChange={(event) => setFeedback(event.target.value)}
        />
        <div style={{ display: 'flex', gap: '24px' }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={onSubmit}
            sx={{
              borderRadius: '8px',
              height: '48px',
              textTransform: 'none',
              fontSize: '18px',
              fontWeight: '400',
            }}
          >
            Submit
          </Button>
          <ButtonSecondaryWrapper
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={() => onClose(false)}
          >
            Cancel
          </ButtonSecondaryWrapper>
        </div>
      </Box>
    </Modal>
  )
}

export default RateQualityComponent

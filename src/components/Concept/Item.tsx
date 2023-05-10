import React, { useEffect } from 'react'
import { Alert, Button, Paper, Snackbar, Typography } from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

import { Generation, VideoItem } from '../../services/concepts'
import ConceptGenerationComponent from './Generation'
import VideoViewComponent from '../Dialogs/VideoView'
import RateQualityComponent from '../Dialogs/RateQuality'
import IterateConceptComponent from '../Dialogs/IterateConcept'

type Props = {
  index: number
  generation: Generation
}

const ConceptItemComponent = (props: Props) => {
  const { generation } = props

  const [value, setValue] = React.useState((generation.videos.length - 1).toString())
  const [isPlayerOpen, setPlayerOpen] = React.useState<boolean>(false)
  const [isRateOpen, setRateOpen] = React.useState<boolean>(false)
  const [isIterateOpen, setIterateOpen] = React.useState<boolean>(false)
  const [selectedVideo, setSelectedVideo] = React.useState<VideoItem | null>(null)
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)

  useEffect(() => {
    setValue((generation.videos.length - 1).toString())
  }, [generation.videos])

  const handlePlayerClose = () => setPlayerOpen(false)
  const handleRateClose = (isRatingSent: boolean) => {
    setRateOpen(false)
    if (isRatingSent) {
      setSnackbarOpen(true)
    }
  }
  const handleIterateClose = () => setIterateOpen(false)

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackbarOpen(false)
  }

  const openVideoPlayer = (video: VideoItem) => {
    setSelectedVideo(video)
    setPlayerOpen(true)
  }

  const openVideoRate = (video: VideoItem) => {
    setSelectedVideo(video)
    setPlayerOpen(false)
    setRateOpen(true)
  }

  const openVideoIterate = (video: VideoItem) => {
    setSelectedVideo(video)
    setPlayerOpen(false)
    setIterateOpen(true)
  }

  let cardHeader = null

  if (generation.videos.length > 1 || !generation.videos[0].in_progress) {
    cardHeader = (
      <>
        <div style={{ paddingBottom: '16px', display: 'flex' }}>
          <Typography
            sx={{ fontSize: '18px', fontWeight: '600', color: '#272930', lineHeight: '31px' }}
          >
            Your generation results
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#81848F',
              flexGrow: 1,
              textAlign: 'right',
            }}
            suppressHydrationWarning={true}
          >
            {timeSince(new Date(generation.videos[0].created))} ago
          </Typography>
        </div>
      </>
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
      <TabContext value={value}>
        {cardHeader}
        {generation.videos.length > 1 && (
          <div style={{ marginBottom: '18px', marginTop: '4px' }}>
            {generation.videos.map((vid, index) => (
              <Button
                key={vid.id}
                variant="text"
                onClick={() => setValue(index.toString())}
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  textTransform: 'none',
                  p: '3px 8px',
                  minWidth: 'unset',
                  mr: '2px',
                  ...(value === index.toString()
                    ? {
                        color: '#4C4CFC',
                        background: 'rgba(76, 76, 252, 0.12)',
                        boxShadow:
                          '1.1px 2.7px 3.8px -1.2px rgba(187, 187, 187, 0.26), 0.5px 1.3px 1.8px -0.6px rgba(187, 187, 187, 0.18), 0.3px 0.8px 1.1px rgba(187, 187, 187, 0.11)',
                        borderRadius: '9px',
                      }
                    : {
                        color: '#272930',
                        background: 'rgba(76, 76, 252, 0.02)',
                        boxShadow:
                          '1.1px 2.7px 3.8px -1.2px rgba(187, 187, 187, 0.1), 0.5px 1.3px 1.8px -0.6px rgba(187, 187, 187, 0.1), 0.3px 0.8px 1.1px rgba(187, 187, 187, 0.11)',
                        borderRadius: '5px',
                      }),
                }}
              >{`Iteration ${index + 1}`}</Button>
            ))}
          </div>
        )}
        {generation.videos.map((vid, index) => (
          <TabPanel key={vid.id} value={index.toString()} sx={{ p: 0 }}>
            <ConceptGenerationComponent
              key={`${vid.id}-gen${index}`}
              genIndex={index}
              video={vid}
              generation={generation}
              onVideoClick={openVideoPlayer}
            />
          </TabPanel>
        ))}
      </TabContext>
      <VideoViewComponent
        open={isPlayerOpen}
        video={selectedVideo}
        onClose={handlePlayerClose}
        onIterate={openVideoIterate}
        onRateQuality={openVideoRate}
      />
      <RateQualityComponent open={isRateOpen} video={selectedVideo} onClose={handleRateClose} />
      <IterateConceptComponent
        open={isIterateOpen}
        video={selectedVideo}
        onClose={handleIterateClose}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          sx={{
            width: '100%',
            backgroundColor: 'rgb(46, 125, 50)',
            color: 'rgb(255, 255, 255)',
            '& .MuiAlert-icon': { color: 'rgb(255, 255, 255)' },
          }}
          onClose={handleSnackbarClose}
        >
          Your rating has been sent!
        </Alert>
      </Snackbar>
    </Paper>
  )
}

const timeSince = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + 'y'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + 'months'
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + 'd'
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + 'h'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + 'mins'
  }
  return Math.floor(seconds) + 's'
}

export default ConceptItemComponent

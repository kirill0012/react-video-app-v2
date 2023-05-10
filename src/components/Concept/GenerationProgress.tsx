import { useEffect, useState } from 'react'
import { Button, LinearProgress, Typography } from '@mui/material'
import { VideoItem, ConceptsAPI } from '../../services/concepts'
import { Mixpanel } from '../../utils/Mixpanel'
import { useDispatch } from 'react-redux'
import { cancelVideo } from '../../redux/reducers/genReducer'

type Props = {
  genIndex: number
  video: VideoItem
}

const ConceptGenerationProgressComponent = (props: Props) => {
  const { genIndex, video } = props

  const dispatch = useDispatch()
  const [current, setCurrent] = useState(new Date())
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const handleCancelButtonClick = async (id: string) => {
    setButtonDisabled(true)

    Mixpanel.track('Cancel Generation', { generation_id: id })
    await ConceptsAPI.cancelGeneration(id).then(() => {
      dispatch(cancelVideo(id))
    })
  }

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(new Date())
    }, 1000)
    return () => clearInterval(id)
  }, [current])

  let eta_string = ''
  let eta_value = 0

  if (video.created && video.eta) {
    const created = new Date(video.created)
    const eta = new Date(video.eta)

    if (current <= eta) {
      const total_time = eta.getTime() - created.getTime()
      const passed_time = current.getTime() - created.getTime()
      const left_minutes = Math.round((eta.getTime() - current.getTime()) / (60 * 1000))

      eta_value = Math.round((passed_time / total_time) * 100)
      eta_string =
        left_minutes > 99 ? `${Math.round(left_minutes / 60)} Hours` : `${left_minutes} mins`
    }
  }

  // if (genIndex == 0) {
  // show splash
  return (
    <>
      <Typography
        sx={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#272930',
          pb: '16px',
          lineHeight: '31px',
        }}
      >
        {genIndex === 0 ? 'Working on your new concept!' : 'Working on your new iteration!'}
        <br />
        Come back to check it out when the ETA is done (:
      </Typography>
      <Typography sx={{ fontSize: '16px', fontWeight: '400', color: '#272930', pb: '12px' }}>
        We are now
      </Typography>
      {genIndex === 0 ? (
        <>
          <Typography sx={{ fontSize: '16px', fontWeight: '400', color: '#272930', pb: '12px' }}>
            📹 Generating new videos
          </Typography>
          <Typography sx={{ fontSize: '16px', fontWeight: '400', color: '#272930', pb: '12px' }}>
            🚀 Filtering the best results
          </Typography>
          <Typography sx={{ fontSize: '16px', fontWeight: '400', color: '#272930', pb: '12px' }}>
            ✅ Making sure they fit your brand
          </Typography>
          <Typography sx={{ fontSize: '16px', fontWeight: '400', color: '#272930', pb: '24px' }}>
            📬 Delivering them to you
          </Typography>
        </>
      ) : (
        <>
          <Typography sx={{ fontSize: '16px', fontWeight: '400', color: '#272930', pb: '12px' }}>
            🔄 Creating video variations
          </Typography>
          <Typography sx={{ fontSize: '16px', fontWeight: '400', color: '#272930', pb: '12px' }}>
            🚀 Selecting the most effective changes
          </Typography>
          <Typography sx={{ fontSize: '16px', fontWeight: '400', color: '#272930', pb: '12px' }}>
            ✅ Ensuring they align with your brand
          </Typography>
          <Typography sx={{ fontSize: '16px', fontWeight: '400', color: '#272930', pb: '24px' }}>
            📬 Delivering the updated videos to you
          </Typography>
        </>
      )}
      {eta_value >= 0 && (
        <>
          <div style={{ paddingBottom: '12px', display: 'flex' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#81848F' }}>
              ⏳ ETA
            </Typography>
            <Typography
              sx={{ fontSize: '14px', fontWeight: '500', color: '#272930', pl: '4px' }}
              suppressHydrationWarning={true}
            >
              ≈ {eta_string}
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#81848F',
                flexGrow: 1,
                textAlign: 'right',
              }}
            >
              If other requests are disabled, wait until some requests are done
            </Typography>
          </div>
          <LinearProgress
            variant="determinate"
            value={eta_value}
            sx={{
              mb: '23px',
              height: '8px',
              borderRadius: '4px',
              background: '#EEEFF0',
              '& .MuiLinearProgress-bar': {
                background: '#272930',
                borderRadius: '4px',
              },
            }}
          />
        </>
      )}
      <Button
        size="large"
        type="submit"
        variant="contained"
        disabled={buttonDisabled}
        onClick={() => handleCancelButtonClick(video.id)}
        sx={{
          borderRadius: '8px',
          height: '48px',
          textTransform: 'none',
          fontSize: '18px',
          fontWeight: '400',
          background: '#FFE9E8',
          color: '#A10E25',
          '&:hover': { background: '#faf0f0' },
        }}
      >
        Cancel
      </Button>
    </>
  )
  // } else {
  //   return (
  //     <>
  //       <div style={{ marginBottom: '9px', display: 'flex' }}>
  //         <div style={{ width: '304px', height: '208px', position: 'relative' }}>
  //           <Image
  //             src={video.image}
  //             alt="thumb"
  //             fill={true}
  //             style={{ objectFit: 'cover', borderRadius: '16px' }}
  //           />
  //         </div>
  //         <div style={{ flexGrow: 1 }}></div>
  //         <div
  //           key={video.id}
  //           style={{
  //             width: '64px',
  //             height: '64px',
  //             position: 'relative',
  //             marginLeft: '16px',
  //           }}
  //         >
  //           <Image
  //             src={video.image}
  //             alt="thumb"
  //             fill={true}
  //             style={{ objectFit: 'cover', borderRadius: '8px' }}
  //           />
  //         </div>
  //       </div>
  //       <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#81848F', pb: '16px' }}>
  //         {video.generation.title}
  //       </Typography>
  //       {eta_value > 0 && (
  //         <>
  //           <div style={{ paddingBottom: '12px', display: 'flex' }}>
  //             <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#81848F' }}>
  //               ⏳ ETA:
  //             </Typography>
  //             <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#272930', pl: '8px' }}>
  //               ≈ {eta_string}
  //             </Typography>
  //             <Typography
  //               sx={{
  //                 fontSize: '14px',
  //                 fontWeight: '500',
  //                 color: '#81848F',
  //                 flexGrow: 1,
  //                 textAlign: 'right',
  //               }}
  //             >
  //               We’ll notify you by email when they’re ready
  //             </Typography>
  //           </div>
  //           <LinearProgress
  //             variant="determinate"
  //             value={eta_value}
  //             sx={{
  //               mb: '16px',
  //               height: '8px',
  //               borderRadius: '4px',
  //               background: '#EEEFF0',
  //               '& .MuiLinearProgress-bar': {
  //                 background: '#272930',
  //                 borderRadius: '4px',
  //               },
  //             }}
  //           />
  //         </>
  //       )}
  //
  //       <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#81848F' }}>
  //         Iterating {video.generation.title}
  //       </Typography>
  //       <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#81848F', pb: '24px' }}>
  //         {video.generation.brief}
  //       </Typography>
  //       <Button
  //         size="large"
  //         type="submit"
  //         variant="contained"
  //         onClick={async () => {
  //           onCancel(video.id);
  //           const access_token = Cookies.get('access_token')
  //           await ConceptsAPI.listConceptsServerSide(access_token);
  //         }}
  //         sx={{
  //           borderRadius: '8px',
  //           height: '48px',
  //           textTransform: 'none',
  //           fontSize: '18px',
  //           fontWeight: '400',
  //           background: '#FFE9E8',
  //           color: '#A10E25',
  //           '&:hover': { background: '#faf0f0' },
  //         }}
  //       >
  //         Cancel
  //       </Button>
  //     </>
  //   )
  // }
}

export default ConceptGenerationProgressComponent

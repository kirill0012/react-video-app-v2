import { Typography } from '@mui/material'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import { Generation, VideoItem } from '../../services/concepts'
import ConceptGenerationProgressComponent from './GenerationProgress'

type Props = {
  genIndex: number
  video: VideoItem
  generation: Generation
  onVideoClick: (video: VideoItem) => void
}

const ConceptGenerationComponent = (props: Props) => {
  const { genIndex, video, generation } = props

  if (video.in_progress) {
    // show splash

    return <ConceptGenerationProgressComponent video={video} genIndex={genIndex} />
  }

  return (
    <>
      <div style={{ marginBottom: '8px', display: 'flex' }}>
        <div
          style={{ width: '400px', height: '250px', position: 'relative', cursor: 'pointer' }}
          onClick={() => props.onVideoClick(video)}
        >
          <img
            src={video.image}
            alt="thumb"
            style={{ objectFit: 'cover', borderRadius: '16px', width: '100%', height: '100%' }}
          />
          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '100%' }}>
            <PlayCircleOutlineIcon
              sx={{
                position: 'absolute',
                marginLeft: '-32px',
                marginTop: '-32px',
                top: '50%',
                left: '50%',
                color: '#fff',
                width: '64px',
                height: '64px',
              }}
            />
          </div>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        {/*<div*/}
        {/*  key={video.id}*/}
        {/*  style={{*/}
        {/*    width: '64px',*/}
        {/*    height: '64px',*/}
        {/*    position: 'relative',*/}
        {/*    marginLeft: '16px',*/}
        {/*    cursor: 'pointer',*/}
        {/*  }}*/}
        {/*  onClick={() => props.onVideoClick(video)}*/}
        {/*>*/}
        {/*  <Image*/}
        {/*    src={video.image}*/}
        {/*    alt="thumb"*/}
        {/*    fill={true}*/}
        {/*    style={{ objectFit: 'cover', borderRadius: '8px' }}*/}
        {/*  />*/}
        {/*  <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '100%' }}>*/}
        {/*    <PlayCircleOutlineIcon*/}
        {/*      sx={{*/}
        {/*        position: 'absolute',*/}
        {/*        marginLeft: '-16px',*/}
        {/*        marginTop: '-16px',*/}
        {/*        top: '50%',*/}
        {/*        left: '50%',*/}
        {/*        color: '#fff',*/}
        {/*        width: '32px',*/}
        {/*        height: '32px',*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
      <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#81848F', pb: '16px' }}>
        {generation ? generation.title : ''}
      </Typography>
      {/*<Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#81848F', pb: '12px' }}>*/}
      {/*  {generation.ref != null*/}
      {/*    ? `This video was iterated on base of ${generation.ref} with the following request:`*/}
      {/*    : 'This video was created base on the following brief, that was generated according to your data:'}*/}
      {/*</Typography>*/}
      <Typography sx={{ fontSize: '16px', fontWeight: '400', color: '#272930' }}>
        {generation ? generation.brief : ''}
      </Typography>
    </>
  )
}

export default ConceptGenerationComponent

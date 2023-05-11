import ConceptItemComponent from './Item'
import { Skeleton, Typography } from '@mui/material'

import { useSelector } from 'react-redux'

import {
  getGenerations,
  getIdeaLoading,
  getIdea,
  getGenLoading,
} from '../../redux/reducers/genReducer'

const ConceptsList = () => {
  const generations = useSelector(getGenerations)
  const conceptIdea = useSelector(getIdea)
  const isGeneratingIdea = useSelector(getIdeaLoading)
  const isGenListLoading = useSelector(getGenLoading)

  if (isGenListLoading) {
    return (
      <>
        <Skeleton variant="text" sx={{ fontSize: '18px', pb: '16px' }} />
        <Skeleton variant="rounded" sx={{ pb: '8px', width: '100%', height: '250px' }} />
        <Skeleton variant="text" sx={{ fontSize: '14px', pb: '16px' }} width={100} />
        <Skeleton variant="text" sx={{ fontSize: '16px' }} />
        <Skeleton variant="text" sx={{ fontSize: '16px' }} />
        <Skeleton variant="text" sx={{ fontSize: '16px' }} />
      </>
    )
  }

  if (generations.length == 0 && !conceptIdea && !isGeneratingIdea) {
    return (
      <Typography
        sx={{
          fontSize: '20px',
          fontWeight: '700',
          color: '#81848F',
          textAlign: 'center',
        }}
      >
        You still didn’t generate any videos!
      </Typography>
    )
  }

  return (
    <>
      {[...generations].reverse().map((generation, index) => (
        <ConceptItemComponent key={generation.id} index={index} generation={generation} />
      ))}
    </>
  )
}

export default ConceptsList

import ConceptItemComponent from './Item'
import { Typography } from '@mui/material'

import { useSelector } from 'react-redux'

import { getGenerations, getRequestPending, getIdea } from '../../redux/reducers/genReducer'

const ConceptsList = () => {
  const generations = useSelector(getGenerations)
  const conceptIdea = useSelector(getIdea)
  const isGeneratingIdea = useSelector(getRequestPending)

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

import ConceptItemComponent from './Item'
import { IterateFormData } from '../Dialogs/IterateConcept'
import { Typography } from '@mui/material'

import { useSelector } from 'react-redux'

import { getGenerations, getRequestPending, getIdea } from '../../redux/reducers/genReducer'

// type Props = {
//   generations: Array<Generation>
//   onCancel: (id: number) => void
//   iterationDisabled: boolean
//   onIterateVideo: (videoId: number, data: IterateFormData) => void
// }

const ConceptsList = () => {
  // const { generations, onCancel, onIterateVideo } = props
  const generations = useSelector(getGenerations)
  const conceptIdea = useSelector(getIdea)
  const isGeneratingIdea = useSelector(getRequestPending)

  const iterationDisabled = false

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
        <ConceptItemComponent
          key={generation.id}
          index={index}
          generation={generation}
          iterationDisabled={iterationDisabled}
        />
      ))}
    </>
  )
}

export default ConceptsList

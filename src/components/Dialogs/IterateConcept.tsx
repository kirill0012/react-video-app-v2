import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import {
  Box,
  Button,
  ButtonProps,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Modal,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { ConceptsAPI, VideoItem } from '../../services/concepts'
import { subjects, removeElements } from '../../constants/iteration'
import { Mixpanel } from '../../utils/Mixpanel'
import { useDispatch } from 'react-redux'
import { addGeneration } from '../../redux/reducers/genReducer'

type Props = {
  video: VideoItem | null
  open: boolean
  onClose: () => void
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

const defaultValues: IterateFormData = {
  subject: [],
  transcript: '',
  remove: [],
}

const schema = yup.object().shape({})

export interface IterateFormData {
  subject: Array<number>
  transcript: string
  remove: Array<number>
}

const IterateConceptComponent = (props: Props) => {
  const { video } = props

  const dispatch = useDispatch()

  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  if (!video) return null

  const onSubmit = async (data: IterateFormData) => {
    Mixpanel.track('Iterate Video', {
      video_link_to_s3: video.src,
      video_object: video,
      iterate_data: data,
    })
    await ConceptsAPI.iterateConcept(video.id, data.subject, data.transcript, data.remove).then(
      (gen) => {
        dispatch(addGeneration(gen))
      }
    )

    onClose()
  }

  const onClose = () => {
    reset()
    props.onClose()
  }

  return (
    <Modal
      open={props.open}
      onClose={onClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ ...style, width: 624, '&:focus': { outline: '0 !important' } }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <Typography sx={{ fontSize: '20px', fontWeight: 700, flexGrow: 1 }}>
              Generate iterations
            </Typography>
            <CloseIcon sx={{ cursor: 'pointer' }} onClick={onClose} />
          </div>
          <Typography sx={{ fontSize: '16px', fontWeight: 400, pb: '24px' }}>
            Choose what you want to be iterated! Missing something? Let us know on Slack!
          </Typography>
          <div style={{ marginBottom: '16px', lineHeight: '20px' }}>
            {/*<Typography sx={{ fontSize: '14px', fontWeight: 500, display: 'inline-block' }}>*/}
            {/*  Optional:*/}
            {/*</Typography>*/}
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: '20px',
                display: 'inline-block',
                ml: '4px',
              }}
            >
              {/*What to iterate (Adds if it doesn’t exist) -> Only regular iteration for now*/}
              Choose what to iterate
            </Typography>
          </div>

          <FormControl component="fieldset" fullWidth size="small" sx={{ mb: '18px' }}>
            <FormGroup row>
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexWrap: 'wrap',
                      height: '98px',
                    }}
                  >
                    {subjects.map((item) => (
                      <FormControlLabel
                        {...field}
                        key={item.id}
                        label={item.label}
                        value={item.id}
                        sx={{
                          flex: '0 0 33.333333%',
                          height: '28px',
                          width: '190px',
                        }}
                        control={
                          <Checkbox
                            onChange={() => {
                              if (!field.value.includes(item.id)) {
                                field.onChange([...field.value, item.id])
                                return
                              }
                              const newTopics = field.value.filter((topic) => topic !== item.id)
                              field.onChange(newTopics)
                            }}
                          />
                        }
                      />
                    ))}
                  </div>
                )}
              />
            </FormGroup>
          </FormControl>

          {/*          <div style={{ marginBottom: '16px', lineHeight: '20px' }}>*/}
          {/*            <Typography sx={{ fontSize: '14px', fontWeight: 500, display: 'inline-block' }}>*/}
          {/*              Optional:*/}
          {/*            </Typography>*/}
          {/*            <Typography*/}
          {/*              sx={{*/}
          {/*                fontSize: '16px',*/}
          {/*                fontWeight: 600,*/}
          {/*                lineHeight: '20px',*/}
          {/*                display: 'inline-block',*/}
          {/*                ml: '4px',*/}
          {/*              }}*/}
          {/*            >*/}
          {/*              Update text transcript*/}
          {/*            </Typography>*/}
          {/*          </div>*/}

          {/*          <FormControl fullWidth size="small" sx={{ pb: '24px', flexDirection: 'row' }}>*/}
          {/*            <Controller*/}
          {/*              name="transcript"*/}
          {/*              control={control}*/}
          {/*              render={({ field: { value, onChange, onBlur } }) => (*/}
          {/*                <TextField*/}
          {/*                  id="iterate-trancsript"*/}
          {/*                  value={value}*/}
          {/*                  onBlur={onBlur}*/}
          {/*                  onChange={onChange}*/}
          {/*                  size="small"*/}
          {/*                  placeholder={`“Winter wonderland!”*/}
          {/*”I wish I could see you dance!”`}*/}
          {/*                  multiline*/}
          {/*                  rows={2}*/}
          {/*                  sx={{*/}
          {/*                    '& .MuiOutlinedInput-root': {*/}
          {/*                      backgroundColor: '#EEEFF0',*/}
          {/*                      height: '52px',*/}
          {/*                      '& textarea': {*/}
          {/*                        fontSize: '14px',*/}
          {/*                        lineHeight: '21px',*/}
          {/*                        color: '#81848F',*/}
          {/*                      },*/}
          {/*                      '& fieldset': {*/}
          {/*                        borderColor: '#DDDEE0',*/}
          {/*                        borderRadius: '8px',*/}
          {/*                      },*/}
          {/*                    },*/}
          {/*                    flexGrow: 1,*/}
          {/*                  }}*/}
          {/*                />*/}
          {/*              )}*/}
          {/*            />*/}
          {/*          </FormControl>*/}

          <div style={{ marginBottom: '16px', lineHeight: '20px' }}>
            {/*<Typography sx={{ fontSize: '14px', fontWeight: 500, display: 'inline-block' }}>*/}
            {/*  Optional:*/}
            {/*</Typography>*/}
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: '20px',
                display: 'inline-block',
                ml: '4px',
              }}
            >
              Choose elements to remove
            </Typography>
          </div>

          <FormControl component="fieldset" fullWidth size="small" sx={{ mb: '123px' }}>
            <FormGroup row>
              <Controller
                name="remove"
                control={control}
                render={({ field }) => (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexWrap: 'wrap',
                      height: '98px',
                    }}
                  >
                    {removeElements.map((item) => (
                      <FormControlLabel
                        {...field}
                        key={item.id}
                        label={item.label}
                        value={item.id}
                        sx={{
                          flex: '0 0 33.333333%',
                          height: '28px',
                          width: '190px',
                        }}
                        control={
                          <Checkbox
                            onChange={() => {
                              if (!field.value.includes(item.id)) {
                                field.onChange([...field.value, item.id])
                                return
                              }
                              const newTopics = field.value.filter((topic) => topic !== item.id)
                              field.onChange(newTopics)
                            }}
                          />
                        }
                      />
                    ))}
                  </div>
                )}
              />
            </FormGroup>
          </FormControl>

          <div style={{ display: 'flex', gap: '24px' }}>
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
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
              onClick={onClose}
            >
              Cancel
            </ButtonSecondaryWrapper>
          </div>
        </Box>
      </form>
    </Modal>
  )
}

export default IterateConceptComponent

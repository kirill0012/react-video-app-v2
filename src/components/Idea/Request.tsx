import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined'

import {
  Button,
  FormControl,
  // IconButton,
  MenuItem,
  Paper,
  Select,
  // TextField,
  // Tooltip,
} from '@mui/material'

import { useSelector, useDispatch } from 'react-redux'

import {
  getGenerateAbility,
  setIdeaLoading,
  setIdea,
  setIdeaRequest,
} from '../../redux/reducers/genReducer'
import { Mixpanel } from '../../utils/Mixpanel'
import { IdeaRequest as Request, IdeasAPI } from '../../services/ideas'

const schema = yup.object().shape({})

const defaultValues: RequestFormData = {
  videosize: 'Portrait (1080x1350)',
  videofor: 'Facebook',
  videoconcept: 'original_gameplay',
  videotheme: '',
  game_id: 'animal_kingdom',
}

export interface RequestFormData {
  videosize: string
  videofor: string
  videoconcept: string
  videotheme: string
  game_id: string
}

const IdeaRequest = () => {
  const dispatch = useDispatch()
  const isDisabled = !useSelector(getGenerateAbility)

  const {
    control,
    // setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: RequestFormData) => {
    const postData: Request = {
      concept_name: data.videoconcept,
      game_id: data.game_id,
      size_format: data.videosize,
      ad_networks_group: data.videofor,
      ad_placement: '',
    }

    Mixpanel.track('Generate Concept', { data: data })
    dispatch(setIdeaLoading(true))
    IdeasAPI.generateIdea(postData)
      .then((idea) => {
        dispatch(setIdea(idea))
        dispatch(setIdeaRequest(postData))
      })
      .catch(() => {
        dispatch(setIdea(null))
        dispatch(setIdeaRequest(null))
      })
      .finally(() => {
        dispatch(setIdeaLoading(false))
      })
  }

  return (
    <Paper
      sx={{
        p: '24px',
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
        borderRadius: '16px',
      }}
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth size="small" sx={{ pb: '16px' }}>
          <label
            htmlFor="auth-login-email"
            style={{
              fontSize: '14px',
              fontWeight: '500',
              lineHeight: '21px',
              marginBottom: '4px',
              color: '#272930',
            }}
          >
            I need
          </label>

          <Controller
            name="videosize"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Select
                labelId="concept-video-size"
                id="concept-video-size"
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                IconComponent={UnfoldMoreOutlinedIcon}
                disabled={isDisabled}
                MenuProps={{
                  sx: {
                    '& .MuiMenu-paper': {
                      boxShadow:
                        'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px',
                    },
                  },
                }}
                sx={{
                  color: '#81848F',
                  borderColor: '#DDDEE0',
                  borderRadius: '8px',
                }}
              >
                <MenuItem value="Portrait (1080x1350)">Portrait (1080x1350)</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        <FormControl fullWidth size="small" sx={{ pb: '24px' }}>
          <label
            htmlFor="auth-login-email"
            style={{
              fontSize: '14px',
              fontWeight: '500',
              lineHeight: '21px',
              marginBottom: '4px',
              color: '#272930',
            }}
          >
            Videos for
          </label>

          <Controller
            name="videofor"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Select
                labelId="concept-video-for"
                id="concept-video-for"
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                IconComponent={UnfoldMoreOutlinedIcon}
                disabled={isDisabled}
                MenuProps={{
                  sx: {
                    '& .MuiMenu-paper': {
                      boxShadow:
                        'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px',
                    },
                  },
                }}
                sx={{
                  color: '#81848F',
                  borderColor: '#DDDEE0',
                  borderRadius: '8px',
                }}
              >
                <MenuItem value="Facebook">Facebook</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        <FormControl fullWidth size="small" sx={{ pb: '12px' }}>
          <label
            htmlFor="auth-login-email"
            style={{
              fontSize: '14px',
              fontWeight: '500',
              lineHeight: '21px',
              marginBottom: '4px',
              color: '#272930',
            }}
          >
            Choose a concept
          </label>

          <Controller
            name="videoconcept"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Select
                labelId="concept-video-concept"
                id="concept-video-concept"
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                IconComponent={UnfoldMoreOutlinedIcon}
                disabled={isDisabled}
                MenuProps={{
                  sx: {
                    '& .MuiMenu-paper': {
                      boxShadow:
                        'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px',
                    },
                  },
                }}
                sx={{
                  color: '#81848F',
                  borderColor: '#DDDEE0',
                  borderRadius: '8px',
                }}
              >
                <MenuItem value="original_gameplay">Original Gameplay</MenuItem>
                <MenuItem value="fake_gameplay">Fake Gameplay</MenuItem>
                <MenuItem value="fake_themes">Reskinned Gameplay</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        {/* Not including this component at the initial release */}
        {/*<FormControl fullWidth size="small" sx={{ pb: '24px', flexDirection: 'row' }}>*/}
        {/*  <Controller*/}
        {/*    name="videotheme"*/}
        {/*    control={control}*/}
        {/*    rules={{ required: true }}*/}
        {/*    render={({ field: { value, onChange, onBlur } }) => (*/}
        {/*      <TextField*/}
        {/*        id="concept-video-theme"*/}
        {/*        value={value}*/}
        {/*        onBlur={onBlur}*/}
        {/*        onChange={onChange}*/}
        {/*        size="small"*/}
        {/*        placeholder="Describe theme"*/}
        {/*        disabled={disabled}*/}
        {/*        sx={{*/}
        {/*          '& .MuiOutlinedInput-root': {*/}
        {/*            '& input': {*/}
        {/*              color: '#81848F',*/}
        {/*            },*/}
        {/*            '& fieldset': {*/}
        {/*              borderColor: '#DDDEE0',*/}
        {/*              borderRadius: '8px',*/}
        {/*            },*/}
        {/*          },*/}
        {/*          flexGrow: 1,*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    )}*/}
        {/*  />*/}
        {/*  <div style={{ display: 'inline-flex' }}>*/}
        {/*    <Tooltip title="Visual theme means what kind of visuals do you want to include, it will effect ads to some extent, depends on the concept">*/}
        {/*      <IconButton sx={{ mr: '-8px' }}>*/}
        {/*        <InfoOutlinedIcon />*/}
        {/*      </IconButton>*/}
        {/*    </Tooltip>*/}
        {/*  </div>*/}
        {/*</FormControl>*/}

        {!isDisabled && (
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{
              marginTop: '20px',
              borderRadius: '8px',
              height: '48px',
              textTransform: 'none',
              fontSize: '18px',
              fontWeight: '400',
            }}
            disabled={isDisabled}
          >
            Generate
          </Button>
        )}
      </form>
    </Paper>
  )
}

export default IdeaRequest

// ** React Imports
import { ReactNode, useState } from 'react'

import {
  Box,
  BoxProps,
  Card,
  CardContent,
  Typography,
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
  FormHelperText,
  Button,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Visibility, VisibilityOff } from '@mui/icons-material'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Layout Import
import BlankLayout from '../layouts/BlankLayout'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setUser } from '../redux/reducers/userReducer'

// ** Analytics Import
import { Mixpanel } from '../utils/Mixpanel'
import { AuthAPI } from '../services/auth'

// ** Styled Components
const AuthIllustrationWrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
  maxWidth: 406,
  position: 'relative',
}))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
})

const defaultValues = {
  password: 'AB12345678',
  email: 'mor@innplaylabs.com',
}

interface FormData {
  email: string
  password: string
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // ** Hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    const { email, password } = data
    Mixpanel.track('Login', { email: email })
    Mixpanel.identify(email)
    AuthAPI.login({ email, password })
      .then((user) => {
        dispatch(setUser(user))
        navigate('/')
      })
      .catch(() => {
        setError('email', {
          type: 'manual',
          message: 'Email or Password is invalid',
        })
      })
    //dispatch(setUser(checked))
    // auth.login({ email, password }, () => {
    //   setError('email', {
    //     type: 'manual',
    //     message: 'Email or Password is invalid',
    //   })
    // })
  }

  return (
    <BlankLayout>
      <Box className="content-center">
        <AuthIllustrationWrapper>
          <Card sx={{ borderRadius: '16px' }}>
            <CardContent sx={{ p: '42px 24px 24px 24px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 900, fontSize: '36px', lineHeight: '54px' }}
                  >
                    sett
                  </Typography>
                </div>
                <div
                  style={{
                    display: 'flex',
                    padding: '2px 23px',
                    border: '1.5px solid #4C4CFC',
                    borderRadius: '12px',
                    marginLeft: '12px',
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 900,
                      fontSize: '36px',
                      color: '#4C4CFC',
                      lineHeight: '54px',
                    }}
                  >
                    AI
                  </Typography>
                </div>
              </div>

              <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth variant="standard" sx={{ pt: '43px' }}>
                  <label
                    htmlFor="auth-login-email"
                    style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      lineHeight: '21px',
                      color: '#272930',
                      marginBottom: '4px',
                    }}
                  >
                    Enter email
                  </label>

                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        id="auth-login-email"
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.email)}
                        placeholder=""
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#DDDEE0',
                              borderRadius: '8px',
                            },
                          },
                        }}
                      />
                    )}
                  />
                  {errors.email && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {errors.email.message}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth sx={{ pt: '16px', mb: '24px' }} variant="standard">
                  <label
                    htmlFor="auth-login-password"
                    style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      lineHeight: '21px',
                      marginBottom: '4px',
                      color: '#272930',
                    }}
                  >
                    Enter password
                  </label>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        id="auth-login-password"
                        error={Boolean(errors.password)}
                        type={showPassword ? 'text' : 'password'}
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#DDDEE0',
                              borderRadius: '8px',
                            },
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <VisibilityOff fontSize="small" />
                                ) : (
                                  <Visibility fontSize="small" />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                  {errors.password && (
                    <FormHelperText sx={{ color: 'error.main' }} id="">
                      {errors.password.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{
                    mb: '12px',
                    borderRadius: '8px',
                    height: '48px',
                    textTransform: 'none',
                    fontSize: '18px',
                    fontWeight: '400',
                  }}
                >
                  Sign in
                </Button>
              </form>
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="text"
                sx={{
                  mb: 0,
                  borderRadius: '8px',
                  height: '48px',
                  textTransform: 'none',
                  fontSize: '18px',
                  fontWeight: '400',
                }}
              >
                Forget password?
              </Button>
            </CardContent>
          </Card>
        </AuthIllustrationWrapper>
      </Box>
    </BlankLayout>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage

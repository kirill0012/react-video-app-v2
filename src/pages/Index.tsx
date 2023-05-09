import React, { useEffect } from 'react'
import { Grid } from '@mui/material'
import '../App.css'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setUser, setProfile } from '../redux/reducers/userReducer'
import { loadGenerations } from '../redux/reducers/genReducer'
import { AuthAPI } from '../services/auth'

// ** Layout Import
import UserLayout from '../layouts/UserLayout'
import MyProject from '../components/MyProject'
import IdeaRequest from '../components/Idea/Request'
import IdeaConfirmation from '../components/Idea/Confirmation'
import ConceptsList from '../components/Concept/List'
import { ConceptsAPI } from '../services/concepts'

function Index() {
  // ** Hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // first of all quick check for session cookie
    if (!AuthAPI.isAuthCookies()) {
      navigate('/login')
      return
    }

    // load session, profile, data
    AuthAPI.me()
      .then((me) => {
        dispatch(setUser(me))
      })
      .catch(() => {
        navigate('/login')
      })

    AuthAPI.profile()
      .then((profile) => {
        dispatch(setProfile(profile))
      })
      .catch(() => {
        navigate('/login')
      })

    ConceptsAPI.listConcepts()
      .then((generations) => {
        dispatch(loadGenerations(generations))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <UserLayout>
      <Grid container spacing={2} sx={{ flexDirection: { xs: 'column-reverse', md: 'row' } }}>
        <header>
          <title>SettAI</title>
        </header>
        <Grid item xs sx={{ pr: '30px', pt: '22px !important' }}>
          <MyProject />
          <IdeaConfirmation />
          <ConceptsList />
        </Grid>
        <Grid item sx={{ width: '406px', pl: '0px !important' }}>
          <IdeaRequest />
        </Grid>
      </Grid>
    </UserLayout>
  )
}

export default Index

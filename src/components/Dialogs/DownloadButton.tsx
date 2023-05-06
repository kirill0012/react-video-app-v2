import React from 'react'
import { Button, ButtonProps, styled } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'

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

const CustomDownloadButton = ({ url, file_name }: { url: string; file_name: string }) => {
  const handleDownloadClick = async () => {
    try {
      // const response = await fetch(url)
      // if (!response.ok) {
      //   throw new Error('Failed to fetch video')
      // }
      // const blob = await response.blob()
      // const downloadUrl = URL.createObjectURL(blob)
      const timestamp = new Date().getTime()
      const downloadUrl = `${url}?t=${timestamp}`

      const link = document.createElement('a')
      link.href = url
      link.download = file_name + '.mp4'
      // link.style.display = 'none';
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      // const link = document.createElement('a')
      // link.href = url
      // document.body.appendChild(link)
      // link.click()
      // document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading video:', error)
    }
  }

  return (
    <ButtonSecondaryWrapper
      fullWidth
      size="large"
      type="submit"
      variant="contained"
      onClick={handleDownloadClick}
    >
      <DownloadIcon sx={{ mr: '10px' }} />
      Download
    </ButtonSecondaryWrapper>
  )
}

export default CustomDownloadButton

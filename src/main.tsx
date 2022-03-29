import { GlobalStyles, MantineProvider } from "@mantine/core";

import { Mantine } from './Components/Mantine'
import { NotificationsProvider } from '@mantine/notifications';
import React from 'react'
import ReactDOM from 'react-dom'

const defaultProps = {
  Container: {

    sizes: {
      xs: 540,
      sm: 720,
      md: 960,
      lg: 1140,
      xl: 1320,
    },
  }
}

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider
      defaultProps={defaultProps}
      theme={{ colorScheme: "dark", fontFamilyMonospace: "source code pro", defaultRadius: 'sm' }}>
      <NotificationsProvider>


        <GlobalStyles />
        <Mantine />
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

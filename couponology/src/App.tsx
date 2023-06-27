import React, { useState } from 'react';
import './App.css';
import Footer from './Components/LayoutArea/Footer/Footer';
import Header from './Components/LayoutArea/Header/Header';
import Main from './Components/LayoutArea/Main/Main';
import Menu from './Components/LayoutArea/Menu/Menu';
import 'notyf/notyf.min.css';
import { ThemeProvider, createTheme } from '@mui/material';







const theme = createTheme({
  palette: {
    mode: 'dark',
  }
})

function App() {


  //setConnectedClientType("sdf")

  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: "#1b1e23" }} className="App">

        <Header />
        <Menu />
        <Main />
        <Footer />

      </div>
    </ThemeProvider>
  );
}

export default App;

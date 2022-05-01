import React from "react";
import styled from "styled-components";
import { Box } from '@material-ui/core';
// import Navbar from "./layouts/navbar/navbar";
import Content from "./layouts/content/content";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Back from './assets/03.jpg'
import Particles from 'react-tsparticles';

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

function App() {

  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <StyledComponent>
          <Particles
            id="tsparticles"
            options={{
              // background: {
              //   color: {
              //     value: "#0d47a1",
              //   },
              // },
              fpsLimit: 100,
              interactivity: {
                events: {
                  onClick: {
                    enable: true,
                    mode: "push",
                  },
                  onHover: {
                    enable: true,
                    mode: "repulse",
                  },
                  resize: true,
                },
                modes: {
                  bubble: {
                    distance: 100,
                    duration: 1,
                    opacity: 0.2,
                    size: 100,
                  },
                  push: {
                    quantity: 3,
                  },
                  repulse: {
                    distance: 150,
                    duration: 0.6,
                  },
                },
              },
              particles: {
                color: {
                  // value: "#495193",
                  value: "#000000",
                },
                links: {
                  // color: "#495193",
                  color: "#000000",
                  distance: 150,
                  enable: true,
                  opacity: 0.8,
                  width: 0.7,
                },
                collisions: {
                  enable: true,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outMode: "bounce",
                  random: false,
                  speed: 1,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    area: 1000,
                  },
                  value: 50,   // count
                },
                opacity: {
                  value: 0.3,
                },
                shape: {
                  type: "star",
                },
                size: {
                  random: true,
                  value: 5,
                },
              },
              detectRetina: false,
            }}
          />
          {/* <Navbar /> */}
          <Content />
        </StyledComponent>
      </Web3ReactProvider>
    </>
  );
}

const StyledComponent = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  /* background-image: url(${Back}); */
  /* background-size: 100% 100%;
  background-repeat: no-repeat; */
  /* background-color: #F9F9F9; */
`
export default App;

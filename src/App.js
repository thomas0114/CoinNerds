import React from "react";
import styled from "styled-components";
import { Box } from '@material-ui/core';
// import Navbar from "./layouts/navbar/navbar";
import Content from "./layouts/content/content";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Back from './assets/03.jpg'
import Particles from 'react-tsparticles';
import BTCICON from "../src/images/btc.png";
import ETHICON from "../src/images/eth.png";
import DOGEICON from "../src/images/doge_new.png";
import DASHICON from "../src/images/dash.png";
import MORENOICON from "../src/images/monero.png";
import USDCICON from "../src/images/USDC.png";
// import Song01 from "../src/assets/music/hello.mp3";

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
                    enable: false,
                    mode: "push",
                  },
                  onHover: {
                    enable: true,
                    mode: "bubble",
                  },
                  resize: true,
                },
                modes: {
                  bubble: {
                    distance: 30,
                    duration: 1,
                    opacity: 1,
                    size: 30,
                  },
                  push: {
                    quantity: 9,
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
                  opacity: 0.7,
                  width: 1,
                },
                collisions: {
                  enable: true,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outMode: "bounce",
                  random: false,
                  speed: 0.5,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    area: 1000,
                  },
                  value: 40,   // count
                },
                opacity: {
                  value: 0.8,
                },
                shape: {
                  type: "image",
                  stroke: { width: 0.3, color: "#123541" },
                  image: [
                    { src: BTCICON, width: 60, height: 60 },
                    { src: ETHICON, width: 60, height: 60 },
                    { src: DOGEICON, width: 60, height: 60 },
                    { src: DASHICON, width: 60, height: 60 },
                    { src: MORENOICON, width: 60, height: 60 },
                    { src: USDCICON, width: 60, height: 60 },
                    { src: BTCICON, width: 60, height: 60 },
                  ]

                },
                size: {
                  // random: true,
                  value: 10,
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

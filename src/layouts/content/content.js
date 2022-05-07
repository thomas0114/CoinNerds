import React, { useEffect, useState } from "react";
import { Box } from '@material-ui/core';
import styled from "styled-components";
import Img_Logo1 from "../../images/logo-hd.png"
import buysell from "../../images/buysell.png"
import currency_data from "../../data/coin.json";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IMG_CAD from "../../images/cad.svg";
import IMG_USD from "../../images/usa.png";
import IMG_EUR from "../../images/euro.png";
import IMG_AED from "../../images/aed.png";
import IMG_INR from "../../images/inr.png";
import IMG_PKR from "../../images/pkr.png";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import MUSIC01 from "../../assets/music/Ecstasy_ATB_Tiff_Lacey_(Don_Rayzer_Remix)_ft_Cara_Delevingne.mp3"
import MUSIC02 from "../../assets/music/Frozen-All Is Found.mp3"
import MUSIC03 from "../../assets/music/Frozen-Let It Go.mp3"

import axios from "../../Server";
import multiplyer from "../../config";


const Content = () => {
    const array_rate = ['CAD', 'USD', 'EUR', 'AED', 'INR', 'PKR'];
    const [p_currencies, set_pCurrencies] = useState([]);
    const [rate_select, set_rate_select] = useState(0);
    const [rate_list, set_rate_list] = useState([]);
    const [rate_str, set_rate_str] = useState('CAD');
    const [select_num, set_select_num] = useState(0);
    const markdown_buy = multiplyer['markdown_buy'];
    const markup_sell = multiplyer['markup_sell'];

    useEffect(() => {
        setInterval(() => {
            axios.get("get_coinnerds_rate").then((res) => {
                set_pCurrencies(res.data.prices);
                set_rate_list(res.data.rates);
            }).catch((error) => {
            })
        }, 1000)

    }, [])
    useEffect(() => {
        // setTimeout(() => {

        // }, 2000);

        axios.get("get_coinnerds_rate").then((res) => {
            set_rate_select(res.data.p_cad);
        }).catch((error) => {
        })


    }, [])

    const useAudio = (url, url1, url2) => {
        const [audio] = useState(new Audio(url));
        const [audio1] = useState(new Audio(url1));
        const [audio2] = useState(new Audio(url2));
        const [playing, setPlaying] = useState(false);


        const toggle = () => setPlaying(!playing);

        useEffect(() => {
            if(playing === false)
            {
                audio.pause();
                audio1.pause();
                audio2.pause();
            }
            else
            {
                audio.play();
                audio1.play();
                audio2.play();
            }
            // playing ? audio.play() : audio.pause();

        }, [audio,audio1, audio2, playing]);

        useEffect(() => {
            audio.addEventListener('ended', () => {
                audio.pause();
                audio1.play();
            });
            audio1.addEventListener('ended', () => {
                audio1.pause();
                audio2.play();
            });
            audio2.addEventListener('ended', () => {
                audio1.pause();
                audio.play();
            });
        }, [audio, audio1, audio2]);

        return [playing, toggle];
    };

    const [flag_music, set_flag_music] = useAudio(MUSIC01, MUSIC02, MUSIC03);

    const changeRate = (e) => {
        set_select_num(e.target.value);
        set_rate_str(array_rate[e.target.value]);
        set_rate_select(rate_list[e.target.value]);
    }


    return (
        <StyledComponent>
            <LogoPart>
                <img src={Img_Logo1} alt="" />
            </LogoPart>
            <TablePart>
                <LeftPart>
                    <TableBox01>
                        <TopTitle01>
                            <LeftText01>WE BUY</LeftText01>
                            <RightText01>BUY RATE</RightText01>
                        </TopTitle01>
                        <TableContent>
                            {
                                currency_data.map((data, index) => {
                                    if (index < 5) {
                                        return (
                                            <RowText key={index}>
                                                <LeftText02>
                                                    <Box display="flex" alignItems="center">
                                                        <img src={data.image_url} width="25px" alt="" />
                                                    </Box>
                                                    <Box display="flex" alignItems="center" ml="10px">1 {data.symbol}</Box>
                                                </LeftText02>
                                                <RightText02>{Number((p_currencies[index] * rate_select * markdown_buy[index])).toFixed(2)} {rate_str}</RightText02>
                                            </RowText>
                                        );
                                    }
                                    else {
                                        return (
                                            <RowText key={index}>
                                                <LeftText02>
                                                    <Box display="flex" alignItems="center">
                                                        <img src={data.image_url} width="25px" alt="" />
                                                    </Box>
                                                    <Box display="flex" alignItems="center" ml="10px">1 {data.symbol}</Box>
                                                </LeftText02>
                                                <RightText02>{Number((p_currencies[index] * rate_select * markdown_buy[index])).toFixed(4)} {rate_str}</RightText02>
                                            </RowText>
                                        );
                                    }

                                })
                            }
                        </TableContent>
                    </TableBox01>
                </LeftPart>

                <RightPart>
                    <TableBox02>
                        <TopTitle02>
                            <LeftText01>WE SELL</LeftText01>
                            <RightText01>SELL RATE</RightText01>
                        </TopTitle02>
                        <TableContent>
                            {
                                currency_data.map((data, index) => {
                                    if (index < 5) {
                                        return (
                                            <RowText key={index}>
                                                <LeftText02>
                                                    <Box display="flex" alignItems="center">
                                                        <img src={data.image_url} width="25px" alt="" />
                                                    </Box>
                                                    <Box display="flex" alignItems="center" ml="10px">1 {data.symbol}</Box>
                                                </LeftText02>
                                                <RightText02>{Number((parseFloat(p_currencies[index]) * rate_select * markup_sell[index]).toFixed(2))} {rate_str}</RightText02>
                                            </RowText>
                                        );
                                    }
                                    else {
                                        return (
                                            <RowText key={index}>
                                                <LeftText02>
                                                    <Box display="flex" alignItems="center">
                                                        <img src={data.image_url} width="25px" alt="" />
                                                    </Box>
                                                    <Box display="flex" alignItems="center" ml="10px">1 {data.symbol}</Box>
                                                </LeftText02>
                                                <RightText02>{Number((parseFloat(p_currencies[index]) * rate_select * markup_sell[index]).toFixed(4))} {rate_str}</RightText02>
                                            </RowText>
                                        );
                                    }
                                })
                            }
                        </TableContent>
                    </TableBox02>
                </RightPart>
            </TablePart>
            <SelectCurrency>
                <Box display="flex" alignItems="center">
                    <Text01 display={"flex"} mr="3px" >
                        Currency:
                    </Text01>
                    <SelectBox01>
                        <FormControl className={'formControl'} >
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={select_num}
                                onChange={(e) => { changeRate(e) }}
                                className="select-all"
                            >
                                <MenuItem value={0}>
                                    <Box display="flex" alignItems={"center"}><Box display={"flex"} alignItems="center"><img src={IMG_CAD} width="25px" alt="" /></Box><Box display={"flex"} alignItems="center" ml={"5px"}>CAD</Box></Box>

                                </MenuItem>
                                <MenuItem value={1}>
                                    <Box display="flex" alignItems={"center"}><Box display={"flex"} alignItems="center"><img src={IMG_USD} width="25px" alt="" /></Box><Box display={"flex"} alignItems="center" ml={"5px"}>USD</Box></Box>

                                </MenuItem>
                                <MenuItem value={2}>
                                    <Box display="flex" alignItems={"center"}><Box display={"flex"} alignItems="center"><img src={IMG_EUR} width="25px" alt="" /></Box><Box display={"flex"} alignItems="center" ml={"5px"}>EUR</Box></Box>

                                </MenuItem>
                                <MenuItem value={3}>
                                    <Box display="flex" alignItems={"center"}><Box display={"flex"} alignItems="center"><img src={IMG_AED} width="25px" alt="" /></Box><Box display={"flex"} alignItems="center" ml={"5px"}>AED</Box></Box>

                                </MenuItem>
                                <MenuItem value={4}>
                                    <Box display="flex" alignItems={"center"}><Box display={"flex"} alignItems="center"><img src={IMG_INR} width="25px" alt="" /></Box><Box display={"flex"} alignItems="center" ml={"5px"}>INR</Box></Box>

                                </MenuItem>
                                <MenuItem value={5}>
                                    <Box display="flex" alignItems={"center"}><Box display={"flex"} alignItems="center"><img src={IMG_PKR} width="25px" alt="" /></Box><Box display={"flex"} alignItems="center" ml={"5px"}>PKR</Box></Box>

                                </MenuItem>
                            </Select>
                        </FormControl>
                    </SelectBox01>
                    <Text01 mr="3px" ml="30px">
                        Music:
                    </Text01>
                    <MusicBox display="flex" fontSize={"3.5rem"}>
                        {flag_music ? <MdToggleOn color="rgb(213 48 48)" onClick={() => set_flag_music()} /> : <MdToggleOff color="rgb(84 84 84)" onClick={() => set_flag_music()} />}
                    </MusicBox>
                </Box>
                <Text01>rates subject to terms {'&'} conditions</Text01>
                <Text02>Coin Nerds © 2022</Text02>
            </SelectCurrency>
            <BuysellPart>
                <img src={buysell} width="150px" alt="" />
            </BuysellPart>
        </StyledComponent>
    );
}

const StyledComponent = styled(Box)`
    display: flex;
    position: relative;
    width: 100%;
    /* height: 100%; */
    flex-direction: column;
    align-items: center;
    z-index: 1000;

`
const LogoPart = styled(Box)`
    display: flex;
    width: 100%;
    margin-top: 100px;
    justify-content: center;
    >img{
        width: 500px;
        @media (max-width: 900px) {
            width: 400px;
        }
        @media (max-width: 700px) {
            width: 300px;
        }
        @media (max-width: 500px) {
            width: 200px;
        }
        /* width : calc(100vw / 6000 * 2588);
        height : calc(100vw / 6000 * 420); */
    }
`

const TablePart = styled(Box)`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 50px;
    @media (max-width: 900px) {
        flex-direction: column;
    }
`

const LeftPart = styled(Box)`
    display: flex;
    flex: 1;
    justify-content: center;
`

const RightPart = styled(Box)`
    display: flex;
    flex: 1;
    justify-content: center;
`
const TableBox01 = styled(Box)`
    display: flex;
    width: 65%;
    flex-direction: column;
    height: 500px;
    border-radius: 8px;
    background-color: rgb(255, 255, 255);
    box-shadow: rgb(35 55 80) 0px 6px 10px;
    margin-bottom: 50px;
    @media (max-width: 1200px) {
        width: 70%;
    }
    @media (max-width: 1000px) {
        width: 85%;
    }
    &:hover{
        transition: .5s;
        box-shadow: rgb(14 114 53) 0px 10px 30px;
    }
`
const TableBox02 = styled(Box)`
    display: flex;
    width: 65%;
    flex-direction: column;
    height: 500px;
    border-radius: 8px;
    background-color: rgb(255, 255, 255);
    box-shadow: rgb(35 55 80) 0px 6px 10px;
    margin-bottom: 50px;
    @media (max-width: 1200px) {
        width: 70%;
    }
    @media (max-width: 1000px) {
        width: 85%;
    }
    &:hover{
        transition: .5s;
        box-shadow: rgb(122 7 7) 0px 10px 30px;
    }
`

const BuysellPart = styled(Box)`
    display: flex;
    position: absolute;
    top: 50%;
    >img{
        @media (max-width: 1200px) {
            width: 120px;
        }
    }
    @media (max-width: 1000px) {
        display: none;
    }
`
const TopTitle01 = styled(Box)`
    display: flex;
    width: 100%;
    height: 80px;
    align-items: center;
    background-color: rgb(37 183 93);
    border-radius: 8px 8px 0px 0px;
    color: white;
    font-size: 2rem;
    font-weight: 600;
    font-family: 'Changa One',sans-serif;
    @media (max-width: 1200px) {
        font-size: 1.7rem;
    }
    @media (max-width: 500px) {
        font-size: 1.5rem;
    }
`

const TopTitle02 = styled(Box)`
    display: flex;
    width: 100%;
    height: 80px;
    align-items: center;
    background-color: rgb(213 48 48);
    border-radius: 8px 8px 0px 0px;
    color: white;
    font-size: 2rem;
    font-weight: 600;
    font-family: 'Changa One',sans-serif;
    @media (max-width: 1200px) {
        font-size: 1.7rem;
    }
    @media (max-width: 500px) {
        font-size: 1.5rem;
    }
`

const LeftText01 = styled(Box)`
    display: flex;
    flex: 1;
    justify-content: flex-start;
    margin-left: 3%;
    @media (max-width: 1200px) {
        font-size: 1.7rem;
    }
    @media (max-width: 500px) {
        font-size: 1.5rem;
    }
`
const RightText01 = styled(Box)`
    display: flex;
    flex: 1;
    justify-content: flex-end;
    margin-right: 3%;
`
const TableContent = styled(Box)`
    display: flex;
    width: 100%;
    height: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    flex-direction: column;
    align-items: center;
`
const RowText = styled(Box)`
    display: flex;
    flex: 1;
    width: 90%;
    font-size: 1.3rem;
    font-weight: 600;
    color:rgb(84 84 84);
    font-family: 'Changa One',sans-serif;
    &:hover{
        cursor: pointer;
        transition: .3s;
        color:rgb(247 148 31);
    }
    @media (max-width: 1200px) {
        font-size: 1.2rem;
    }
    @media (max-width: 900px) {
        font-size: 1.3rem;
    }
    @media (max-width: 500px) {
        font-size: 1rem;
    }
`
const LeftText02 = styled(Box)`
    display: flex;
    flex:1;
    justify-content: flex-start;
    align-items: center;
`
const RightText02 = styled(Box)`
    display: flex;
    flex:1;
    justify-content: flex-end;
    align-items: center;
`
const SelectCurrency = styled(Box)`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;    
`
const Text01 = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    font-weight: 600;
    color:rgb(84 84 84);
    font-family: 'Changa One',sans-serif;
    margin-top: 5px;
    margin-bottom: 5px;
    @media (max-width: 500px) {
        font-size: 1rem;
    }
`
const Text02 = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    font-weight: 600;
    color:rgb(84 84 84);
    font-family: 'Changa One',sans-serif;
    margin-top: 5px;
    margin-bottom: 30px;
`
const SelectBox01 = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 5px;
    >div{
        >div{
            >div{
                /* font-size: 1.3rem; */
                font-weight: 600;
                color:rgb(84 84 84);
                font-family: 'Changa One',sans-serif;
            }
        }

    }
`
const MusicBox = styled(Box)`
    &:hover{
        transition: .3s;
        cursor: pointer;
        color:rgb(84 84 84);
    }
`

export default Content;

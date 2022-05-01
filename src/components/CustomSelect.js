import { Box } from '@material-ui/core';
import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import styled from 'styled-components';

const CustomSelect = ({ width, height, fsize, fcolor, bgcolor, date, border, bradius, fweight }) => {
    const [flag_drop, set_drop] = useState(false);
    const [name, set_name] = useState(date[0].name);
    const [url, set_url] = useState(date[0].image_url);


    return (
        <SelectBox width={width} height={height} fontWeight={fweight} fontSize={fsize} color={fcolor} border={border} borderRadius={bradius} bgcolor={bgcolor} onClick={() => {
            set_drop(!flag_drop);
        }}>
            <Box display={"flex"} flex={"1"} justifyContent={"center"} alignItems={"center"}>
                <img src={url} width={"30px"} height={"30px"} alt=''></img>
            </Box>
            <Box display={"flex"} flex={"4"} justifyContent={"center"} alignItems={"center"}>
                {name}
            </Box>
            <Box display={"flex"} flex={"1"} justifyContent={"center"} alignItems={"center"} style={{ cursor: "pointer" }} onClick={() => {
                set_drop(!flag_drop);
            }}>
                {!flag_drop ? <FaAngleDown fontSize={"1.5rem"} /> : <FaAngleUp fontSize={"1.5rem"} />}
            </Box>
            {
                flag_drop ?
                    <>
                        <Box display={"flex"} flexDirection={"column"} width={"100%"} position={"absolute"} bottom={"-180px"} bgcolor={"#f9f9f9"} borderRadius={"0px 0px 8px 8px"} style={{ transition: "1s" }}>
                            {
                                date.length > 0 &&
                                date.map((item, index) => {
                                    return (
                                        <SelectRow onClick={() => {
                                            set_name(item.name);
                                            set_url(item.image_url);
                                            set_drop(!flag_drop)
                                        }}>
                                            <Box display={"flex"} flex={"1"} justifyContent={"center"} alignItems={"center"}>
                                                <img src={item.image_url} width={"30px"} height={"30px"} alt=''></img>
                                            </Box>
                                            <Box display={"flex"} flex={"5"} justifyContent={"center"} alignItems={"center"}>
                                                {item.name}
                                            </Box>
                                        </SelectRow>
                                    )
                                })
                            }

                        </Box>
                    </> :
                    <></>
            }
        </SelectBox>
    );
}

const SelectBox = styled(Box)`
    display: flex;
    position: relative;
    &:hover{
        cursor: pointer;
        transition: 0.3s;
    }
`

const SelectRow = styled(Box)`
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 3%;
    margin-left: 3%;
    &:hover{
        cursor: pointer;
        color: black;
        transition: 0.3s;
    }
`

export default CustomSelect;

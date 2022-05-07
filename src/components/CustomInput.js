import { Box } from '@material-ui/core';
import React from "react";

const CustomInput = ({ width, height, fsize, fcolor, bgcolor, border, bradius }) => {
    return (
        <Box display={"flex"} flexDirection={"column"} width={width}>
            <Box display={"flex"} component={"input"} width={"100%"} height={height} alignItems={"center"} fontSize={fsize} color={fcolor} bgcolor={bgcolor} border={border} placeholder={"0.00"} borderRadius={bradius}></Box>
        </Box>
    );
}

export default CustomInput;

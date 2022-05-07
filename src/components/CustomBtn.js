import { Box } from '@material-ui/core';
import React from "react";
import styled from 'styled-components';

const CustomBtn = ({ width, height, str, fsize, fcolor, bgcolor, border, bradius, fweight}) => {
    return (
        <StyledBtn width={width} height={height} fontSize={fsize} color={fcolor} bgcolor={bgcolor} border={border} borderRadius={bradius} fontWeight={fweight}>
            {str}
        </StyledBtn>
    );
}

const StyledBtn = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .3s;
    &:hover{
        cursor: pointer;
        box-shadow: 3px 5px 5px rgb(0 0 0 / 50%);
    }
`

export default CustomBtn;

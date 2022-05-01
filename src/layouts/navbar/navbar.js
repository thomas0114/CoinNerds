import { Box } from '@material-ui/core';
import styled from "styled-components";
import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected, walletConnect, trustWallet, binance_wallet } from "../../utils/connectors";

const Navbar = () => {
    const DESKTOP_CONNECTORS = {
        MetaMask: injected,
        WalletConnect: walletConnect,
        BinanceWallet: binance_wallet,
        TrustWallet: trustWallet,
    };
    const walletConnectors = DESKTOP_CONNECTORS;
    const { account, active, activate } = useWeb3React();
    const connect = async (currentConnector) => {
        try {
            await activate(walletConnectors[currentConnector]);
            window.localStorage.setItem("CurrentWalletConnect", currentConnector);
        }
        catch (e) {
            console.log(e);
        }
    }

    const set_account_addr = (addr) => {
        return addr.slice(0, 6) + "..." + addr.slice(-4);
    }

    useEffect(() => {
        const currentWalletState = window.localStorage.getItem("CurrentWalletConnect");
        currentWalletState && activate(walletConnectors[currentWalletState]);
    }, [activate])

    return (
        <StyledComponent>
            <ConnectWalletBtn onClick={() => {
                connect("MetaMask");
            }}>{active ? set_account_addr(account) : "CONNECT"}</ConnectWalletBtn>
        </StyledComponent>
    );
}

const StyledComponent = styled(Box)`
    display: flex;
    width: 100%;
    height: 80px;
    align-items: center;
    justify-content: flex-end;
    background-color: white;
`

const ConnectWalletBtn = styled(Box)`
    display: flex;
    width: 10%;
    height: 50px;
    justify-content: center;
    align-items: center;
    margin-right: 5%;
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 8px;
    border: none;
    background-color: #331393;
    color: white;
    transition: .3s;
    &:hover{
        cursor: pointer;
        box-shadow: 3px 5px 5px rgb(0 0 0 / 50%);
    }
`

export default Navbar;

import styled from 'styled-components'
import { DarkSilver } from '../../../assets/colors'

export const ContainerDevices = styled.div`
    max-height: 320px;
    min-height: 320px;
    overflow-y: auto;
`
export const CardDevice = styled.div`
    align-items: center;
    background: none;
    border-radius: 5px;
    border: 0;
    border: 1px solid #ccc;
    display: flex;
    min-height: 69px;
    padding: 0.9375rem 1.25rem;
    position: relative;
    text-align: left;
    width: 100%;
    .device__icon{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        box-sizing: border-box;
        font-family: Sul Sans,sans-serif;
        outline: none;
    }
    .device__info{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        margin-left: 1.3125rem;
        box-sizing: border-box;
        font-family: Sul Sans, sans-serif, PFont-Light;
        outline: none;
    }
    .device__description-wrapper{
        align-items: baseline;
        display: flex;
    }
    .device__description{
        color: #3e3e3e;
        font-size: 1rem;
        line-height: 1.375rem;
        margin-right: 0.5rem;
    }
    .device__current{
        color: #50a773;
        font-size: .75rem;
        font-weight: 500;
        line-height: 1rem;
    }
    .device__localization {
        color: ${DarkSilver};
        font-size: .875rem;
        line-height: 1.25rem;
    }
`
import styled from "styled-components";

export const ModalWrapper = styled.div`
    max-width: calc(100vw - 120px);
    max-height: calc(100vh - 119px);
    top: 60px;
    right: 0px;
    left: 0px;
    animation: 0s ease 0s 1 normal none running none;
    transition: none 0s ease 0s;
    display: flex;
    position: fixed;
    z-index: 9900;
    inset: 0px;
    margin: auto;
    overflow-y: auto;
    background-color: #ffffff;
    border-radius: 3px;
    box-shadow: var(--ds-shadow-overlay,0 0 0 1px rgba(9,30,66,0.08),0 2px 1px rgba(9,30,66,0.08),0 0 20px -6px rgba(9,30,66,0.31));
    .modal--section__main {
        flex: 0 1 calc(75% + 12px);
        height: 100%;
        border: 1px solid;
    }
    
    .modal--section__sec {
        flex: 0 1 calc(24% + 12px);
        height: 100%;
        /* border: 1px solid; */

    }
`


export const ActionButton = styled.div`
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: var(0 0 0 1px rgba(9,30,66,0.13),0 4px 11px rgba(9,30,66,0.13));
    max-width: 180px;
    min-width: 100%;
    border: 1px solid;
    z-index: 510;
    max-height: 300px;
    overflow-y: auto;
    padding-bottom: 8px;
    padding-top: 8px;
    position: absolute;
    left: 0px;
    top: 30px;
    .option {
        /* background-color: var(--ds-background-neutral-subtle-hovered, ); */
    color: var(--ds-text, #172B4D);
    cursor: pointer;
    display: block;
    font-size: 13px;
    padding: 6px 12px;
    width: 100%;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-shadow: inset 2px 0px 0px  rgb(255, 0, 0);
    }
    .option:hover {
        background-color: #F4F5F7;
    }
`
export const SectionDetailOrder = styled.div`
    margin: 7px 0;
    border: .4px solid #DFE1E6;
    border-radius: 2px;
    .header-detail {
        border-bottom: 1px solid #DFE1E6;
        padding: 10px;
    }
    .header-responsible {
        padding: 10px;
    }
`

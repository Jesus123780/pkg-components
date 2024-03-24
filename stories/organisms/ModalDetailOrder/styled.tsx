import styled from 'styled-components'
import { DarkSilver, SECBGColor } from '../../../assets/colors'

export const ActionButton = styled.div`
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: var(0 0 0 1px rgba(9, 30, 66, 0.13), 0 4px 11px rgba(9, 30, 66, 0.13));
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
    color: var(--ds-text, #172b4d);
    cursor: pointer;
    display: block;
    font-size: 13px;
    padding: 6px 12px;
    width: 100%;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-shadow: inset 2px 0px 0px rgb(255, 0, 0);
  }
  .option:hover {
    background-color: #f4f5f7;
  }
`
export const SectionDetailOrder = styled.div`
  margin: 7px 0;
  border: 0.4px solid #dfe1e6;
  border-radius: 2px;
  .header-detail {
    border-bottom: 1px solid #dfe1e6;
    padding: 10px;
  }
  .header-responsible {
    padding: 10px;
  }
`

export const HeaderWrapperDetail = styled.div`
  align-items: center;
  background-color: ${SECBGColor};
  border-radius: 200px;
  border: 0;
  column-gap: 12px;
  cursor: pointer;
  display: flex;
  display: flex;
  flex-direction: row;
  grid-column-gap: 12px;
  padding: 8px 12px;
  position: relative;
  transition: background-color 0.3s ease-in-out;
  width: 100%;
  .info-sales {
    color: ${DarkSilver};
    transition: background-color 0.3s ease-in-out;
    white-space: nowrap;
    text-align: left;
    border-radius: 200px !important;
  }
  span {
    font-size: 0.75rem;
    line-height: 1rem;
    display: block;
  }
  &:hover {
    background-color: ${SECBGColor};
  }
`
export const ContainerGrid = styled.div`
  display: grid;
  margin: 0;
  padding-bottom: 20px;
  margin: auto;
  padding: 0 30px;
  height: 100vh;
  @media only screen and (min-width: 768px) and (min-width: 960px) {
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
    grid-gap: 30px;
  }
  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(172px, 1fr));
    grid-gap: 20px;
    grid-auto-rows: max-content;
  }
`

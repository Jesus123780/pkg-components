import styled from "styled-components"
import { IconDelete } from "../../../assets/icons"
import Column from "../../atoms/Column"
import Row from "../../atoms/Row"

export const Card = ({
  card,
  listID = '',
  index = 0,
  isCustomSubOpExPid = false,
  removeOneItem = () => { return }
}) => {
  return (
    <Column >
      <div className="content-cart content-cart-flex">
        <Row style={{ margin: '20px 0', borderBottom: '1px solid #ccc' }}>
          <Column style={{ width: '80%' }}>
            <TextCardDessert className='title_card'>{card?.title}</TextCardDessert>
          </Column>
          <button
            bgColor='transparent'
            type='button'
            widthButton='min-content'
            onClick={() => {
              return removeOneItem({
                listID,
                id: card.id,
                isCustomSubOpExPid
              })
            }}
          >
            <IconDelete color={'red'} size='23px' />
          </button>
        </Row>
      </div>
    </Column>
  )
}

const TextCardDessert = styled.h3`
margin: 0;
font-size: 1rem;
line-height: 1.25em;
font-weight: 500;
color: #3f3e3e;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
` 
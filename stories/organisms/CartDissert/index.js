import { IconDelete } from "../../../assets/icons"
import { Column } from "../../atoms/Column"

export const Card = ({
    card,
    listID,
    index = 0,
    removeOneItem = () => { return }
  }) => {
    return (
      <Column>
        <div className="content-cart content-cart-flex">
          <Column>
            <h3 className='title_card'>{card?.title}</h3>
            <h3 className='title_card'>Item: {index + 1}</h3>
          </Column>
          <button
            bgColor='transparent'
            type='button'
            widthButton='min-content'
            onClick={() => { return removeOneItem({ listID, id: card.id}) }}
          >
            <IconDelete color={'red'} size='23px' />
          </button>
        </div>
      </Column>
    )
  }
  
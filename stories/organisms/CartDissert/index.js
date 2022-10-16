import { IconDelete } from "../../../assets/icons"
import Column from "../../atoms/Column"

export const Card = ({
    card,
    listID,
    index,
    removeOneItem
  }) => {
    return (
      <Column>
        <div className="content-cart">
          <Column>
            <h3 className='title_card'>{card?.title}</h3>
            <h3 className='title_card'>Item: {index + 1}</h3>
          </Column>
          <button
            bgColor='transparent'
            margin='0px'
            onClick={() => { return removeOneItem({listID, id: card.id}) }}
            type='button'
            widthButton='min-content'
          >
            <IconDelete color={'red'} size='25px' />
          </button>
        </div>
      </Column>
    )
  }
  
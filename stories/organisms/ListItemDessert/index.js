import Column from "../../atoms/Column"
import { Card } from "../CartDissert"

export const List = ({
    list,
    setData,
    listID,
    data,
    removeOneItem = () => { return }
  }) => {
    return (
      <Column margin='10px 0'>
        {list?.cards?.map((card, index) => {
          return (
            <Column key={card?.id}>
              <Card
                card={card}
                data={data}
                id={list?.id}
                index={index}
                key={card?.id}
                list={list}
                listID={listID}
                removeOneItem={removeOneItem}
                setData={setData}
              />
            </Column>
          )
        })}
      </Column>
    )
  }
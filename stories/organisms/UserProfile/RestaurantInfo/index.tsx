import { 
  UserInfo,
  ReadOnlyText,
  Label
} from '../styled'
import { Text } from '../../../atoms/Text'

export const RestaurantInfo = ({ data = {} }) => {
  return (
    <>
      <Text>Información del Restaurante</Text>
      <>
        {/* <Avatar src={data?.Image} alt="Restaurant Avatar" /> */}
        <UserInfo>
          <Label>Nombre del Restaurante</Label>
          <ReadOnlyText>{data?.storeName}</ReadOnlyText>
          <Label>Email del Restaurante</Label>
          <ReadOnlyText>{data?.emailStore}</ReadOnlyText>
          <Label>Nombre del dueño de la tienda</Label>
          <ReadOnlyText>{data?.storeOwner}</ReadOnlyText>
          <Label>Teléfono del Restaurante</Label>
          <ReadOnlyText>{data?.storePhone}</ReadOnlyText>
          <Label>Nit de la {data?.storeName} </Label>
          <ReadOnlyText>{data?.NitStore}</ReadOnlyText>
          <Label>Location</Label>
          <ReadOnlyText>{data?.ULocation}</ReadOnlyText>
          <Label>Viaprincipal</Label>
          <ReadOnlyText>{data?.Viaprincipal}</ReadOnlyText>
          <Label>Dirección del Restaurante</Label>
          <ReadOnlyText>{data?.addressStore}</ReadOnlyText>
          <Label>banner</Label>
          <ReadOnlyText>{data?.banner}</ReadOnlyText>
          <Label>Categoría del Restaurante</Label>
          <ReadOnlyText>{data?.cateStore?.cName}</ReadOnlyText>
          <Label>city</Label>
          <ReadOnlyText>{data?.city?.cName}</ReadOnlyText>
          <Label>department</Label>
          <ReadOnlyText>{data?.department?.dName}</ReadOnlyText>
          <Label>description de la tienda</Label>
          <ReadOnlyText>{data?.description}</ReadOnlyText>
          <Label>pais</Label>
          <ReadOnlyText>{data?.pais?.cName}</ReadOnlyText>
          <Label>siteWeb</Label>
          <ReadOnlyText>{data?.siteWeb}</ReadOnlyText>
          <Label>socialRaz</Label>
          <ReadOnlyText>{data?.socialRaz}</ReadOnlyText>
          <Label>Numero de usuario</Label>
          <ReadOnlyText>{data?.uPhoNum}</ReadOnlyText>
        </UserInfo>
      </>
    </>
  )
}

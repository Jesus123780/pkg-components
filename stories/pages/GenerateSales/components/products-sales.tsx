import { getGlobalStyle } from "../../../../helpers";
import { Column, Icon } from "../../../atoms";
import { EmptyData } from "../../../molecules";
import { SwipeableCard } from "../../../molecules/SwipeableCard";
import { MiniCardProduct } from "../../../organisms";

interface ProductsSalesProps {
    isLoading: boolean;
    data: any;
    dispatch: React.Dispatch<any>;
    onClick: (product: any) => void;
    handleAddProduct: (product: any) => void;
    handleComment: (product: any) => void;
    handleDecrement: (product: any) => void;
    handleFreeProducts: (product: any) => void;
    numberFormat: (value: string | number) => string | number;
}

export const ProductsSales: React.FC<ProductsSalesProps> = ({
    isLoading,
    data,
    dispatch,
    onClick,
    handleComment,
    handleDecrement,
    handleFreeProducts,
    handleAddProduct,
    numberFormat
}) => {
    return <>

        {!isLoading && data.PRODUCT.length > 0
            ? (
                data.PRODUCT.map((product: any, index: number) => {
                    const tag = {
                        tag: product?.getOneTags?.nameTag ?? ''
                    }
                    const ProQuantity = product?.ProQuantity ?? 0

                    return (
                        <SwipeableCard
                            key={product.pId}
                            swipeWidth={30}
                            autoClose={true}
                            sticky={false}
                            shake={true}
                            gradientAnimation={false}
                            onDelete={() => {
                                dispatch({ type: 'REMOVE_PRODUCT_TO_CART', payload: product })
                            }}
                            onSwipeUp={() => {
                                onClick(product)
                            }}
                            rightActions={
                                <Column
                                    style={{
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            dispatch({ type: 'REMOVE_PRODUCT_TO_CART', payload: product })
                                        }}
                                        style={{
                                            all: 'unset',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 30,
                                            height: 30
                                        }}
                                    >
                                        <Icon
                                            icon='IconDelete'
                                            color={getGlobalStyle('--color-icons-primary')}
                                            size={16}
                                        />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation() // evita que se propague al card
                                            handleComment(product)
                                        }}
                                        style={{
                                            all: 'unset',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 30,
                                            height: 30,
                                            backgroundColor: getGlobalStyle('--color-feedback-success-dark'),
                                        }}
                                    >
                                        <Icon
                                            icon='IconComment'
                                            color={getGlobalStyle('--color-icons-white')}
                                            size={16}
                                        />
                                    </button>

                                    {/* sub productos  */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation() // evita que se propague al card
                                            onClick(product)
                                        }}
                                    >
                                        <Icon size={20} icon='IconBox' />
                                    </button>
                                </Column>
                            }
                        >
                            <MiniCardProduct
                                {...product}
                                editing={product.editing}
                                editable={true}
                                canDelete={true}
                                handleDelete={() => {
                                    dispatch({ type: 'REMOVE_PRODUCT_TO_CART', payload: product })
                                }}
                                handleChangeQuantity={(event) => {
                                    const { value } = event.target
                                    return dispatch({
                                        type: 'ON_CHANGE',
                                        payload: {
                                            id: product.pId,
                                            index,
                                            value
                                        }
                                    })
                                }}
                                ProDescription={product.ProDescription}
                                ProDescuento={product.ProDescuento}
                                ProImage={product.ProImage}
                                ProPrice={numberFormat(product.ProPrice)}
                                ProQuantity={ProQuantity}
                                handleToggleEditingStatus={() => {
                                    dispatch({
                                        type: 'TOGGLE_EDITING_PRODUCT',
                                        payload: product
                                    })
                                }}
                                handleCancelUpdateQuantity={() => {
                                    dispatch({
                                        type: 'CANCEL_UPDATE_QUANTITY_EDITING_PRODUCT',
                                        payload: product
                                    })
                                }}
                                handleSuccessUpdateQuantity={() => {
                                    dispatch({
                                        type: 'UPDATE_SUCCESS_QUANTITY_EDITING_PRODUCT',
                                        payload: product
                                    })
                                }}
                                ValueDelivery={product.ValueDelivery}
                                withQuantity={true}
                                hoverFree={true}
                                handleComment={() => {
                                    handleComment(product)
                                }}
                                showDot={true}
                                openQuantity={Boolean(ProQuantity)}
                                handleDecrement={() => {
                                    handleDecrement(product)
                                }}
                                handleIncrement={() => {
                                    handleAddProduct(product)
                                }}
                                handleFreeProducts={() => {
                                    handleFreeProducts(product)
                                }}
                                handleGetSubItems={() => {
                                    onClick(product)
                                }}
                                edit={false}
                                onClick={() => {
                                    handleAddProduct(product)
                                }}
                                pName={product.pName}
                                render={<Icon size={20} icon='IconSales' />}
                                tag={product?.getOneTags?.nameTag !== null && tag}
                            />
                        </SwipeableCard>
                    )
                })
            )
            : (
                <EmptyData height={200} width={200} />
            )
        }

    </>;
}
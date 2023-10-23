import Image from 'next/image'
import PropTypes from 'prop-types'
import React from 'react'
import QRCode from 'react-qr-code'
import styles from './Bill.module.css'
/**
 * Componente Ticket
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.client - Datos del client?.
 * @param {Array} props.products - Lista de products.
 * @param {Object} props.restaurant - Datos del restaurant?.
 * @returns {JSX.Element} Elemento JSX del ticket.
 */
export const Bill = ({
  client,
  urlStore = new URL(process.env.MAIN_URL_BASE),
  bill = {},
  products = [],
  restaurant = {},
  total = 0,
  discount = {
    discount: 0
  },
  numberFormat = () => { return }
}) => {
  const iva = 0 * 0.19
  const definedValue = 'SIN DEFINIR'
  return (
    <div className={styles.container}>
      <h2 className={styles.title} style={{ margin: '0 0 20px 0' }}>{process.env.BUSINESS_TITLE}</h2>
      <div className={styles.columns} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{ margin: '0 0 20px 0' }}>No dejes de comprar</span>
        <QRCode
          size={100}
          value={urlStore}
          viewBox={`0 0 256 256`}
        />
      </div>
      <div className={styles['logo']}>
        <Image
          alt={restaurant?.storeName || 'ticket'}
          blurDataURL='/images/DEFAULTBANNER.png'
          height={100}
          objectFit='contain'
          placeholder='blur'
          src='/images/DEFAULTBANNER.png'
          width={100}
        />
      </div>
      <div>
        <h2 className={styles.title}>{restaurant?.storeName}</h2>
        {!!restaurant?.ref && <h2 className={styles.title}>Ref compra: {restaurant?.ref}</h2>}
        {!!bill?.date && <h2 className={styles.title}>Fecha {bill?.date}</h2>}
        <p className={styles['label']} >NIT: {restaurant?.NitStore ?? definedValue}</p>
        <p className={styles['label']} >Forma de pago: {restaurant?.paymentMethod ?? definedValue}</p>
        <p className={styles['label']} >Direccion: {restaurant?.address ?? definedValue}</p>
        <p className={styles['label']} >Telefono: {restaurant?.tlf ?? definedValue}</p>
      </div>
      <div style={{ borderTop: '1px dashed black' }}>
        <p className={styles['label']}>
          Cliente: {client?.clientName} {client.clientLastName}
        </p>
        <p className={styles['label']}>Direccion: {client?.ClientAddress ?? definedValue}</p>
        <p className={styles['label']}>Telefono: {client?.clientNumber ?? definedValue}</p>
      </div>
      <div>
        {/* Encabezado de columnas */}
        <div className={styles.columns} style={{ borderBottom: '1px dashed black' }}>
          <span className={styles.columnHeader}>Producto</span>
          <span className={styles.columnHeader}>Cant</span>
          <span className={styles.columnHeader}>Precio</span>
        </div>
        {/* Lista de productos */}
        <ul>
          {products?.map((producto, index) => {
            const totalPriceFinal = producto?.unitPrice * producto?.ProQuantity
            return (
              <li key={index}>
                <div className={styles.columns}>
                  <span className={styles.columnItem} style={{ fontWeight: '709', padding: '0 0 5px 0' }}>{producto?.pName}</span>
                  <span className={styles.columnItem} style={{ padding: '0 0 5px 0' }} >(x{producto?.ProQuantity})</span>
                  <span className={styles.columnItem} style={{ padding: '0 0 5px 0' }} > {producto?.unitPrice ? `${numberFormat(totalPriceFinal)}` : 'Gratis' }</span>
                </div>
                {producto?.dataOptional?.map((optional, oIndex) => {return (
                  <div className={styles.subColumns} key={oIndex}>
                    <span className={styles.subColumnItem} style={{ fontWeight: '900', margin: '0 0 5px 0' }}>{optional.OptionalProName}</span>
                    <div className={styles.columns} style={{ flexDirection: 'column' }}>
                      {optional.ExtProductFoodsSubOptionalAll.map((subOpt, sIndex) => {return (
                        <li className={styles.subColumnItem} key={sIndex}>
                          <div className={styles.columns}>
                            <span className={styles.columnItem} style={{ padding: '0 0 5px 0' }}>{subOpt.OptionalSubProName}</span>
                            <span className={styles.columnItem} style={{ padding: '0 0 5px 0' }} >1</span>
                            <span className={styles.columnItem} style={{ padding: '0 0 5px 0' }} ></span>
                          </div>
                        </li>
                      )})}
                    </div>
                  </div>
                )})}
                {producto?.dataExtra?.map((extra, eIndex) => {return (
                  <li className={styles.subColumns} key={eIndex}>
                    <div className={styles.columns}>
                      <span className={styles.columnItem} style={{ padding: '0 0 5px 0' }}>{extra.extraName}</span>
                      <span className={styles.columnItem} style={{ padding: '0 0 5px 0' }} >{extra.quantity}</span>
                      <span className={styles.columnItem} style={{ padding: '0 0 5px 0' }} >${numberFormat(extra.newExtraPrice)}</span>
                    </div>
                  </li>
                )})}
              </li>
            )})}
        </ul>
      </div>
      <div style={{ borderBottom: '1px dashed black', marginBottom: '50px' }}>
        <p>Valor Inicial Fact: {total || 0}</p>
        <p>IVA: ${iva || 0}</p>
        <p>DESCUENTO: ${numberFormat(discount?.discount) || 0}</p>
        <p>CAMBIO: ${numberFormat(restaurant?.change) || 0}</p>
        <p style={{ fontWeight: '900' }}>Total Factura: {total || 0}</p>
        <p className={styles.message}>Gracias por su compra</p>
      </div>
    </div>
  )
}

Bill.propTypes = {
  bill: PropTypes.object,
  client: PropTypes.shape({
    ClientAddress: PropTypes.any,
    address: PropTypes.any,
    clientLastName: PropTypes.any,
    clientName: PropTypes.any,
    clientNumber: PropTypes.any,
    name: PropTypes.any,
    tlf: PropTypes.any
  }),
  discount: PropTypes.shape({
    discount: PropTypes.number
  }),
  numberFormat: PropTypes.func,
  products: PropTypes.shape({
    map: PropTypes.func,
    reduce: PropTypes.func
  }),
  restaurant: PropTypes.shape({
    address: PropTypes.any,
    name: PropTypes.any,
    tlf: PropTypes.any
  }),
  total: PropTypes.number,
  urlStore: PropTypes.any
}

import PropTypes from 'prop-types'
import {
    Button,
    Loading,
    RippleButton
} from '../../atoms'
import { Section, Table } from '../Table'
import { CreateProvider } from './Create'

export const Providers = ({
  data = [],
  dataForm = {},
  error = false,
  errorForm = {},
  loading = false,
  show = false,
  handleChange = () => { return },
  handleDeleteOneProvider = () => { return },
  handleForm = () => { return },
  handleGetOneProvider = () => { return },
  setDataValue = () => { return },
  setShow = () => { return }
}) => {
  if (error) return <>Error</>
  return (
    <div style={{ padding: '20px' }}>
      <RippleButton onClick={() => {return setShow(!show)}}>Crear Proveedor</RippleButton>
      <CreateProvider
        dataForm={dataForm}
        errorForm={errorForm}
        handleChange={handleChange}
        handleForm={handleForm}
        setDataValue={setDataValue}
        setShow={setShow}
        show={show}
      />
      {loading && <Loading />}
      <Table
        data={data.length ? data : []}
        labelBtn='Product'
        renderBody={(dataB, titles) => {
          return dataB?.map((client, i) => {
            const {
              idProvider,
              prName,
              prState,
              PrNumberIdentity,
              DatCre
            } = client
            const dateToFormat = new Date(DatCre ?? Date.now())
            const fullDate = dateToFormat.toLocaleDateString('ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
            return <Section
              columnWidth={titles}
              key={idProvider}
              odd
              padding='10px 0'
            >
              <div>
                <span> {i + 1}</span>
              </div>
              <div>
                <span>{prName}</span>
              </div>
              <div>
                <span> {PrNumberIdentity}</span>
              </div>
              <div>
                <span>{fullDate ?? ''}</span>
              </div>
              <div>
                <Button onClick={() => { return handleDeleteOneProvider({ idProvider, prState }) }}>
                                    Eliminar
                </Button>
              </div>
              <div>
                <Button onClick={() => { return handleGetOneProvider(idProvider) }}>
                                    Ver detalles
                </Button>
              </div>
            </Section>
          })
        }}
        titles={[
          { name: '#', justify: 'flex-start', width: '.5fr' },
          { name: 'Nombre', key: 'prName', justify: 'flex-start', width: '.5fr' },
          { name: 'Ref', justify: 'flex-start', width: '.5fr' },
          { name: 'Date', justify: 'flex-start', width: '.5fr' },
          { name: '', justify: 'flex-start', width: '.5fr' },
          { name: '', justify: 'flex-start', width: '.5fr' }
        ]}
      />
    </div>
  )
}
Providers.propTypes = {
  data: PropTypes.array,
  dataForm: PropTypes.object,
  error: PropTypes.bool,
  errorForm: PropTypes.object,
  handleChange: PropTypes.func,
  handleDeleteOneProvider: PropTypes.func,
  handleForm: PropTypes.func,
  handleGetOneProvider: PropTypes.func,
  loading: PropTypes.bool,
  setDataValue: PropTypes.func,
  setShow: PropTypes.func,
  show: PropTypes.bool
}

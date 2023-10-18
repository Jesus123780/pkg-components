import PropTypes from 'prop-types'
import { RippleButton } from '../../atoms/Ripple'
import { InputHooks } from '../../molecules/Inputs'
import { AwesomeModal } from '../AwesomeModal'

export const CreateProvider = ({
  dataForm = {},
  errorForm = {},
  show = false,
  handleForm = () => { return },
  setDataValue = () => { return },
  handleChange = () => { return },
  setShow = () => { return }
}) => {
  return (
    <AwesomeModal
      btnCancel={true}
      btnConfirm={false}
      customHeight='50vh'
      footer={false}
      header={true}
      onCancel={() => { return false }}
      onHide={() => {
        setDataValue({})
        return setShow()
      }}
      padding='25px'
      show={show}
      size='medium'
      zIndex='9999'
    >
      <form onSubmit={(e) => { return handleForm(e) }} style={{ display: 'flex', flexWrap: 'wrap' }}>
        <InputHooks
          email={false}
          error={errorForm?.prName}
          name='prName'
          onChange={handleChange}
          required
          title='Nombre'
          value={dataForm?.prName}
          width='50%'
        />
        <InputHooks
          error={errorForm?.PrNit}
          name='PrNit'
          nit
          numeric
          onChange={handleChange}
          required
          title='Nit del proveedor'
          value={dataForm?.PrNit}
          width='50%'
        />
        <InputHooks
          error={errorForm?.PrNumberPhone}
          name='PrNumberPhone'
          numeric
          onChange={handleChange}
          title='Numero Teléfono'
          type='text'
          value={dataForm?.PrNumberPhone}
          width='50%'
        />
        <InputHooks
          error={errorForm?.TotalDeuda}
          name='TotalDeuda'
          numeric
          onChange={handleChange}
          title='¿ Alguna deuda Anterior ?'
          value={dataForm?.TotalDeuda}
          width='50%'
        />
        <InputHooks
          error={errorForm?.PrNumberIdentity}
          name='PrNumberIdentity'
          numeric
          onChange={handleChange}
          title='Numero de indentidad'
          value={dataForm?.PrNumberIdentity}
          width='50%'
        />
        <InputHooks
          dataForm={dataForm}
          email={true}
          error={errorForm?.PrMail}
          name='PrMail'
          onChange={handleChange}
          required
          setDataValue={setDataValue}
          title='Dirección email'
          value={dataForm?.PrMail}
          width='50%'
        />
        <RippleButton type='submit' widthButton='100%' >Crear Proveedor</RippleButton>
      </form>
    </AwesomeModal>
  )
}
CreateProvider.propTypes = {
  dataForm: PropTypes.object,
  errorForm: PropTypes.object,
  handleChange: PropTypes.func,
  handleForm: PropTypes.func,
  setDataValue: PropTypes.func,
  setShow: PropTypes.func,
  show: PropTypes.bool
}

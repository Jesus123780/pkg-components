import PropTypes from 'prop-types'
import { Checkbox, RippleButton } from '../../atoms'
import { InputHooks, NewSelect } from '../../molecules'
import { Container } from './styled'

export const Form = ({
  errors = {},
  check = false,
  modal = 0,
  values = {},
  departments = [],
  road,
  dataForm = {},
  countries = [],
  cities = [],
  errorForm = {},
  setModal = () => {
    return
  },
  handleChangeSearch = () => {
    return
  },
  handleChange = () => {
    return
  },
  handleCheckChange = () => {
    return
  },
  handleSave = () => {
    return
  }
}) => {
  const disabled = !dataForm?.uLocationKnow || !values?.ctId || !values?.dId || !values?.countryId || !values?.rId
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        return handleSave()
      }}
    >
      <Container modal={modal === 1}>
        <div style={{ width: '90%', margin: '30px auto' }}>
          <div style={{ margin: '10px 0' }}>
            <NewSelect
              error={errors?.countryId}
              id='cId'
              loading={true}
              name='countryId'
              onChange={handleChangeSearch}
              optionName='cName'
              options={countries}
              title='País'
              value={values?.countryId}
            />
          </div>
          <div style={{ margin: '10px 0' }}>
            <NewSelect
              error={errors?.dId}
              id='dId'
              name='dId'
              onChange={handleChangeSearch}
              optionName='dName'
              options={departments}
              title='Departamento'
              value={values?.dId}
            />
          </div>
          <div style={{ margin: '10px 0' }}>
            <NewSelect
              error={errors?.ctId}
              id='ctId'
              name='ctId'
              onChange={handleChangeSearch}
              optionName='cName'
              options={cities}
              title='Ciudad'
              value={values?.ctId}
            />
          </div>
          <div style={{ margin: '10px 0' }}>
            <NewSelect
              error={errors?.rId}
              id='rId'
              name='rId'
              onChange={handleChangeSearch}
              optionName='rName'
              options={road}
              title='Tipo de via'
              value={values?.rId}
            />
          </div>
          <div className='flex-center'>
            <InputHooks
              disabled={check}
              errors={errorForm?.piso}
              name='piso'
              numeric
              onChange={handleChange}
              range={{ min: 0, max: 4 }}
              required={false}
              title='Numero interior de piso'
              value={dataForm?.piso}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Checkbox
                checked={check}
                onChange={(e) => {
                  return handleCheckChange(e)
                }}
                type='checkbox'
              />
            </div>
          </div>
          <InputHooks
            errors={errorForm?.uLocationKnow}
            name='uLocationKnow'
            onChange={handleChange}
            required
            title='Ingresa tu dirección como la conoces'
            value={dataForm?.uLocationKnow}
          />
          <div className='modal_map_footer'>
            <RippleButton
              onClick={() => {
                return setModal(0)
              }}
              widthButton={'100%'}
            >
                  Volver
            </RippleButton>
            <RippleButton
              disabled={disabled}
              type='submit'
              widthButton={'100%'}
            >
                  Guardar dirección
            </RippleButton>
          </div>
        </div>
      </Container>
    </form>
  )
}

Form.propTypes = {
  check: PropTypes.bool,
  cities: PropTypes.array,
  countries: PropTypes.array,
  dataForm: PropTypes.object,
  departments: PropTypes.array,
  errorForm: PropTypes.object,
  errors: PropTypes.object,
  hableSearchLocation: PropTypes.func,
  handleChange: PropTypes.func,
  handleChangeSearch: PropTypes.func,
  handleCheckChange: PropTypes.func,
  handleSave: PropTypes.func,
  modal: PropTypes.number,
  road: PropTypes.any,
  setModal: PropTypes.func,
  values: PropTypes.object
}

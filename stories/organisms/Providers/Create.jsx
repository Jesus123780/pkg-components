import { AwesomeModal } from '../AwesomeModal'
import { InputHooks } from '../../molecules/Inputs'
import { RippleButton } from '../../atoms/Ripple'

export const CreateProvider = ({
    dataForm = {},
    errorForm = {},
    show = false,
    handleForm = () => { return },
    setDataValue = () => { return },
    handleChange = () => { return },
    setShow = () => { return },
}) => {
    return (
        <AwesomeModal
            btnCancel={true}
            btnConfirm={false}
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
            customHeight='50vh'
            zIndex='9999'
        >
            <form style={{ display: 'flex', flexWrap: 'wrap' }} onSubmit={(e) => { return handleForm(e) }}>
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
                    numeric
                    onChange={handleChange}
                    required
                    nit
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
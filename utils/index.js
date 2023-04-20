export const getGlobalStyle = (token) => {
    return `var(${token})`
}
export const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
export const numberFormat = value => { return value ? (parseInt(value) ? new Intl.NumberFormat('es-CO').format(parseFloat(`${value}`.replace(/\./g, ''))) : value) : (value) }

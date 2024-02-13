export const getGlobalStyle = (token: string) => {
  return `var(${token})`
};

export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email)
};
/**
 * Formatea un valor como un número siguiendo el formato de Colombia.
 * Si el valor no es un número válido, lo devuelve tal como está.
 *
 * @param {string|number} value - El valor a formatear.
 * @returns {string} El valor formateado como número o el valor original si no es numérico.
 */
export const numberFormat = (value: string | number): string | number => {
  // Verifica si el valor es nulo o indefinido, devolviendo el mismo valor.
  if (value === null || value === undefined) {
    return value
  }

  // Convierte el valor a string y elimina puntos.
  const stringValue = `${value}`.replace(/\./g, "");

  // Intenta convertir a número y formatear si es posible.
  const numberValue = parseFloat(stringValue);
  if (!isNaN(numberValue)) {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 0,
      style: "decimal",
      maximumFractionDigits: 0,
    }).format(numberValue)
  }

  // Devuelve el valor original si no es un número.
  return value
};
/**
 * Description
 * @param {any} phoneNumber type number or string
 * @returns {any}
 */
export const validatePhoneNumber = (phoneNumber: string) => {
  const regex = /^\(\d{3}\) \d{3}-\d{4}$/;
  return regex.test(phoneNumber)
}

export const isNull = (dato: string) => {
  return !!(!dato || dato === "")
};

export const isNumeric = (dato: number) => {
  return !!(isNaN(dato) && dato !== undefined && dato !== null);
};
export const isPassword = (dato: string) => {
  const validar = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  if (validar.test(dato) === true) {
    return false
  }
  return true
}

export const isCC = (dato: string) => {
  const validar = /^[0-9]{6,10}/g;
  if (validar.test(dato) === true) {
    return false
  }
  return true
};


export const onlyLetters = (dato: string) => {
  const validar = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g;
  if (
    validar.test(dato) === false &&
    dato !== "" &&
    dato !== undefined &&
    dato !== null
  ) {
    return true
  }
  return false
};

export const rangeLength = (dato: string | null | undefined, min: number, max: number): boolean => {
    if (dato !== undefined && dato !== "" && dato !== null) {
      if (dato.length < min || dato.length > max) {
        return true
      }
      return false
    }
    return false
}

export const Match = (dato1: string | number | boolean | null | undefined, dato2: string | number | boolean | null | undefined): boolean => {
    return dato1 !== dato2
  };

export const isEmail = (email: string) => {
  const validar = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  if (
    validar.test(email) === false &&
    email !== "" &&
    email !== undefined &&
    email !== null
  ) {
    return true
  }
  return false
};

export const passwordConfirm = (value: string, valueConfirm: string): boolean => {
  return value !== valueConfirm
}

export function classNames(...classes: (string | Record<string, string | boolean>)[]): string {
  const classList = [];

  for (const item of classes) {
    if (typeof item === 'string') {
      classList.push(item);
    } else if (typeof item === 'object') {
      for (const [key, value] of Object.entries(item)) {
        if (value) {
          classList.push(key);
        }
      }
    }
  }

  return classList.join(' ');
}

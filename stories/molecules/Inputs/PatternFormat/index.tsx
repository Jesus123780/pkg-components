/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use strict'
import styles from "./styles.module.css";

function _interopDefault(ex: typeof React) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex.default : ex }

// const React = require('react')
import React from 'react'
const React__default = _interopDefault(React)

function __rest(s: { [x: string]: any } | null, e: string | string[]) {
  const t = {}
  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) { t[p] = s[p] }
  }
  if (s != null && typeof Object.getOwnPropertySymbols === 'function') {
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) { t[p[i]] = s[p[i]] }
    }
  }
  return t
}

let SourceType: { props?: any; event?: any };
(function (SourceType) {
  SourceType.event = 'event'
  SourceType.props = 'prop'
})(SourceType || (SourceType = {}))

// basic noop function
function noop() { }
function memoizeOnce(cb: { (prevValue: any, newValue: any): { from: { start: number; end: number }; to: { start: number; end: number } }; apply?: any }) {
  let lastArgs: string | any[]
  let lastValue: any
  return function () {
    const args = []; let len = arguments.length
    while (len--) args[len] = arguments[len]

    if (lastArgs &&
      args.length === lastArgs.length &&
      args.every(function (value, index) { return value === lastArgs[index] })) {
      return lastValue
    }
    lastArgs = args
    lastValue = cb.apply(void 0, args)
    return lastValue
  }
}
function charIsNumber(char: any) {
  return !!(char || '').match(/\d/)
}
function isNil(val: null | undefined) {
  return val === null || val === undefined
}
function isNanValue(val: number) {
  return typeof val === 'number' && isNaN(val)
}
function isNotValidValue(val: number) {
  return isNil(val) || isNanValue(val) || (typeof val === 'number' && !isFinite(val))
}
function escapeRegExp(str: string) {
  return str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')
}
function getThousandsGroupRegex(thousandsGroupStyle: any) {
  switch (thousandsGroupStyle) {
    case 'lakh':
      return /(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g
    case 'wan':
      return /(\d)(?=(\d{4})+(?!\d))/g
    case 'thousand':
    default:
      return /(\d)(?=(\d{3})+(?!\d))/g
  }
}
function applyThousandSeparator(str: string, thousandSeparator: string, thousandsGroupStyle: any) {
  const thousandsGroupRegex = getThousandsGroupRegex(thousandsGroupStyle)
  let index = str.search(/[1-9]/)
  index = index === -1 ? str.length : index
  return (str.substring(0, index) +
    str.substring(index, str.length).replace(thousandsGroupRegex, '$1' + thousandSeparator))
}
function usePersistentCallback(cb: (value: any, valueIsNumericString: any) => { formattedValue: any; numAsString: any }) {
  const callbackRef = React.useRef(cb)
  // keep the callback ref upto date
  callbackRef.current = cb
  /**
     * initialize a persistent callback which never changes
     * through out the component lifecycle
     */
  const persistentCbRef = React.useRef(function () {
    const args = []; let len = arguments.length
    while (len--) args[len] = arguments[len]

    return callbackRef.current.apply(callbackRef, args)
  })
  return persistentCbRef.current
}
// spilt a float number into different parts beforeDecimal, afterDecimal, and negation
function splitDecimal(numStr: string | string[], allowNegative: boolean | undefined) {
  if (allowNegative === void 0) allowNegative = true

  const hasNegation = numStr[0] === '-'
  const addNegation = hasNegation && allowNegative
  numStr = numStr.replace('-', '')
  const parts = numStr.split('.')
  const beforeDecimal = parts[0]
  const afterDecimal = parts[1] || ''
  return {
    beforeDecimal,
    afterDecimal,
    hasNegation,
    addNegation
  }
}
function fixLeadingZero(numStr: string | string[]) {
  if (!numStr) { return numStr }
  const isNegative = numStr[0] === '-'
  if (isNegative) { numStr = numStr.substring(1, numStr.length) }
  const parts = numStr.split('.')
  const beforeDecimal = parts[0].replace(/^0+/, '') || '0'
  const afterDecimal = parts[1] || ''
  return ('' + (isNegative ? '-' : '') + beforeDecimal + (afterDecimal ? ('.' + afterDecimal) : ''))
}
/**
 * limit decimal numbers to given scale
 * Not used .fixedTo because that will break with big numbers
 */
function limitToScale(numStr: string | any[], scale: number, fixedDecimalScale: boolean) {
  let str = ''
  const filler = fixedDecimalScale ? '0' : ''
  for (let i = 0; i <= scale - 1; i++) {
    str += numStr[i] || filler
  }
  return str
}
function repeat(str: string | undefined, count: number) {
  return Array(count + 1).join(str)
}
function toNumericString(num: string | number) {
  let _num = num + '' // typecast number to string
  // store the sign and remove it from the number.
  const sign = _num[0] === '-' ? '-' : ''
  if (sign) { _num = _num.substring(1) }
  // split the number into cofficient and exponent
  const ref = _num.split(/[eE]/g)
  let coefficient = ref[0]
  let exponent = ref[1]
  // covert exponent to number;
  exponent = Number(exponent)
  // if there is no exponent part or its 0, return the coffiecient with sign
  if (!exponent) { return sign + coefficient }
  coefficient = coefficient.replace('.', '')
  /**
     * for scientific notation the current decimal index will be after first number (index 0)
     * So effective decimal index will always be 1 + exponent value
     */
  const decimalIndex = 1 + exponent
  const coffiecientLn = coefficient.length
  if (decimalIndex < 0) {
    // if decimal index is less then 0 add preceding 0s
    // add 1 as join will have
    coefficient = '0.' + repeat('0', Math.abs(decimalIndex)) + coefficient
  } else if (decimalIndex >= coffiecientLn) {
    // if decimal index is less then 0 add leading 0s
    coefficient = coefficient + repeat('0', decimalIndex - coffiecientLn)
  } else {
    // else add decimal point at proper index
    coefficient =
      (coefficient.substring(0, decimalIndex) || '0') + '.' + coefficient.substring(decimalIndex)
  }
  return sign + coefficient
}
/**
 * This method is required to round prop value to given scale.
 * Not used .round or .fixedTo because that will break with big numbers
 */
function roundToPrecision(numStr: string | string[], scale: number | undefined, fixedDecimalScale: boolean) {
  // if number is empty don't do anything return empty string
  if (['', '-'].includes(numStr)) { return numStr }
  const shouldHaveDecimalSeparator = (numStr.indexOf('.') !== -1 || fixedDecimalScale) && scale
  const ref = splitDecimal(numStr)
  const beforeDecimal = ref.beforeDecimal
  const afterDecimal = ref.afterDecimal
  const hasNegation = ref.hasNegation
  const floatValue = parseFloat(('0.' + (afterDecimal || '0')))
  const floatValueStr = afterDecimal.length <= scale ? ('0.' + afterDecimal) : floatValue.toFixed(scale)
  const roundedDecimalParts = floatValueStr.split('.')
  const intPart = beforeDecimal
    .split('')
    .reverse()
    .reduce(function (roundedStr: string | any[], current: any, idx: number) {
      if (roundedStr.length > idx) {
        return ((Number(roundedStr[0]) + Number(current)).toString() +
          roundedStr.substring(1, roundedStr.length))
      }
      return current + roundedStr
    }, roundedDecimalParts[0])
  const decimalPart = limitToScale(roundedDecimalParts[1] || '', scale, fixedDecimalScale)
  const negation = hasNegation ? '-' : ''
  const decimalSeparator = shouldHaveDecimalSeparator ? '.' : ''
  return ('' + negation + intPart + decimalSeparator + decimalPart)
}
/** set the caret positon in an input field **/
function setCaretPosition(el: { value: any; createTextRange: () => any; selectionStart: number; focus: () => void; setSelectionRange: (arg0: any, arg1: any) => void } | null, caretPos: number) {
  el.value = el.value
  // ^ this is used to not only get 'focus', but
  // to make sure we don't have it everything -selected-
  // (it causes an issue in chrome, and having it doesn't hurt any other browser)
  if (el !== null) {
    if (el.createTextRange) {
      const range = el.createTextRange()
      range.move('character', caretPos)
      range.select()
      return true
    }
    // (el.selectionStart === 0 added for Firefox bug)
    if (el.selectionStart || el.selectionStart === 0) {
      el.focus()
      el.setSelectionRange(caretPos, caretPos)
      return true
    }
    // fail city, fortunately this never happens (as far as I've tested) :)
    el.focus()
    return false
  }
}
const findChangeRange = memoizeOnce(function (prevValue: string | any[], newValue: string | any[]) {
  let i = 0; let j = 0
  const prevLength = prevValue.length
  const newLength = newValue.length
  while (prevValue[i] === newValue[i] && i < prevLength) { i++ }
  // check what has been changed from last
  while (prevValue[prevLength - 1 - j] === newValue[newLength - 1 - j] &&
    newLength - j > i &&
    prevLength - j > i) {
    j++
  }
  return {
    from: { start: i, end: prevLength - j },
    to: { start: i, end: newLength - j }
  }
})
/*
  Returns a number whose value is limited to the given range
*/
function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max)
}
function geInputCaretPosition(el: never) {
  /* Max of selectionStart and selectionEnd is taken for the patch of pixel and other mobile device caret bug */
  return Math.max(el.selectionStart, el.selectionEnd)
}
function addInputMode() {
  return (typeof navigator !== 'undefined' &&
    !(navigator.platform && /iPhone|iPod/.test(navigator.platform)))
}
function getDefaultChangeMeta(value: string | any[]) {
  return {
    from: {
      start: 0,
      end: 0
    },
    to: {
      start: 0,
      end: value.length
    },
    lastValue: ''
  }
}
function getMaskAtIndex(mask: string | undefined, index: number) {
  if (mask === void 0) mask = ' '

  if (typeof mask === 'string') {
    return mask
  }
  return mask[index] || ' '
}
function defaultIsCharacterSame(ref: { currentValue: any; formattedValue: any; currentValueIndex: any; formattedValueIndex: any }) {
  const currentValue = ref.currentValue
  const formattedValue = ref.formattedValue
  const currentValueIndex = ref.currentValueIndex
  const formattedValueIndex = ref.formattedValueIndex

  return currentValue[currentValueIndex] === formattedValue[formattedValueIndex]
}
function getCaretPosition(newFormattedValue: string | any[], lastFormattedValue: any, curValue: string, curCaretPos: number, boundary: any[], isValidInputCharacter: (arg0: any) => any,
  /**
   * format function can change the character, the caret engine relies on mapping old value and new value
   * In such case if character is changed, parent can tell which chars are equivalent
   * Some example, all allowedDecimalCharacters are updated to decimalCharacters, 2nd case if user is coverting
   * number to different numeric system.
   */
  isCharacterSame: ((arg0: { currentValue: any; lastValue: any; formattedValue: any; currentValueIndex: number; formattedValueIndex: number }) => any) | undefined) {
  if (isCharacterSame === void 0) isCharacterSame = defaultIsCharacterSame

  /**
     * if something got inserted on empty value, add the formatted character before the current value,
     * This is to avoid the case where typed character is present on format characters
     */
  const firstAllowedPosition = boundary.findIndex(function (b: any) { return b })
  const prefixFormat = newFormattedValue.slice(0, firstAllowedPosition)
  if (!lastFormattedValue && !curValue.startsWith(prefixFormat)) {
    lastFormattedValue = prefixFormat
    curValue = prefixFormat + curValue
    curCaretPos = curCaretPos + prefixFormat.length
  }
  const curValLn = curValue.length
  const formattedValueLn = newFormattedValue.length
  // create index map
  const addedIndexMap = {}
  const indexMap = new Array(curValLn)
  for (let i = 0; i < curValLn; i++) {
    indexMap[i] = -1
    for (let j = 0, jLn = formattedValueLn; j < jLn; j++) {
      const isCharSame = isCharacterSame({
        currentValue: curValue,
        lastValue: lastFormattedValue,
        formattedValue: newFormattedValue,
        currentValueIndex: i,
        formattedValueIndex: j
      })
      if (isCharSame && addedIndexMap[j] !== true) {
        indexMap[i] = j
        addedIndexMap[j] = true
        break
      }
    }
  }
  /**
     * For current caret position find closest characters (left and right side)
     * which are properly mapped to formatted value.
     * The idea is that the new caret position will exist always in the boundary of
     * that mapped index
     */
  let pos = curCaretPos
  while (pos < curValLn && (indexMap[pos] === -1 || !isValidInputCharacter(curValue[pos]))) {
    pos++
  }
  // if the caret position is on last keep the endIndex as last for formatted value
  const endIndex = pos === curValLn || indexMap[pos] === -1 ? formattedValueLn : indexMap[pos]
  pos = curCaretPos - 1
  while (pos > 0 && indexMap[pos] === -1) { pos-- }
  const startIndex = pos === -1 || indexMap[pos] === -1 ? 0 : indexMap[pos] + 1
  /**
     * case where a char is added on suffix and removed from middle, example 2sq345 becoming $2,345 sq
     * there is still a mapping but the order of start index and end index is changed
     */
  if (startIndex > endIndex) { return endIndex }
  /**
     * given the current caret position if it closer to startIndex
     * keep the new caret position on start index or keep it closer to endIndex
     */
  return curCaretPos - startIndex < endIndex - curCaretPos ? startIndex : endIndex
}
/* This keeps the caret within typing area so people can't type in between prefix or suffix or format characters */
function getCaretPosInBoundary(value: string | any[], caretPos: number, boundary: boolean[], direction: string | undefined) {
  const valLn = value.length
  // clamp caret position to [0, value.length]
  caretPos = clamp(caretPos, 0, valLn)
  if (direction === 'left') {
    while (caretPos >= 0 && !boundary[caretPos]) { caretPos-- }
    // if we don't find any suitable caret position on left, set it on first allowed position
    if (caretPos === -1) { caretPos = boundary.indexOf(true) }
  } else {
    while (caretPos <= valLn && !boundary[caretPos]) { caretPos++ }
    // if we don't find any suitable caret position on right, set it on last allowed position
    if (caretPos > valLn) { caretPos = boundary.lastIndexOf(true) }
  }
  // if we still don't find caret position, set it at the end of value
  if (caretPos === -1) { caretPos = valLn }
  return caretPos
}
function caretUnknownFormatBoundary(formattedValue: string | any[]) {
  const boundaryAry = Array.from({ length: formattedValue.length + 1 }).map(function () { return true })
  for (let i = 0, ln = boundaryAry.length; i < ln; i++) {
    // consider caret to be in boundary if it is before or after numeric value
    boundaryAry[i] = Boolean(charIsNumber(formattedValue[i]) || charIsNumber(formattedValue[i - 1]))
  }
  return boundaryAry
}
function useInternalValues(value: any, defaultValue: any, valueIsNumericString: boolean, format: { (numStr: any): any; (arg0: any): any }, removeFormatting: { (inputValue: any, changeMeta: any): any; (arg0: any, arg1: undefined): any }, onValueChange: ((arg0: any, arg1: any) => void) | undefined) {
  if (onValueChange === void 0) onValueChange = noop

  const getValues = usePersistentCallback(function (value: any, valueIsNumericString: any) {
    let formattedValue, numAsString
    if (isNotValidValue(value)) {
      numAsString = ''
      formattedValue = ''
    } else if (typeof value === 'number' || valueIsNumericString) {
      numAsString = typeof value === 'number' ? toNumericString(value) : value
      formattedValue = format(numAsString)
    } else {
      numAsString = removeFormatting(value, undefined)
      formattedValue = format(numAsString)
    }
    return { formattedValue, numAsString }
  })
  const ref = React.useState(function () {
    return getValues(isNil(value) ? defaultValue : value, valueIsNumericString)
  })
  const values = ref[0]
  const setValues = ref[1]
  const _onValueChange = function (newValues: { formattedValue: any; value: any }, sourceInfo: any) {
    if (newValues.formattedValue !== values.formattedValue) {
      setValues({
        formattedValue: newValues.formattedValue,
        numAsString: newValues.value
      })
    }
    // call parent on value change if only if formatted value is changed
    onValueChange(newValues, sourceInfo)
  }
  // if value is switch from controlled to uncontrolled, use the internal state's value to format with new props
  let _value = value
  let _valueIsNumericString = valueIsNumericString
  if (isNil(value)) {
    _value = values.numAsString
    _valueIsNumericString = true
  }
  const newValues = getValues(_value, _valueIsNumericString)
  React.useMemo(function () {
    setValues(newValues)
  }, [newValues.formattedValue])
  return [values, _onValueChange]
}

function defaultRemoveFormatting(value: string) {
  if (value === void 0) value = ''
  if (value === null) { return '' }
  if (value === undefined) return ''
  return value?.replace(/[^0-9]/g, '')
}
function defaultFormat (value: any) {
  return value
}
const currencyFormat = (numStr: string): number | bigint | string => {
  if (numStr === '') return ''
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    currencyDisplay: 'symbol', // Puedes cambiar esto a 'code' o 'name' según prefieras
    maximumFractionDigits: 0
  }).format(isNaN(Number(numStr)) ? 0 : Number(numStr))
}

function NumberFormatBase (props: { label: string, onChangeDefault: (args: any) => void, name: any, type: any; displayType: any; customInput: any; renderText: any; getInputRef: any; format: any; removeFormatting: any; defaultValue: any; valueIsNumericString: any; onValueChange: any; isAllowed: any; onChange: any; onKeyDown: any; onMouseUp: any; onFocus: any; onBlur: any; value: any; getCaretBoundary: any; isValidInputCharacter: any; isCharacterSame: any }) {
  let type = props.type; if (type === void 0) type = 'text'
  let displayType = props.displayType; if (displayType === void 0) displayType = 'input'
  const customInput = props.customInput
  const renderText = props.renderText
  let label = props.label
  const getInputRef = props.getInputRef
  let format = props.format; if (format === void 0) format = defaultFormat
  let removeFormatting = props.removeFormatting; if (removeFormatting === void 0) removeFormatting = defaultRemoveFormatting
  const defaultValue = props.defaultValue
  let name = props.name
  const valueIsNumericString = props.valueIsNumericString
  const onValueChange = props.onValueChange
  const isAllowed = props.isAllowed
  let onChange = props.onChange; if (onChange === void 0) onChange = noop
  let onChangeDefault = props.onChangeDefault; if (onChangeDefault === void 0) onChangeDefault = noop
  let onKeyDown = props.onKeyDown; if (onKeyDown === void 0) onKeyDown = noop
  let onMouseUp = props.onMouseUp; if (onMouseUp === void 0) onMouseUp = noop
  let onFocus = props.onFocus; if (onFocus === void 0) onFocus = noop
  let onBlur = props.onBlur; if (onBlur === void 0) onBlur = noop
  const propValue = props.value
  let getCaretBoundary = props.getCaretBoundary; if (getCaretBoundary === void 0) getCaretBoundary = caretUnknownFormatBoundary
  let isValidInputCharacter = props.isValidInputCharacter; if (isValidInputCharacter === void 0) isValidInputCharacter = charIsNumber
  const isCharacterSame = props.isCharacterSame
  const otherProps = __rest(props, ['type', 'displayType', 'customInput', 'renderText', 'getInputRef', 'format', 'removeFormatting', 'defaultValue', 'valueIsNumericString', 'onValueChange', 'isAllowed', 'onChange', 'onKeyDown', 'onMouseUp', 'onFocus', 'onBlur', 'value', 'getCaretBoundary', 'isValidInputCharacter', 'isCharacterSame'])
  const ref = useInternalValues(propValue, defaultValue, Boolean(valueIsNumericString), format, removeFormatting, onValueChange)
  const ref_0 = ref[0]
  const formattedValue = ref_0.formattedValue
  const numAsString = ref_0.numAsString
  const onFormattedValueChange = ref[1]
  const lastUpdatedValue = React.useRef({ formattedValue, numAsString })
  const _onValueChange = function (values: { formattedValue: any; value: any; floatValue?: number | undefined }, source: { event: any; source: any }) {
    lastUpdatedValue.current = { formattedValue: values.formattedValue, numAsString: values.value }
    onFormattedValueChange(values, source)
  }
  const ref$1 = React.useState(false)
  const mounted = ref$1[0]
  const setMounted = ref$1[1]
  const focusedElm = React.useRef(null)
  const timeout = React.useRef({
    setCaretTimeout: null,
    focusTimeout: null
  })
  React.useEffect(function () {
    setMounted(true)
    return function () {
      clearTimeout(timeout.current.setCaretTimeout)
      clearTimeout(timeout.current.focusTimeout)
    }
  }, [])
  const _format = format
  const getValueObject = function (formattedValue: any, numAsString: string) {
    const floatValue = parseFloat(numAsString)
    return {
      formattedValue,
      value: numAsString,
      floatValue: isNaN(floatValue) ? undefined : floatValue
    }
  }
  const setPatchedCaretPosition = function (el: never, caretPos: any, currentValue: any) {
    // don't reset the caret position when the whole input content is selected
    if (el.selectionStart === 0 && el.selectionEnd === el.value.length) { return }
    /* setting caret position within timeout of 0ms is required for mobile chrome,
        otherwise browser resets the caret position after we set it
        We are also setting it without timeout so that in normal browser we don't see the flickering */
    setCaretPosition(el, caretPos)
    timeout.current.setCaretTimeout = setTimeout(function () {
      if (el.value === currentValue && el.selectionStart !== el.selectionEnd) {
        setCaretPosition(el, caretPos)
      }
    }, 0)
  }
  /* This keeps the caret within typing area so people can't type in between prefix or suffix */
  const correctCaretPosition = function (value: any, caretPos: any, direction: string | undefined) {
    return getCaretPosInBoundary(value, caretPos, getCaretBoundary(value), direction)
  }
  const getNewCaretPosition = function (inputValue: any, newFormattedValue: any, caretPos: number | undefined) {
    const caretBoundary = getCaretBoundary(newFormattedValue)
    let updatedCaretPos = getCaretPosition(newFormattedValue, formattedValue, inputValue, caretPos, caretBoundary, isValidInputCharacter, isCharacterSame)
    // correct caret position if its outside of editable area
    updatedCaretPos = getCaretPosInBoundary(newFormattedValue, updatedCaretPos, caretBoundary)
    return updatedCaretPos
  }
  const updateValueAndCaretPosition = function (params: { formattedValue: any; numAsString: any; inputValue: any; event: any; source: any; setCaretPosition: any; input: any; caretPos?: any }) {
    let newFormattedValue = params.formattedValue; if (newFormattedValue === void 0) newFormattedValue = ''
    const input = params.input
    let setCaretPosition = params.setCaretPosition; if (setCaretPosition === void 0) setCaretPosition = true
    const source = params.source
    const event = params.event
    const numAsString = params.numAsString
    let caretPos = params.caretPos
    if (input) {
      // calculate caret position if not defined
      if (caretPos === undefined && setCaretPosition) {
        const inputValue = params.inputValue || input.value
        const currentCaretPosition = geInputCaretPosition(input)
        /**
                 * set the value imperatively, this is required for IE fix
                 * This is also required as if new caret position is beyond the previous value.
                 * Caret position will not be set correctly
                 */
        input.value = newFormattedValue
        // get the caret position
        caretPos = getNewCaretPosition(inputValue, newFormattedValue, currentCaretPosition)
      }
      /**
             * set the value imperatively, as we set the caret position as well imperatively.
             * This is to keep value and caret position in sync
             */
      input.value = newFormattedValue
      // set caret position, and value imperatively when element is provided
      if (setCaretPosition && caretPos !== undefined) {
        // set caret position
        setPatchedCaretPosition(input, caretPos, newFormattedValue)
      }
    }
    if (newFormattedValue !== formattedValue) {
      // trigger onValueChange synchronously, so parent is updated along with the number format. Fix for #277, #287
      _onValueChange(getValueObject(newFormattedValue, numAsString), { event, source })
    }
  }
  /**
     * if the formatted value is not synced to parent, or if the formatted value is different from last synced value sync it
     * we also don't need to sync to the parent if no formatting is applied
     * if the formatting props is removed, in which case last formatted value will be different from the numeric string value
     * in such case we need to inform the parent.
     */
  React.useEffect(function () {
    const ref = lastUpdatedValue.current
    const lastFormattedValue = ref.formattedValue
    const lastNumAsString = ref.numAsString
    if (formattedValue !== lastFormattedValue &&
      (formattedValue !== numAsString || lastFormattedValue !== lastNumAsString)) {
      _onValueChange(getValueObject(formattedValue, numAsString), {
        event: undefined,
        source: SourceType.props
      })
    }
  }, [formattedValue, numAsString])
  // also if formatted value is changed from the props, we need to update the caret position
  // keep the last caret position if element is focused
  const currentCaretPosition = focusedElm.current
    ? geInputCaretPosition(focusedElm.current)
    : undefined
  // needed to prevent warning with useLayoutEffect on server
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect
  useIsomorphicLayoutEffect(function () {
    const input = focusedElm.current
    if (formattedValue !== lastUpdatedValue.current.formattedValue && input) {
      const caretPos = getNewCaretPosition(lastUpdatedValue.current.formattedValue, formattedValue, currentCaretPosition)
      /**
             * set the value imperatively, as we set the caret position as well imperatively.
             * This is to keep value and caret position in sync
             */
      input.value = formattedValue
      setPatchedCaretPosition(input, caretPos, formattedValue)
    }
  }, [formattedValue])
  const formatInputValue = function (inputValue: any, event: { target: any }, source: any) {
    const changeRange = findChangeRange(formattedValue, inputValue)
    const changeMeta = Object.assign(Object.assign({}, changeRange), { lastValue: formattedValue })
    let _numAsString = removeFormatting(inputValue, changeMeta)
    const _formattedValue = _format(_numAsString)
    // formatting can remove some of the number chars, so we need to fine number string again
    _numAsString = removeFormatting(_formattedValue, undefined)
    if (isAllowed && !isAllowed(getValueObject(_formattedValue, _numAsString))) {
      // reset the caret position
      const input = event.target
      const currentCaretPosition = geInputCaretPosition(input)
      const caretPos = getNewCaretPosition(inputValue, formattedValue, currentCaretPosition)
      input.value = formattedValue
      setPatchedCaretPosition(input, caretPos, formattedValue)
      return false
    }
    updateValueAndCaretPosition({
      formattedValue: _formattedValue,
      numAsString: _numAsString,
      inputValue,
      event,
      source,
      setCaretPosition: true,
      input: event.target
    })
    return true
  }
  const _onChange = function (e: { target: any }) {
    const el = e.target
    const inputValue = el.value
    const changed = formatInputValue(inputValue, e, SourceType.event)
    onChangeDefault({
      event: e,
      floatValue: Number(defaultRemoveFormatting(inputValue as string)),
      formattedValue,
      inputValue,
      inputElement: el
    })
    if (changed) { onChange(e) }
  }
  const _onKeyDown = function (e: { target: any; key: any; preventDefault: () => void; isUnitTestRun: any }) {
    const el = e.target
    const key = e.key
    const selectionStart = el.selectionStart
    const selectionEnd = el.selectionEnd
    let value = el.value; if (value === void 0) value = ''
    let expectedCaretPosition
    // Handle backspace and delete against non numerical/decimal characters or arrow keys
    if (key === 'ArrowLeft' || key === 'Backspace') {
      expectedCaretPosition = Math.max(selectionStart - 1, 0)
    } else if (key === 'ArrowRight') {
      expectedCaretPosition = Math.min(selectionStart + 1, value.length)
    } else if (key === 'Delete') {
      expectedCaretPosition = selectionStart
    }
    // if expectedCaretPosition is not set it means we don't want to Handle keyDown
    // also if multiple characters are selected don't handle
    if (expectedCaretPosition === undefined || selectionStart !== selectionEnd) {
      onKeyDown(e)
      return
    }
    let newCaretPosition = expectedCaretPosition
    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      const direction = key === 'ArrowLeft' ? 'left' : 'right'
      newCaretPosition = correctCaretPosition(value, expectedCaretPosition, direction)
      // arrow left or right only moves the caret, so no need to handle the event, if we are handling it manually
      if (newCaretPosition !== expectedCaretPosition) {
        e.preventDefault()
      }
    } else if (key === 'Delete' && !isValidInputCharacter(value[expectedCaretPosition])) {
      // in case of delete go to closest caret boundary on the right side
      newCaretPosition = correctCaretPosition(value, expectedCaretPosition, 'right')
    } else if (key === 'Backspace' && !isValidInputCharacter(value[expectedCaretPosition])) {
      // in case of backspace go to closest caret boundary on the left side
      newCaretPosition = correctCaretPosition(value, expectedCaretPosition, 'left')
    }
    if (newCaretPosition !== expectedCaretPosition) {
      setPatchedCaretPosition(el, newCaretPosition, value)
    }
    /* NOTE: this is just required for unit test as we need to get the newCaretPosition,
                Remove this when you find different solution */
    /* @ts-expect-error */
    if (e.isUnitTestRun) {
      setPatchedCaretPosition(el, newCaretPosition, value)
    }
    onKeyDown(e)
  }
  /** required to handle the caret position when click anywhere within the input **/
  const _onMouseUp = function (e: { target: any }) {
    const el = e.target
    /**
         * NOTE: we have to give default value for value as in case when custom input is provided
         * value can come as undefined when nothing is provided on value prop.
         */
    const selectionStart = el.selectionStart
    const selectionEnd = el.selectionEnd
    let value = el.value; if (value === void 0) value = ''
    if (selectionStart === selectionEnd) {
      const caretPosition = correctCaretPosition(value, selectionStart)
      if (caretPosition !== selectionStart) {
        setPatchedCaretPosition(el, caretPosition, value)
      }
    }
    onMouseUp(e)
  }
  const _onFocus = function (e: { persist: () => void; target: any }) {
    // Workaround Chrome and Safari bug https://bugs.chromium.org/p/chromium/issues/detail?id=779328
    // (onFocus event target selectionStart is always 0 before setTimeout)
    if (e.persist) { e.persist() }
    const el = e.target
    focusedElm.current = el
    timeout.current.focusTimeout = setTimeout(function () {
      const selectionStart = el.selectionStart
      const selectionEnd = el.selectionEnd
      let value = el.value; if (value === void 0) value = ''
      const caretPosition = correctCaretPosition(value, selectionStart)
      // setPatchedCaretPosition only when everything is not selected on focus (while tabbing into the field)
      if (caretPosition !== selectionStart &&
        !(selectionStart === 0 && selectionEnd === value.length)) {
        setPatchedCaretPosition(el, caretPosition, value)
      }
      onFocus(e)
    }, 0)
  }
  const _onBlur = function (e: any) {
    focusedElm.current = null
    clearTimeout(timeout.current.focusTimeout)
    clearTimeout(timeout.current.setCaretTimeout)
    onBlur(e)
  }
  // add input mode on element based on format prop and device once the component is mounted
  const inputMode = mounted && addInputMode() ? 'numeric' : undefined
  const inputProps = Object.assign({ inputMode }, otherProps, {
    type,
    name,
    value: formattedValue ?? currencyFormat(props.defaultValue),
    defaultValue: props.defaultValue,
    onChange: _onChange,
    onKeyDown: _onKeyDown,
    onMouseUp: _onMouseUp,
    onFocus: _onFocus,
    onBlur: _onBlur,
    className: styles.input
  })

  if (displayType === 'text') {
    return renderText ? (React__default.createElement(React__default.Fragment, null, renderText(formattedValue, otherProps) || null)) : (React__default.createElement('span', Object.assign({}, otherProps, { ref: getInputRef }), formattedValue))
  } else if (customInput) {
    const CustomInput = customInput
    /* @ts-expect-error */
    return React__default.createElement(CustomInput, Object.assign({}, inputProps, { ref: getInputRef }))
  }

  return (
    <div className={styles.wrapper}>
      {label !== '' &&
        <label className={styles.label_input} htmlFor={name}>
          {label}
        </label>}
      {React__default.createElement('input', Object.assign({}, inputProps, { ref: getInputRef }))}
    </div>
  )
}

function format(numStr: string | string[], props: { decimalScale: any; fixedDecimalScale: any; prefix: any; suffix: any; allowNegative: any; thousandsGroupStyle: any }) {
  const decimalScale = props.decimalScale
  const fixedDecimalScale = props.fixedDecimalScale
  let prefix = props.prefix; if (prefix === void 0) prefix = ''
  let suffix = props.suffix; if (suffix === void 0) suffix = ''
  const allowNegative = props.allowNegative
  let thousandsGroupStyle = props.thousandsGroupStyle; if (thousandsGroupStyle === void 0) thousandsGroupStyle = 'thousand'
  // don't apply formatting on empty string or '-'
  if (numStr === '' || numStr === '-') {
    return numStr
  }
  const ref = getSeparators(props)
  const thousandSeparator = ref.thousandSeparator
  const decimalSeparator = ref.decimalSeparator
  /**
     * Keep the decimal separator
     * when decimalScale is not defined or non zero and the numStr has decimal in it
     * Or if decimalScale is > 0 and fixeDecimalScale is true (even if numStr has no decimal)
     */
  const hasDecimalSeparator = (decimalScale !== 0 && numStr.indexOf('.') !== -1) || (decimalScale && fixedDecimalScale)
  const ref$1 = splitDecimal(numStr, allowNegative)
  let beforeDecimal = ref$1.beforeDecimal
  let afterDecimal = ref$1.afterDecimal
  let addNegation = ref$1.addNegation // eslint-disable-line prefer-const
  // apply decimal precision if its defined
  if (decimalScale !== undefined) {
    afterDecimal = limitToScale(afterDecimal, decimalScale, !!fixedDecimalScale)
  }
  if (thousandSeparator) {
    beforeDecimal = applyThousandSeparator(beforeDecimal, thousandSeparator, thousandsGroupStyle)
  }
  // add prefix and suffix when there is a number present
  if (prefix) { beforeDecimal = prefix + beforeDecimal }
  if (suffix) { afterDecimal = afterDecimal + suffix }
  // restore negation sign
  if (addNegation) { beforeDecimal = '-' + beforeDecimal }
  numStr = beforeDecimal + ((hasDecimalSeparator && decimalSeparator) || '') + afterDecimal
  return numStr
}
function getSeparators(props: { decimalSeparator: any; thousandSeparator: any; allowedDecimalSeparators: any }) {
  let decimalSeparator = props.decimalSeparator; if (decimalSeparator === void 0) decimalSeparator = '.'
  let thousandSeparator = props.thousandSeparator
  let allowedDecimalSeparators = props.allowedDecimalSeparators
  if (thousandSeparator === true) {
    thousandSeparator = ','
  }
  if (!allowedDecimalSeparators) {
    allowedDecimalSeparators = [decimalSeparator, '.']
  }
  return {
    decimalSeparator,
    thousandSeparator,
    allowedDecimalSeparators
  }
}
function handleNegation(value: string | undefined, allowNegative: any) {
  if (value === void 0) value = ''

  const negationRegex = new RegExp('(-)')
  const doubleNegationRegex = new RegExp('(-)(.)*(-)')
  // Check number has '-' value
  const hasNegation = negationRegex.test(value)
  // Check number has 2 or more '-' values
  const removeNegation = doubleNegationRegex.test(value)
  // remove negation
  value = value.replace(/-/g, '')
  if (hasNegation && !removeNegation && allowNegative) {
    value = '-' + value
  }
  return value
}
function getNumberRegex(decimalSeparator: any, global: boolean) {
  return new RegExp(('(^-)|[0-9]|' + (escapeRegExp(decimalSeparator))), global ? 'g' : undefined)
}
function isNumericString(val: string, prefix: string | null | undefined, suffix: string | null | undefined) {
  // for empty value we can always treat it as numeric string
  if (val === '') { return true }
  return (!(prefix === null || prefix === void 0 ? void 0 : prefix.match(/\d/)) && !(suffix === null || suffix === void 0 ? void 0 : suffix.match(/\d/)) && typeof val === 'string' && !isNaN(Number(val)))
}
function removeFormatting(value: string, changeMeta: { from: any; to: any; lastValue: any } | undefined, props: { allowNegative: any; prefix: any; suffix: any; decimalScale: any }) {
  let assign

  if (changeMeta === void 0) changeMeta = getDefaultChangeMeta(value)
  const allowNegative = props.allowNegative
  let prefix = props.prefix; if (prefix === void 0) prefix = ''
  let suffix = props.suffix; if (suffix === void 0) suffix = ''
  const decimalScale = props.decimalScale
  const from = changeMeta.from
  const to = changeMeta.to
  let start = to.start
  let end = to.end
  const ref = getSeparators(props)
  const allowedDecimalSeparators = ref.allowedDecimalSeparators
  const decimalSeparator = ref.decimalSeparator
  const isBeforeDecimalSeparator = value[end] === decimalSeparator
  /**
     * If only a number is added on empty input which matches with the prefix or suffix,
     * then don't remove it, just return the same
     */
  if (charIsNumber(value) &&
    (value === prefix || value === suffix) &&
    changeMeta.lastValue === '') {
    return value
  }
  /** Check for any allowed decimal separator is added in the numeric format and replace it with decimal separator */
  if (end - start === 1 && allowedDecimalSeparators.indexOf(value[start]) !== -1) {
    const separator = decimalScale === 0 ? '' : decimalSeparator
    value = value.substring(0, start) + separator + value.substring(start + 1, value.length)
  }
  const stripNegation = function (value: string | string[], start: number, end: number) {
    /**
         * if prefix starts with - we don't allow negative number to avoid confusion
         * if suffix starts with - and the value length is same as suffix length, then the - sign is from the suffix
         * In other cases, if the value starts with - then it is a negation
         */
    let hasNegation = false
    let hasDoubleNegation = false
    if (prefix.startsWith('-')) {
      hasNegation = false
    } else if (value.startsWith('--')) {
      hasNegation = false
      hasDoubleNegation = true
    } else if (suffix.startsWith('-') && value.length === suffix.length) {
      hasNegation = false
    } else if (value[0] === '-') {
      hasNegation = true
    }
    let charsToRemove = hasNegation ? 1 : 0
    if (hasDoubleNegation) { charsToRemove = 2 }
    // remove negation/double negation from start to simplify prefix logic as negation comes before prefix
    if (charsToRemove) {
      value = value.substring(charsToRemove)
      // account for the removal of the negation for start and end index
      start -= charsToRemove
      end -= charsToRemove
    }
    return { value, start, end, hasNegation }
  }
  const toMetadata = stripNegation(value, start, end)
  const hasNegation = toMetadata.hasNegation;
  ((assign = toMetadata, value = assign.value, start = assign.start, end = assign.end))
  const ref$1 = stripNegation(changeMeta.lastValue, from.start, from.end)
  const fromStart = ref$1.start
  const fromEnd = ref$1.end
  const lastValue = ref$1.value
  // if only prefix and suffix part is updated reset the value to last value
  // if the changed range is from suffix in the updated value, and the the suffix starts with the same characters, allow the change
  const updatedSuffixPart = value.substring(start, end)
  if (value.length &&
    lastValue.length &&
    (fromStart > lastValue.length - suffix.length || fromEnd < prefix.length) &&
    !(updatedSuffixPart && suffix.startsWith(updatedSuffixPart))) {
    value = lastValue
  }
  /**
     * remove prefix
     * Remove whole prefix part if its present on the value
     * If the prefix is partially deleted (in which case change start index will be less the prefix length)
     * Remove only partial part of prefix.
     */
  let startIndex = 0
  if (value.startsWith(prefix)) { startIndex += prefix.length } else if (start < prefix.length) { startIndex = start }
  value = value.substring(startIndex)
  // account for deleted prefix for end
  end -= startIndex
  /**
     * Remove suffix
     * Remove whole suffix part if its present on the value
     * If the suffix is partially deleted (in which case change end index will be greater than the suffixStartIndex)
     * remove the partial part of suffix
     */
  let endIndex = value.length
  const suffixStartIndex = value.length - suffix.length
  if (value.endsWith(suffix)) { endIndex = suffixStartIndex }
  // if the suffix is removed from the end
  else if (end > suffixStartIndex) { endIndex = end }
  // if the suffix is removed from start
  else if (end > value.length - suffix.length) { endIndex = end }
  value = value.substring(0, endIndex)
  // add the negation back and handle for double negation
  value = handleNegation(hasNegation ? ('-' + value) : value, allowNegative)
  // remove non numeric characters
  value = (value.match(getNumberRegex(decimalSeparator, true)) || []).join('')
  // replace the decimalSeparator with ., and only keep the first separator, ignore following ones
  const firstIndex = value.indexOf(decimalSeparator)
  value = value.replace(new RegExp(escapeRegExp(decimalSeparator), 'g'), function (match: any, index: any) {
    return index === firstIndex ? '.' : ''
  })
  // check if beforeDecimal got deleted and there is nothing after decimal,
  // clear all numbers in such case while keeping the - sign
  const ref$2 = splitDecimal(value, allowNegative)
  const beforeDecimal = ref$2.beforeDecimal
  const afterDecimal = ref$2.afterDecimal
  let addNegation = ref$2.addNegation // eslint-disable-line prefer-const
  // clear only if something got deleted before decimal (cursor is before decimal)
  if (to.end - to.start < from.end - from.start &&
    beforeDecimal === '' &&
    isBeforeDecimalSeparator &&
    !parseFloat(afterDecimal)) {
    value = addNegation ? '-' : ''
  }
  return value
}
function getCaretBoundary(formattedValue: string | any[], props: { prefix: any; suffix: any }) {
  let prefix = props.prefix; if (prefix === void 0) prefix = ''
  let suffix = props.suffix; if (suffix === void 0) suffix = ''
  const boundaryAry = Array.from({ length: formattedValue.length + 1 }).map(function () { return true })
  const hasNegation = formattedValue[0] === '-'
  // fill for prefix and negation
  boundaryAry.fill(false, 0, prefix.length + (hasNegation ? 1 : 0))
  // fill for suffix
  const valLn = formattedValue.length
  boundaryAry.fill(false, valLn - suffix.length + 1, valLn + 1)
  return boundaryAry
}
function validateAndUpdateProps(props: { prefix: any; allowNegative: any }) {
  const ref = getSeparators(props)
  const thousandSeparator = ref.thousandSeparator
  const decimalSeparator = ref.decimalSeparator
  // eslint-disable-next-line prefer-const
  let prefix = props.prefix; if (prefix === void 0) prefix = ''
  let allowNegative = props.allowNegative; if (allowNegative === void 0) allowNegative = true
  if (thousandSeparator === decimalSeparator) {
    throw new Error(("\n        Decimal separator can't be same as thousand separator.\n        thousandSeparator: " + thousandSeparator + ' (thousandSeparator = {true} is same as thousandSeparator = ",")\n        decimalSeparator: ' + decimalSeparator + ' (default value for decimalSeparator is .)\n     '))
  }
  if (prefix.startsWith('-') && allowNegative) {
    // TODO: throw error in next major version
    console.error(("\n      Prefix can't start with '-' when allowNegative is true.\n      prefix: " + prefix + '\n      allowNegative: ' + allowNegative + '\n    '))
    allowNegative = false
  }
  return Object.assign(Object.assign({}, props), { allowNegative })
}
function useNumericFormat(props: { decimalSeparator: any; allowedDecimalSeparators: any; thousandsGroupStyle: any; suffix: any; allowNegative: any; allowLeadingZeros: any; onKeyDown: any; onBlur: any; thousandSeparator: any; decimalScale: any; fixedDecimalScale: any; prefix: any; defaultValue: any; value: any; valueIsNumericString: any; onValueChange: any }) {
  // validate props
  props = validateAndUpdateProps(props)
  const _decimalSeparator = props.decimalSeparator
  const _allowedDecimalSeparators = props.allowedDecimalSeparators
  const thousandsGroupStyle = props.thousandsGroupStyle
  const suffix = props.suffix
  const allowNegative = props.allowNegative
  const allowLeadingZeros = props.allowLeadingZeros
  let onKeyDown = props.onKeyDown; if (onKeyDown === void 0) onKeyDown = noop
  let onBlur = props.onBlur; if (onBlur === void 0) onBlur = noop
  const thousandSeparator = props.thousandSeparator
  const decimalScale = props.decimalScale
  const fixedDecimalScale = props.fixedDecimalScale
  let prefix = props.prefix; if (prefix === void 0) prefix = ''
  const defaultValue = props.defaultValue
  const value = props.value
  const valueIsNumericString = props.valueIsNumericString
  const onValueChange = props.onValueChange
  const restProps = __rest(props, ['decimalSeparator', 'allowedDecimalSeparators', 'thousandsGroupStyle', 'suffix', 'allowNegative', 'allowLeadingZeros', 'onKeyDown', 'onBlur', 'thousandSeparator', 'decimalScale', 'fixedDecimalScale', 'prefix', 'defaultValue', 'value', 'valueIsNumericString', 'onValueChange'])
  // get derived decimalSeparator and allowedDecimalSeparators
  const ref = getSeparators(props)
  const decimalSeparator = ref.decimalSeparator
  const allowedDecimalSeparators = ref.allowedDecimalSeparators
  const _format = function (numStr: any) { return format(numStr, props) }
  const _removeFormatting = function (inputValue: any, changeMeta: any) { return removeFormatting(inputValue, changeMeta, props) }
  const _value = isNil(value) ? defaultValue : value
  // try to figure out isValueNumericString based on format prop and value
  let _valueIsNumericString = valueIsNumericString !== null && valueIsNumericString !== void 0 ? valueIsNumericString : isNumericString(_value, prefix, suffix)
  if (!isNil(value)) {
    _valueIsNumericString = _valueIsNumericString || typeof value === 'number'
  } else if (!isNil(defaultValue)) {
    _valueIsNumericString = _valueIsNumericString || typeof defaultValue === 'number'
  }
  const roundIncomingValueToPrecision = function (value: string) {
    if (isNotValidValue(value)) { return value }
    if (typeof value === 'number') {
      value = toNumericString(value)
    }
    /**
         * only round numeric or float string values coming through props,
         * we don't need to do it for onChange events, as we want to prevent typing there
         */
    if (_valueIsNumericString && typeof decimalScale === 'number') {
      return roundToPrecision(value, decimalScale, Boolean(fixedDecimalScale))
    }
    return value
  }
  const ref$1 = useInternalValues(roundIncomingValueToPrecision(value), roundIncomingValueToPrecision(defaultValue), Boolean(_valueIsNumericString), _format, _removeFormatting, onValueChange)
  const ref$1_0 = ref$1[0]
  const numAsString = ref$1_0.numAsString
  const formattedValue = ref$1_0.formattedValue
  const _onValueChange = ref$1[1]
  const _onKeyDown = function (e: { target: any; key: any; preventDefault: () => void }) {
    const el = e.target
    const key = e.key
    const selectionStart = el.selectionStart
    const selectionEnd = el.selectionEnd
    let value = el.value; if (value === void 0) value = ''
    // if multiple characters are selected and user hits backspace, no need to handle anything manually
    if (selectionStart !== selectionEnd) {
      onKeyDown(e)
      return
    }
    // if user hits backspace, while the cursor is before prefix, and the input has negation, remove the negation
    if (key === 'Backspace' &&
      value[0] === '-' &&
      selectionStart === prefix.length + 1 &&
      allowNegative) {
      // bring the cursor to after negation
      setCaretPosition(el, 1)
    }
    // don't allow user to delete decimal separator when decimalScale and fixedDecimalScale is set
    if (decimalScale && fixedDecimalScale) {
      if (key === 'Backspace' && value[selectionStart - 1] === decimalSeparator) {
        setCaretPosition(el, selectionStart - 1)
        e.preventDefault()
      } else if (key === 'Delete' && value[selectionStart] === decimalSeparator) {
        e.preventDefault()
      }
    }
    // if user presses the allowed decimal separator before the separator, move the cursor after the separator
    if ((allowedDecimalSeparators === null || allowedDecimalSeparators === void 0 ? void 0 : allowedDecimalSeparators.includes(key)) && value[selectionStart] === decimalSeparator) {
      setCaretPosition(el, selectionStart + 1)
    }
    const _thousandSeparator = thousandSeparator === true ? ',' : thousandSeparator
    // move cursor when delete or backspace is pressed before/after thousand separator
    if (key === 'Backspace' && value[selectionStart - 1] === _thousandSeparator) {
      setCaretPosition(el, selectionStart - 1)
    }
    if (key === 'Delete' && value[selectionStart] === _thousandSeparator) {
      setCaretPosition(el, selectionStart + 1)
    }
    onKeyDown(e)
  }
  const _onBlur = function (e: any) {
    let _value = numAsString
    // if there no no numeric value, clear the input
    if (!_value.match(/\d/g)) {
      _value = ''
    }
    // clear leading 0s
    if (!allowLeadingZeros) {
      _value = fixLeadingZero(_value)
    }
    // apply fixedDecimalScale on blur event
    if (fixedDecimalScale && decimalScale) {
      _value = roundToPrecision(_value, decimalScale, fixedDecimalScale)
    }
    if (_value !== numAsString) {
      const formattedValue = format(_value, props)
      _onValueChange({
        formattedValue,
        value: _value,
        floatValue: parseFloat(_value)
      }, {
        event: e,
        source: SourceType.event
      })
    }
    onBlur(e)
  }
  const isValidInputCharacter = function (inputChar: any) {
    if (inputChar === decimalSeparator) { return true }
    return charIsNumber(inputChar)
  }
  const isCharacterSame = function (ref: { currentValue: any; lastValue: any; formattedValue: any; currentValueIndex: any; formattedValueIndex: any }) {
    const currentValue = ref.currentValue
    const lastValue = ref.lastValue
    const formattedValue = ref.formattedValue
    const currentValueIndex = ref.currentValueIndex
    const formattedValueIndex = ref.formattedValueIndex

    const curChar = currentValue[currentValueIndex]
    const newChar = formattedValue[formattedValueIndex]
    /**
         * NOTE: as thousand separator and allowedDecimalSeparators can be same, we need to check on
         * typed range if we have typed any character from allowedDecimalSeparators, in that case we
         * consider different characters like , and . same within the range of updated value.
         */
    const typedRange = findChangeRange(lastValue, currentValue)
    const to = typedRange.to
    if (currentValueIndex >= to.start &&
      currentValueIndex < to.end &&
      allowedDecimalSeparators?.includes(curChar) &&
      newChar === decimalSeparator) {
      return true
    }
    return curChar === newChar
  }
  return Object.assign(Object.assign({}, restProps), {
    value: formattedValue,
    valueIsNumericString: false,
    isValidInputCharacter,
    isCharacterSame,
    onValueChange: _onValueChange,
    format: _format,
    removeFormatting: _removeFormatting,
    getCaretBoundary: function (formattedValue: any) { return getCaretBoundary(formattedValue, props) },
    onKeyDown: _onKeyDown,
    onBlur: _onBlur
  })
}
function NumericFormat(props: any) {
  const numericFormatProps = useNumericFormat(props)
  return React__default.createElement(NumberFormatBase, Object.assign({}, numericFormatProps))
}

function format$1(numStr: string | any[], props: { format: any; allowEmptyFormatting: any; mask: any; patternChar: any }) {
  const format = props.format
  const allowEmptyFormatting = props.allowEmptyFormatting
  const mask = props.mask
  let patternChar = props.patternChar; if (patternChar === void 0) patternChar = '#'
  if (numStr === '' && !allowEmptyFormatting) { return '' }
  let hashCount = 0
  const formattedNumberAry = format.split('')
  for (let i = 0, ln = format.length; i < ln; i++) {
    if (format[i] === patternChar) {
      formattedNumberAry[i] = numStr[hashCount] || getMaskAtIndex(mask, hashCount)
      hashCount += 1
    }
  }
  return formattedNumberAry.join('')
}
function removeFormatting$1(value: string | any[], changeMeta: { from: any; to: any; lastValue: any } | undefined, props: { format: any; patternChar: any }) {
  if (changeMeta === void 0) changeMeta = getDefaultChangeMeta(value)

  const format = props.format
  let patternChar = props.patternChar; if (patternChar === void 0) patternChar = '#'
  const from = changeMeta.from
  const to = changeMeta.to
  let lastValue = changeMeta.lastValue; if (lastValue === void 0) lastValue = ''
  const isNumericSlot = function (caretPos: number) { return format[caretPos] === patternChar }
  const removeFormatChar = function (string: string | any[], startIndex: number) {
    let str = ''
    for (let i = 0; i < string.length; i++) {
      if (isNumericSlot(startIndex + i) && charIsNumber(string[i])) {
        str += string[i]
      }
    }
    return str
  }
  const extractNumbers = function (str: string) { return str.replace(/[^0-9]/g, '') }
  // if format doesn't have any number, remove all the non numeric characters
  if (!format.match(/\d/)) {
    return extractNumbers(value)
  }
  /**
     * if user paste the whole formatted text in an empty input, check if matches to the pattern
     * and remove the format characters, if there is a mismatch on the pattern, do plane number extract
     */
  if (lastValue === '' && value.length === format.length) {
    let str = ''
    for (let i = 0; i < value.length; i++) {
      if (isNumericSlot(i)) {
        if (charIsNumber(value[i])) {
          str += value[i]
        }
      } else if (value[i] !== format[i]) {
        // if there is a mismatch on the pattern, do plane number extract
        return extractNumbers(value)
      }
    }
    return str
  }
  const firstSection = lastValue.substring(0, from.start)
  const middleSection = value.substring(to.start, to.end)
  const lastSection = lastValue.substring(from.end)
  return ('' + (removeFormatChar(firstSection, 0)) + (extractNumbers(middleSection)) + (removeFormatChar(lastSection, from.end)))
}
function getCaretBoundary$1(formattedValue: string | any[], props: { format: any; mask: any; patternChar: any }) {
  const format = props.format
  const mask = props.mask
  let patternChar = props.patternChar; if (patternChar === void 0) patternChar = '#'
  const boundaryAry = Array.from({ length: formattedValue.length + 1 }).map(function () { return true })
  let hashCount = 0
  let firstEmptySlot = -1
  const maskAndIndexMap = {}
  format.split('').forEach(function (char: any, index: number) {
    let maskAtIndex
    if (char === patternChar) {
      hashCount++
      maskAtIndex = getMaskAtIndex(mask, hashCount - 1)
      if (firstEmptySlot === -1 && formattedValue[index] === maskAtIndex) {
        firstEmptySlot = index
      }
    }
    maskAndIndexMap[index] = maskAtIndex
  })
  const isPosAllowed = function (pos: number) {
    // the position is allowed if the position is not masked and valid number area
    return format[pos] === patternChar && formattedValue[pos] !== maskAndIndexMap[pos]
  }
  for (let i = 0, ln = boundaryAry.length; i < ln; i++) {
    // consider caret to be in boundary if it is before or after numeric value
    // Note: on pattern based format its denoted by patternCharacter
    // we should also allow user to put cursor on first empty slot
    boundaryAry[i] = i === firstEmptySlot || isPosAllowed(i) || isPosAllowed(i - 1)
  }
  // the first patternChar position is always allowed
  boundaryAry[format.indexOf(patternChar)] = true
  return boundaryAry
}
function validateProps(props: { mask: any }) {
  const mask = props.mask
  if (mask) {
    const maskAsStr = mask === 'string' ? mask : mask.toString()
    if (maskAsStr.match(/\d/g)) {
      throw new Error(('Mask ' + mask + ' should not contain numeric character;'))
    }
  }
}
function isNumericString$1(val: string, format: string | null | undefined) {
  // we can treat empty string as numeric string
  if (val === '') { return true }
  return !(format === null || format === void 0 ? void 0 : format.match(/\d/)) && typeof val === 'string' && (!!val.match(/^\d+$/) || val === '')
}
function usePatternFormat(props: { mask: any; allowEmptyFormatting: any; format: any; inputMode: any; onKeyDown: any; patternChar: any; value: any; defaultValue: any; valueIsNumericString: any }) {
  const mask = props.mask
  const allowEmptyFormatting = props.allowEmptyFormatting
  const formatProp = props.format
  let inputMode = props.inputMode; if (inputMode === void 0) inputMode = 'numeric'
  let onKeyDown = props.onKeyDown; if (onKeyDown === void 0) onKeyDown = noop
  let patternChar = props.patternChar; if (patternChar === void 0) patternChar = '#'
  const value = props.value
  const defaultValue = props.defaultValue
  const valueIsNumericString = props.valueIsNumericString
  const restProps = __rest(props, ['mask', 'allowEmptyFormatting', 'format', 'inputMode', 'onKeyDown', 'patternChar', 'value', 'defaultValue', 'valueIsNumericString'])
  // validate props
  validateProps(props)
  const _getCaretBoundary = function (formattedValue: any) {
    return getCaretBoundary$1(formattedValue, props)
  }
  const _onKeyDown = function (e: { key: any; target: any }) {
    const key = e.key
    const el = e.target
    const selectionStart = el.selectionStart
    const selectionEnd = el.selectionEnd
    const value = el.value
    // if multiple characters are selected and user hits backspace, no need to handle anything manually
    if (selectionStart !== selectionEnd) {
      onKeyDown(e)
      return
    }
    // bring the cursor to closest numeric section
    let caretPos = selectionStart
    // if backspace is pressed after the format characters, bring it to numeric section
    // if delete is pressed before the format characters, bring it to numeric section
    if (key === 'Backspace' || key === 'Delete') {
      let direction = 'right'
      if (key === 'Backspace') {
        while (caretPos > 0 && formatProp[caretPos - 1] !== patternChar) {
          caretPos--
        }
        direction = 'left'
      } else {
        const formatLn = formatProp.length
        while (caretPos < formatLn && formatProp[caretPos] !== patternChar) {
          caretPos++
        }
        direction = 'right'
      }
      caretPos = getCaretPosInBoundary(value, caretPos, _getCaretBoundary(value), direction)
    } else if (formatProp[caretPos] !== patternChar &&
      key !== 'ArrowLeft' &&
      key !== 'ArrowRight') {
      // if user is typing on format character position, bring user to next allowed caret position
      caretPos = getCaretPosInBoundary(value, caretPos + 1, _getCaretBoundary(value), 'right')
    }
    // if we changing caret position, set the caret position
    if (caretPos !== selectionStart) {
      setCaretPosition(el, caretPos)
    }
    onKeyDown(e)
  }
  // try to figure out isValueNumericString based on format prop and value
  const _value = isNil(value) ? defaultValue : value
  const isValueNumericString = valueIsNumericString !== null && valueIsNumericString !== void 0 ? valueIsNumericString : isNumericString$1(_value, formatProp)
  const _props = Object.assign(Object.assign({}, props), { valueIsNumericString: isValueNumericString })
  return Object.assign(Object.assign({}, restProps), {
    value,
    defaultValue,
    valueIsNumericString: isValueNumericString,
    inputMode,
    format: function (numStr: any) { return format$1(numStr, _props) },
    removeFormatting: function (inputValue: any, changeMeta: any) { return removeFormatting$1(inputValue, changeMeta, _props) },
    getCaretBoundary: _getCaretBoundary,
    onKeyDown: _onKeyDown
  })
}
function PatternFormat(props: any) {
  const patternFormatProps = usePatternFormat(props)
  return React__default.createElement(NumberFormatBase, Object.assign({}, patternFormatProps))
}

export { NumericFormat, PatternFormat, NumberFormatBase, currencyFormat }

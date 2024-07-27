export const simpleVerifyEmail = (email = '', setMessage = (message: string) => { return message }): string => {
  const emailParts = email.split('@')
  const emailDomain = emailParts[1]
  let errorMessage = ''
  if (emailDomain !== undefined) {
    if (emailDomain === '') {
      errorMessage = 'por favor proporcione el dominio de la dirección de correo electrónico'
      setMessage(`${errorMessage}`)
    } else {
      // eslint-disable-next-line no-useless-escape
      const validDomainRegExp = /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-+]?){0,62})\w)+)\.(\w{2,6})$/
      if (emailDomain.match(validDomainRegExp) == null) {
        errorMessage = 'por favor verifique el dominio de la dirección de correo electrónico'
        setMessage(errorMessage)
      }
    }
  }
  return errorMessage
}

export const topLevelEmailDomainList = [
  'gmail.com',
  'outlook.com',
  'hotmail.com',
  'live.com',
  'yahoo.com',
  'icloud.com'
]

export const otherLevelEmailDomainList = [
  'gmail.com',
  'gmail.co.uk',
  'outlook.com',
  'outlook.co.uk',
  'yahoo.com',
  'yahoo.ca',
  'hotmail.com',
  'live.com',
  'icloud.com'
]

export const provideEmailSuggestion = (email: string): string[] => {
  const emailParts = email.split('@')
  const emailUsername = emailParts[0]
  const emailDomain = emailParts[1]
  let suggestionList = [] as string[]
  if (emailDomain !== undefined) {
    if (emailDomain === '') {
      suggestionList = topLevelEmailDomainList?.map(
        domain => { return emailUsername + '@' + domain }
      )
    } else {
      suggestionList = otherLevelEmailDomainList.filter(domain => { return domain.startsWith(emailDomain) }).map(domain => { return emailUsername + '@' + domain })
    }
  }
  return suggestionList
}

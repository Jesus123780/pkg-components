export const simpleVerifyEmail = (email, setMessage = () => { return }) => {
  const emailParts = email.split('@')
  const emailDomain = emailParts[1]
  let errorMessage = ''
  if (emailDomain !== undefined) {
    if (emailDomain === '') {
      errorMessage = 'please provide email address domain'
      setMessage(errorMessage)
    } else {
      // eslint-disable-next-line no-useless-escape
      const validDomainRegExp = /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-+]?){0,62})\w)+)\.(\w{2,6})$/
      if (!emailDomain.match(validDomainRegExp)) {
        errorMessage = 'please verify email address domain'
        setMessage(errorMessage)
      }
    }
  }
  return errorMessage
}
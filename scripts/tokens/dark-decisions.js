const { darkChoices } = require('./choices')
const createDecisions = require('./createDecisions')

const darkDecisions = createDecisions(darkChoices)

module.exports = darkDecisions

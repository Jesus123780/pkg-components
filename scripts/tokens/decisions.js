const { choices } = require('./choices')
const createDecisions = require('./createDecisions')

const decisions = createDecisions(choices)

module.exports = decisions

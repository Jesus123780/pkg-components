import PropTypes from 'prop-types'
import { FeedItem } from './styled'
import { IconMiniCheck } from '../../../assets/icons'
import { BGColor } from '../../../assets/colors'

export const StatusItemOrderProcess = ({
    pulse = false,
    rejected = false,
    text = ''
  }) => {
    return (
      <FeedItem rejected={rejected} pulse={pulse} title={text}>
        {!rejected && <IconMiniCheck size='12px' color={BGColor} />}
      </FeedItem>
    )
  }

StatusItemOrderProcess.propTypes = {
  data: PropTypes.string,
  pulse: PropTypes.bool,
  text: PropTypes.string
}

import PropTypes from 'prop-types'
import { BGColor } from '../../../assets/colors'
import { IconMiniCheck } from '../../../assets/icons'
import { FeedItem } from './styled'

export const StatusItemOrderProcess = ({
  pulse = false,
  rejected = false,
  text = ''
}) => {
  return (
    <FeedItem
      pulse={pulse}
      rejected={rejected}
      title={text}
    >
      {!rejected && <IconMiniCheck color={BGColor} size='12px' />}
    </FeedItem>
  )
}

StatusItemOrderProcess.propTypes = {
  data: PropTypes.string,
  pulse: PropTypes.bool,
  rejected: PropTypes.bool,
  text: PropTypes.string
}

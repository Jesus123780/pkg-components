import PropTypes from 'prop-types'
import { FeedItem } from './styled'

export const StatusItemOrderProcess = ({
    pulse,
    text,
    data
  }) => {
    return (
      <FeedItem pulse={pulse}>
        <span className='activity-text'>{text}</span>
        <div>
          <span className='text-info'>{text}</span>
          <span className='date'>{data}</span>
        </div>
      </FeedItem>
    )
  }

StatusItemOrderProcess.propTypes = {
  data: PropTypes.any,
  pulse: PropTypes.any,
  text: PropTypes.any
}

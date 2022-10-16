import './styles.css';

export const Tag = ({ label = 'OBLIGATORIO' }) => {
  return (
    <span className='marmita-minitag'>{label}</span>
  )
}

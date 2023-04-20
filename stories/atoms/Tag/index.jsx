import './styles.css';

export const Tag = ({ label = 'OBLIGATORIO', children }) => {
  return (
    <span className='marmita-minitag'>
      {label}
      {children}
    </span>
  )
}

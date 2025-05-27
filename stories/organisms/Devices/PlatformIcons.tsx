const defaultIcon = (
  <svg
    fill='none'
    height='24'
    viewBox='0 0 24 24'
    width='24'
  ><rect
    height='22.5'
    rx='3.25'
    stroke='#3E3E3E'
    strokeWidth='1.5'
    width='12.5'
    x='5.75'
    y='0.75'
  ></rect><path
    d='M10 4H14'
    stroke='#3E3E3E'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='1.5'
  ></path><path
    d='M11 21H13'
    stroke='#3E3E3E'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='1.5'
  ></path></svg>
)
export const platformIcons = {
  'win32': (
    <svg
      fill='none'
      height='24'
      viewBox='0 0 24 24'
      width='24'
    ><rect
      height='15.5'
      rx='3.25'
      stroke='#3E3E3E'
      strokeWidth='1.5'
      width='20.5'
      x='1.75'
      y='0.75'
    ></rect><path
      d='M5 13L19 13'
      stroke='#3E3E3E'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
    ></path><path
      d='M8 22C8 20.343 9.79133 19 12 19C14.2087 19 16 20.343 16 22H8Z'
      stroke='#3E3E3E'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
    ></path><path
      d='M12 17L12.0017 19'
      stroke='#3E3E3E'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
    ></path></svg>
  ),
  'Tablet': defaultIcon,
  'Mobile': defaultIcon,
  'Unknown': defaultIcon
}
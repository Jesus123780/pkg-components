export const Loading = ({ color, size, ...props }) => {
  return (
    <svg
      {...props}
      fill={color}
      height={`${size}px`}
      viewBox="0 0 21 21"
      width={`${size}px`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M14.549 20.1045C12.6396 20.8955 10.5384 21.1024 8.51131 20.6992C6.48421 20.296 4.62219 19.3007 3.16073 17.8393C1.69928 16.3778 0.704012 14.5158 0.300797 12.4887C-0.102419 10.4616 0.104527 8.36044 0.89546 6.45095C1.6864 4.54146 3.0258 2.9094 4.74429 1.76114C6.46279 0.612875 8.48319 -5.72205e-06 10.55 -5.72205e-06C11.1419 -5.72205e-06 11.6218 0.479855 11.6218 1.07179C11.6218 1.66372 11.1419 2.14358 10.55 2.14358C8.90715 2.14358 7.30119 2.63074 5.93521 3.54347C4.56923 4.45619 3.50457 5.75347 2.87588 7.27127C2.24719 8.78906 2.08269 10.4592 2.4032 12.0705C2.7237 13.6818 3.51481 15.1618 4.67648 16.3235C5.83815 17.4852 7.31821 18.2763 8.9295 18.5968C10.5408 18.9173 12.2109 18.7528 13.7287 18.1241C15.2465 17.4954 16.5438 16.4308 17.4565 15.0648C18.3692 13.6988 18.8564 12.0928 18.8564 10.45C18.8564 9.85806 19.3363 9.3782 19.9282 9.3782C20.5201 9.3782 21 9.85806 21 10.45C21 12.5168 20.3871 14.5372 19.2389 16.2557C18.0906 17.9742 16.4585 19.3136 14.549 20.1045Z"
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  );
};
export const IconSales = ({ style = {}, size, color }) => {
  return <svg
    fill='none'
    height={size}
    stroke={color || '#ff0000'}
    style={style}
    viewBox='0 0 24 24'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path
      d='M8.14096 8.00024C6.71925 8.00024 5.49276 8.99817 5.20365 10.3902L3.99972 16.1868C3.48396 18.6701 5.37989 21.0002 7.91614 21.0002H16.0839C18.6201 21.0002 20.516 18.6701 20.0003 16.1868L18.7964 10.3902C18.5073 8.99818 17.2808 8.00024 15.8591 8.00024H8.14096Z'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
  ></path><path
      d='M15 6V6C15 4.34315 13.6569 3 12 3V3C10.3431 3 9 4.34315 9 6V6'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
  ></path></svg>
}

export const IconDelete = ({ style = {}, size, color }) => {
  return (
    <svg
      fill={color}
      height={size}
      style={style}
      viewBox="0 0 23 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.014 10.085l-.544 8.656c-.036.48.338.9.822.925h.06a.87.87 0 0 0 .87-.817l.544-8.656a.867.867 0 0 0-.822-.924.892.892 0 0 0-.93.816zM8.965 9.269a.883.883 0 0 0-.821.924l.543 8.656a.87.87 0 0 0 .87.817h.06a.883.883 0 0 0 .822-.925l-.543-8.656a.892.892 0 0 0-.93-.816z"
        fill={color}
      ></path>
      <path
        d="M22.027 4.946h-5.968V3.338C16.058 1.5 14.547 0 12.698 0H10.21C8.35 0 6.839 1.5 6.839 3.338v1.608H.882A.866.866 0 0 0 0 5.811c0 .48.387.876.882.876h2.066l.894 14.191C3.952 22.631 5.304 24 6.912 24h9.074c1.607 0 2.96-1.369 3.069-3.122l.096-1.572a.875.875 0 0 0-.821-.925.884.884 0 0 0-.93.817l-.097 1.572c-.049.829-.629 1.49-1.317 1.49H6.91c-.688 0-1.268-.65-1.317-1.49L4.7 6.687H18.21l-.387 6.1c-.036.48.338.9.822.924a.876.876 0 0 0 .93-.817l.399-6.207h2.066a.884.884 0 0 0 .882-.876c0-.48-.41-.865-.894-.865zM8.603 3.338c0-.877.725-1.597 1.607-1.597h2.49c.881 0 1.606.72 1.606 1.597v1.608H8.603V3.338z"
        fill={color}
      ></path>
    </svg>
  );
};

export const IconComment = (props) => (
  <svg
    fill="none"
    height={16}
    width={16}
    xmlns="http://www.w3.org/2000/svg"
    style={{
      cursor: "pointer",
    }}
    {...props}
  >
    <path
      d="M4.667 12.288h2.667L10.3 14.26a.665.665 0 0 0 1.034-.553v-1.42c2 0 3.333-1.334 3.333-3.334v-4c0-2-1.333-3.333-3.333-3.333H4.667c-2 0-3.333 1.333-3.333 3.333v4c0 2 1.333 3.334 3.333 3.334zm1-5.288h4.666M5.667 7h4.666"
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
    />
  </svg>
)


export const IconSendMessage = ({ size, color }) => {
  return <svg
    height={size}
    viewBox='0 0 47.02 39.35'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><defs></defs><title>Asset 8</title><g data-name='Layer 2' id='Layer_2'><g data-name='Layer 2' id='Layer_2-2'><path
      d='M45.84,1.13,17.26,26.45l12.08,3.14a1,1,0,0,0,1.17-.51L46,1.26A.1.1,0,0,0,45.84,1.13Z'
      fill='none'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1px'
  /><path
      d='M9.62,23.15l-7.83-2a1,1,0,0,1-.15-2L45.62,1a.06.06,0,0,1,.05.11l-36.05,22,4.86,14.57a1,1,0,0,0,2-.31l.79-11'
      fill='none'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1px'
  /><line
      fill='none'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1px'
      x1='16.06'
      x2='23.65'
      y1='38.35'
      y2='28.11'
  /></g></g></svg>
}
export const IconClose = ({ style = {}, size, color }) => {
  return (
    <svg
      fill={color || "#717171"}
      height={size}
      viewBox="0 0 32 32"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        height="20.36"
        rx="1.13"
        transform="rotate(-45 8 9.6)"
        width="2.26"
        x="8"
        y="9.6"
      ></rect>
      <rect
        height="20.36"
        rx="1.13"
        transform="rotate(45 22.4 8)"
        width="2.26"
        x="22.4"
        y="8"
      ></rect>
    </svg>
  );
};

  {(sum === true) && (
            <WrapperButton>
              {decrement && (
                <Button
                  delay='.1s'
                  grid={false}
                  onClick={handleDown}
                  top={'80px'}
                >
                  <svg
                    height='24'
                    viewBox='0 0 24 24'
                    width='24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M17.993 11c.556 0 1.007.444 1.007 1 0 .552-.45 1-1.007 1H6.007A1.001 1.001 0 0 1 5 12c0-.552.45-1 1.007-1h11.986z'
                      fill={'#ffff'}
                      fillRule='evenodd'
                    >
                      {' '}
                    </path>
                  </svg>
                </Button>
              )}

              <ItemProQuantity className='ProQuantity'>
                <div
                  className='counts--container'
                  onClick={() => {
                    return setShow(index)
                  }}
                >
                  <div className={`count ${startAnimateUp}${animateType}`}>
                    {ProQuantity}
                  </div>
                </div>
                {show === index && (
                  <input
                    max={999}
                    min={1}
                    onBlur={() => {
                      return setShow(false)
                    }}
                    onChange={(event) => {
                      return dispatch({
                        type: 'ON_CHANGE',
                        payload: {
                          value: event.target.value,
                          name: 'name',
                          index,
                          id: pId
                        }
                      })
                    }}
                    onFocus={(event) => {
                      return dispatch({
                        type: 'ON_CHANGE',
                        payload: {
                          value: event.target.value,
                          name: 'name',
                          index,
                          id: pId
                        }
                      })
                    }}
                    onKeyDown={(event) => {
                      return event.key === 'Enter' ? setShow(false) : null
                    }}
                    type='number'
                    value={ProQuantity}
                  />
                )}
              </ItemProQuantity>
              {increment && (
                <Button
                  grid={false}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    return handleUp(event)
                  }}
                  top={'80px'}
                >
                  <svg
                    height='24'
                    viewBox='0 0 24 24'
                    width='24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M13 11h4.993c.556 0 1.007.444 1.007 1 0 .552-.45 1-1.007 1H13v4.993C13 18.55 12.556 19 12 19c-.552 0-1-.45-1-1.007V13H6.007A1.001 1.001 0 0 1 5 12c0-.552.45-1 1.007-1H11V6.007C11 5.45 11.444 5 12 5c.552 0 1 .45 1 1.007V11z'
                      fill='#ffffff'
                      fillRule='evenodd'
                    ></path>
                  </svg>
                </Button>
              )}
            </WrapperButton>
          )}
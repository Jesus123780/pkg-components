import React from 'react';
import { StatusItemOrderProcess } from './StatusItemOrderProcess';
import { CardOrder } from './styled';

export const OrderCard = ({ storeOrder }) => {
  return (
    <CardOrder>
      {!!storeOrder &&
        storeOrder.map((x, i) => (
          <div className="card" key={i + 1}>
            <div className="card-header">
              <div className="order-number"># {x.pCodeRef}</div>
              {x.pSState === 5 ? (
                <div>
                  <StatusItemOrderProcess
                    data={x.pDatMod}
                    pulse={false}
                    text={'El pedido fue rechazado'}
                  />
                </div>
              ) : (
                <div className="status-list">
                  {x.pSState === 0 && (
                    <StatusItemOrderProcess
                      data={x.pDatMod}
                      pulse={x.pSState === 0}
                    />
                  )}
                  {x.pSState >= 1 && (
                    <StatusItemOrderProcess
                      data={x.pDatMod}
                      pulse={x.pSState === 1}
                      text={'Aceptado'}
                    />
                  )}
                  {x.pSState >= 2 && (
                    <StatusItemOrderProcess
                      data={x.pDatMod}
                      pulse={x.pSState === 2}
                      text={'Pedido en proceso'}
                    />
                  )}
                  {x.pSState >= 3 && (
                    <StatusItemOrderProcess
                      data={x.pDatMod}
                      pulse={x.pSState === 3}
                      text={'listo para entrega'}
                    />
                  )}
                  {x.pSState >= 4 && (
                    <StatusItemOrderProcess
                      data={x.pDatMod}
                      pulse={x.pSState === 4}
                      text={'Pedido concluido'}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
    </CardOrder>
  );
};

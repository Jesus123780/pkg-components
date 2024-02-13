import React from 'react';
import { Rate } from '../../molecules';
import { AsideInfoStore } from '../../molecules/AsideInfoStore';
import { HeaderSteps } from '../../molecules/HeaderSteps';
import { Text, Button, Row, Column } from '../../atoms';
import { Divider } from '../../atoms/Divider';

interface Schedule {
  day: string;
  horarios: { horaInicio: string; horaFin: string }[];
}

interface LateralStoreInfoProps {
  active?: number;
  fState?: number;
  idStore?: string;
  minOrder?: number;
  overActive?: number;
  rating?: number;
  show: boolean;
  steps?: string[];
  schedulesStore: Schedule[];
  setRatingStar: (props: any) => void;
  handleClose: () => void;
  setActive: (active: number) => void;
  setRating: (rating: number) => void;
  handleOverActive: (index: number) => void;
  removeFav: (idStore: string, fState: number) => void;
  addFav: (idStore: string) => void;
}

export const LateralStoreInfo: React.FC<LateralStoreInfoProps> = ({
  active = 0,
  fState = 0,
  idStore = '',
  minOrder,
  overActive = 0,
  rating = 0,
  show = true,
  steps = [],
  schedulesStore = [],
  setRatingStar,
  handleClose,
  setActive,
  setRating,
  handleOverActive,
  removeFav,
  addFav,
}) => {
  return (
    <AsideInfoStore handleClose={handleClose} show={show}>
      <div style={{ width: '90%', margin: 'auto' }}>
        <HeaderSteps
          active={active}
          handleOverActive={handleOverActive}
          overActive={overActive}
          setActive={setActive}
          steps={steps}
        />
        {active === 0 && (
          <>
            <div style={{ width: '50%' }}>
              <Text>Califica este restaurante</Text>
              <div style={{ width: 'min-content' }}>
                <Rate
                  onRating={(rate) => {
                    setRating(rate);
                    setRatingStar({
                      variables: {
                        data: {
                          rScore: rate,
                        },
                      },
                    });
                  }}
                  rating={rating}
                />
              </div>
            </div>
            <Divider borderTop={true} />
            <div
              className='containe'
              style={{ width: '50%', justifyContent: 'end' }}
            >
              {!!minOrder && (
                <Text size='3xl'>
                  Precio de Producto mínimo $ {minOrder}
                </Text>
              )}
              <Text>
                {fState === 1 ? 'Elimina de' : 'Añade de '} tus favoritos
              </Text>
              <Button
                onClick={() => {
                  return fState === 1 ? removeFav(idStore, fState) : addFav(idStore);
                }}
              >
                {fState === 1 ? 'Eliminar' : 'Añadir'}
              </Button>
            </div>
          </>
        )}
        {active === 1 &&
          schedulesStore.map((schedule, index) => {
            return (
              <Column key={index}>
                <Row>
                  <Text>{schedule.day}</Text>
                  {schedule?.horarios?.map((horario, i) => (
                    <div key={i}>
                      <Row>
                        <Text>
                          {horario.horaInicio || 'Cerrado'}
                        </Text>
                        <Text> - </Text>
                        <Text>
                          {horario.horaFin || 'Cerrado'}
                        </Text>
                      </Row>
                    </div>
                  ))}
                </Row>
                <Divider borderTop={true} />
              </Column>
            );
          })}
      </div>
    </AsideInfoStore>
  );
};

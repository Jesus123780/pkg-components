import React from 'react'
import { Carousel } from '../../molecules/Slider'
import { Column, Icon, Text } from '../../atoms'
import type { Root } from './types'
import styles from './styles.module.css'
import { getGlobalStyle } from '../../../helpers'

interface CategorieProductsProps {
  data: Root[]
  breakpoints: Record<
  string,
  {
    slidesPerView: number | string
    spaceBetween: number | string
  }
  >
  handleChangeCheck: (id: string) => void
}

export const CategoriesProducts: React.FC<CategorieProductsProps> = ({
  data = [],
  breakpoints,
  handleChangeCheck = (id) => {
    return id
  }
}) => {
  return (
    <div>
      <Carousel breakpoints={breakpoints as any} pagination={false}>
        {data.map((item) => (
          <div
            key={item.carProId}
            className={styles.categorie}
            title={item.pName}
            onClick={() => {
              handleChangeCheck(item.carProId)
            }}
          >
            <div className={styles.cat_item}
            style={(typeof item?.checked === 'boolean' && item?.checked) ? { border: `1px solid ${getGlobalStyle('--color-text-primary')} ` } : {}}
            >
              <Column justifyContent='flex-start' alignItems='flex-start'>
                <Text
                  className={styles.cat_title}
                  size='xl'
                  align='center'
                  color='primary'
                >
                  {item.pName}
                </Text>
              </Column>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

import React from 'react'
import { Carousel } from '../../molecules/Slider'
import { Text } from '../../atoms'
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
  const findChecked = data?.some((item) => Boolean(item?.checked))
  return (
    <div>
      <Carousel breakpoints={breakpoints} pagination={false}>
        {data.map((item, index) => (
          <div
            key={item.carProId}
            className={styles.categorie}
            title={item.pName}
            style={item?.checked ? { border: `1px solid ${getGlobalStyle('--color-text-primary')} ` } : {}}
            onClick={() => {
              handleChangeCheck(item.carProId)
            }}
          >
            <div className={styles.cat_item}>
              <Text
                className={styles.cat_title}
                size="sm"
                align="center"
                color="gray"
              >
                {item.pName}
              </Text>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

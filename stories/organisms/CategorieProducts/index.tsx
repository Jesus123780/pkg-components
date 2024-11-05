import React from 'react'
import { Carousel } from '../../molecules/Slider'
import { Icon, Text } from '../../atoms'
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
            style={(typeof item?.checked === 'boolean' && item?.checked) ? { border: `1px solid ${getGlobalStyle('--color-text-primary')} ` } : {}}
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
              <Icon
                color={getGlobalStyle('--color-icons-gray')}
                icon='IconBox'
                size={25}
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

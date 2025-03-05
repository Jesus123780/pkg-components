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
  const iconsByNames: Record<string, string> = {
    Combos: 'IconLunch',
    Desayunos: 'IconEgg',
    Entradas: 'IconNoodles',
    Panadería: 'IconBread',
    Sopas: 'IconSoup',
    Ensaladas: 'IconPlatter',
    'Platos Fuertes': 'IconDinner',
    Acompañamientos: 'IconPotate',
    'Menú Infantil': 'IconPancake',
    Postres: 'IconDonut',
    Bebidas: 'IconDrink',
    NINGUNO: 'IconBox'
  }
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
              <Icon
                color={getGlobalStyle('--color-icons-gray')}
                icon={iconsByNames[item.pName] ?? 'IconBox'}
                size={30}
              />
              <Column justifyContent='flex-start' alignItems='flex-start'>
                <Text
                  className={styles.cat_title}
                  size="sm"
                  align="center"
                  color="gray"
                >
                  {item.pName}
                </Text>
                <Text
                  className={styles.cat_items}
                  size="sm"
                  align="center"
                  color="gray"
                >
                  {Number(item?.productFoodsAll?.length)} items
                </Text>
              </Column>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

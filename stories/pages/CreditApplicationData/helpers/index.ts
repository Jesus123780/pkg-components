import phone from '../../../assets/public/Images/Phone.png'

interface DeviceInfo {
    title: string;
    id: number;
    value: string;
}

export const deviceInfo: DeviceInfo[] = [
    {
        id: 1,
        title: 'Memoria interna',
        value: '128GB'
    },
    {
        id: 2,
        title: 'Memoria RAM',
        value: '4GB'
    },
    {
        id: 3,
        title: 'Resolución de pantalla',
        value: '720 x 1600px'
    },
    {
        id: 4,
        title: 'Resolución cámara principal',
        value: '50MP + 2MP + 2MP'
    },
    {
        id: 5,
        title: 'Resolución cámara frontal',
         value: '5MP'
    },
    {
        id: 6,
        title: 'Procesador',
        value: 'Mediatek Helio G25 2GHz'
    },
    {
        id: 7,
        title: 'Sistema operativo',
        value: 'Android 12'
    },
    {
        id: 8,
        title: 'Tamaño pantalla', value: '6.5"'
    },
    {
        id: 9,
        title: 'Batería y carga', value: '5000 MaH'
    },
]

export const imagesArray = [
    {
      id: 1,
      image: phone,
    },
    {
      id: 2,
      image: phone,
    },
    {
      id: 3,
      image: phone,
    },
  ]
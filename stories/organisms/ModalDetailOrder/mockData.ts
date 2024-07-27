import type { TypeModalDetailOrder } from './type'

export const mockDataOrder: TypeModalDetailOrder = {
  dataModal: {
    __typename: 'StorePedidos',
    pdpId: null,
    idStore: '013e5387-34a1-6a78-303d-5098f17bf640',
    pCodeRef: 'Tm9o8UKd3J',
    payMethodPState: 0,
    pPRecoger: null,
    totalProductsPrice: 56000,
    pSState: 4,
    pDatCre: '2024-02-29T15:56:51.310Z',
    channel: 1,
    locationUser: null,
    pDatMod: '2024-02-29T15:56:51.310Z',
    getAllPedidoStore: [
      {
        __typename: 'StorePedidos',
        pdpId: '72ecacdf-c99b-5d4d-6714-19997b6132f3',
        pId: null,
        idStore: '013e5387-34a1-6a78-303d-5098f17bf640',
        ShoppingCard: 'c4ac1185-1b7e-ee13-4af5-3491b068af12',
        pCodeRef: 'Tm9o8UKd3J',
        pPStateP: 1,
        payMethodPState: 0,
        pPRecoger: null,
        pDatCre: '2024-02-29T15:56:51.077Z',
        pDatMod: '2024-02-29T15:56:51.077Z',
        getAllShoppingCard: {
          __typename: 'ShoppingCard',
          ShoppingCard: 'c4ac1185-1b7e-ee13-4af5-3491b068af12',
          comments: '',
          cantProducts: 1,
          pId: '22f39df1-04c4-4251-e518-b43f93fc8a2b',
          priceProduct: 5000,
          productFood: {
            __typename: 'ProductFood',
            pId: '22f39df1-04c4-4251-e518-b43f93fc8a2b',
            carProId: 'a3729864-eb9d-9204-5fd3-ae4077457d25',
            colorId: null,
            idStore: '013e5387-34a1-6a78-303d-5098f17bf640',
            pName: 'Hamburguesa  mas papas',
            ProPrice: 5000,
            ProDescuento: 3,
            ProDescription: 'wedsdasdasasdasdadasd',
            ValueDelivery: null,
            ProImage:
              'https:https://front-back-server.onrender.comstatic/platos/undefined',
            ProStar: 0,
            pState: 1,
            pDatCre: '2024-02-14T21:00:06.751Z',
            pDatMod: '2024-02-14T21:00:06.751Z'
          }
        }
      },
      {
        __typename: 'StorePedidos',
        pdpId: '685b80a7-11c6-41aa-ce1e-06aace36528f',
        pId: null,
        idStore: '013e5387-34a1-6a78-303d-5098f17bf640',
        ShoppingCard: '2396cbb8-6aa8-8bde-b7de-bcee31edf0fc',
        pCodeRef: 'Tm9o8UKd3J',
        pPStateP: 1,
        payMethodPState: 0,
        pPRecoger: null,
        pDatCre: '2024-02-29T15:56:51.143Z',
        pDatMod: '2024-02-29T15:56:51.143Z',
        getAllShoppingCard: {
          __typename: 'ShoppingCard',
          ShoppingCard: '2396cbb8-6aa8-8bde-b7de-bcee31edf0fc',
          comments: '',
          cantProducts: 1,
          priceProduct: 5000,
          pId: '075c0df7-8ec2-2fdf-7db6-2b7b481c03bd',
          productFood: {
            __typename: 'ProductFood',
            pId: '075c0df7-8ec2-2fdf-7db6-2b7b481c03bd',
            carProId: '65575a8e-bf90-ba74-0bb3-c3eafe849a0c',
            colorId: null,
            idStore: '013e5387-34a1-6a78-303d-5098f17bf640',
            pName: 'Test con muchos sub items',
            ProPrice: 5000,
            ProDescuento: 3,
            ProDescription:
              'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            ValueDelivery: null,
            ProImage:
              'https:https://front-back-server.onrender.comstatic/platos/undefined',
            ProStar: 0,
            pState: 1,
            pDatCre: '2024-02-13T10:22:37.930Z',
            pDatMod: '2024-02-13T10:22:37.930Z'
          }
        }
      },
      {
        __typename: 'StorePedidos',
        pdpId: 'b555e577-6e9f-2522-6d8c-5eadba67347b',
        pId: null,
        idStore: '013e5387-34a1-6a78-303d-5098f17bf640',
        ShoppingCard: 'cf5e21fa-8d13-1366-79c3-26bc97d599f7',
        pCodeRef: 'Tm9o8UKd3J',
        pPStateP: 1,
        payMethodPState: 0,
        pPRecoger: null,
        pDatCre: '2024-02-29T15:56:51.212Z',
        pDatMod: '2024-02-29T15:56:51.212Z',
        getAllShoppingCard: {
          __typename: 'ShoppingCard',
          ShoppingCard: 'cf5e21fa-8d13-1366-79c3-26bc97d599f7',
          comments: 'comment test',
          cantProducts: 1,
          pId: '486c7a48-1511-bc69-3ebf-13e8c04d2125',
          productFood: {
            __typename: 'ProductFood',
            pId: '486c7a48-1511-bc69-3ebf-13e8c04d2125',
            carProId: '65575a8e-bf90-ba74-0bb3-c3eafe849a0c',
            colorId: null,
            idStore: '013e5387-34a1-6a78-303d-5098f17bf640',
            pName: 'Test con muchos sub items',
            ProPrice: 5000,
            ProDescuento: '0',
            ProDescription: '50000',
            ValueDelivery: null,
            ProImage:
              'https:https://front-back-server.onrender.comstatic/platos/undefined',
            ProStar: 0,
            pState: 1,
            pDatCre: '2024-02-09T08:31:03.487Z',
            pDatMod: '2024-02-09T08:31:03.487Z'
          }
        }
      },
      {
        __typename: 'StorePedidos',
        pdpId: 'd4430d29-a1df-c835-e704-2bde83777da1',
        pId: null,
        idStore: '013e5387-34a1-6a78-303d-5098f17bf640',
        ShoppingCard: '667d0f87-461f-fa32-11fe-103b38fca4f4',
        pCodeRef: 'Tm9o8UKd3J',
        pPStateP: 1,
        payMethodPState: 0,
        pPRecoger: null,
        pDatCre: '2024-02-29T15:56:51.275Z',
        pDatMod: '2024-02-29T15:56:51.275Z',
        getAllShoppingCard: {
          __typename: 'ShoppingCard',
          ShoppingCard: '667d0f87-461f-fa32-11fe-103b38fca4f4',
          comments: '',
          cantProducts: 1,
          pId: '7d4a1451-7387-735d-eb8c-b5c821ef5128',
          productFood: {
            __typename: 'ProductFood',
            pId: '7d4a1451-7387-735d-eb8c-b5c821ef5128',
            carProId: '65575a8e-bf90-ba74-0bb3-c3eafe849a0c',
            colorId: null,
            idStore: '013e5387-34a1-6a78-303d-5098f17bf640',
            pName: 'Hamburguesa China 3L',
            ProPrice: 5000,
            ProDescuento: '0',
            ProDescription:
              'Con todo, cebolla , papas y salsas picantes japonesas y chinas, con un toque de finas raizes chinas con la delicadeza preparacion China',
            ValueDelivery: null,
            ProImage:
              'https:https://front-back-server.onrender.comstatic/platos/undefined',
            ProStar: 0,
            pState: 1,
            pDatCre: '2024-02-26T18:11:43.715Z',
            pDatMod: '2024-02-26T18:11:43.715Z'
          }
        }
      }
    ]
  },
  dataStore: {
    __typename: 'Store',
    cId: '013e5387-34a1-6a78-303d-5098f17bf640',
    id: '013e5387-34a1-6a78-303d-5098f17bf640',
    deliveryTimeMinutes: 30,
    scheduleOpenAll: false,
    dId: '013e5387-34a1-6a78-303d-5098f17bf640',
    idStore: '013e5387-34a1-6a78-303d-5098f17bf640',
    ctId: '013e5387-34a1-6a78-303d-5098f17bf640',
    neighborhoodStore: '3423423423423',
    Viaprincipal: '3423423423423',
    catStore: '013e5387-34a1-6a78-303d-5098f17bf640',
    storeOwner: 'Jesus Juvinao',
    storeName: 'Los Buñueleros',
    ImageName: null,
    emailStore: 'Los Buñueleros',
    storePhone: '3423423423423',
    socialRaz: '4563456',
    Image: null,
    banner: '3423423423423',
    documentIdentifier: '345634563',
    uPhoNum: '354563456354',
    ULocation: '345353',
    upLat: '',
    upLon: '',
    uState: '2',
    siteWeb: '3423423423423',
    description: '3423423423423',
    createdAt: '2024-01-04T23:02:49.598Z',
    secVia: null,
    NitStore: '3423423423423',
    typeRegiments: '3423423423423',
    typeContribute: '3423423423423',
    addressStore: '3423423423423',
    pais: {
      __typename: 'Country',
      cId: '013e5387-34a1-6a78-303d-5098f17bf640',
      cName: 'Colombia',
      cCalCod: '57',
      cState: 1,
      cDatCre: '2024-01-04T05:50:48.854Z',
      cDatMod: '2024-01-04T05:50:48.854Z'
    },
    city: {
      __typename: 'City',
      ctId: '013e5387-34a1-6a78-303d-5098f17bf640',
      dId: '013e5387-34a1-6a78-303d-5098f17bf640',
      cName: 'Barranquilla',
      cState: 1,
      cDatCre: '2024-01-04T20:49:45.299Z',
      cDatMod: '2024-01-04T20:49:45.299Z'
    },
    department: {
      __typename: 'Department',
      dId: '013e5387-34a1-6a78-303d-5098f17bf640',
      cId: '013e5387-34a1-6a78-303d-5098f17bf640',
      dName: 'ATL',
      dState: 1,
      dDatCre: '2024-01-04T05:51:02.780Z',
      dDatMod: '2024-01-04T05:51:02.780Z'
    },
    getStoreSchedules: [
      {
        __typename: 'StoreSchedule',
        idStore: '013e5387-34a1-6a78-303d-5098f17bf640',
        schId: '013e5387-34a1-6a78-303d-5098f17bf640',
        id: '013e5387-34a1-6a78-303d-5098f17bf640',
        schDay: 4,
        schHoSta: '12:00',
        schHoEnd: '13:00',
        schState: 1
      },
      {
        __typename: 'StoreSchedule',
        idStore: '013e5387-34a1-6a78-303d-5098f17bf640',
        schId: '013e5387-34a1-6a78-303d-5098f17bf640',
        id: '013e5387-34a1-6a78-303d-5098f17bf640',
        schDay: 4,
        schHoSta: '12:00',
        schHoEnd: '13:00',
        schState: 1
      },
      {
        __typename: 'StoreSchedule',
        idStore: '013e5387-34a1-6a78-303d-5098f17bf640',
        schId: '013e5387-34a1-6a78-303d-5098f17bf640',
        id: '013e5387-34a1-6a78-303d-5098f17bf640',
        schDay: 4,
        schHoSta: '12:00',
        schHoEnd: '13:00',
        schState: 1
      },
      {
        __typename: 'StoreSchedule',
        idStore: '013e5387-34a1-6a78-303d-5098f17bf640',
        schId: '013e5387-34a1-6a78-303d-5098f17bf640',
        id: '013e5387-34a1-6a78-303d-5098f17bf640',
        schDay: 4,
        schHoSta: '12:00',
        schHoEnd: '13:00',
        schState: 1
      },
      {
        __typename: 'StoreSchedule',
        idStore: '013e5387-34a1-6a78-303d-5098f17bf640',
        schId: '013e5387-34a1-6a78-303d-5098f17bf640',
        id: '013e5387-34a1-6a78-303d-5098f17bf640',
        schDay: 4,
        schHoSta: '12:00',
        schHoEnd: '13:00',
        schState: 1
      },
      {
        __typename: 'StoreSchedule',
        idStore: '013e5387-34a1-6a78-303d-5098f17bf640',
        schId: '013e5387-34a1-6a78-303d-5098f17bf640',
        id: '013e5387-34a1-6a78-303d-5098f17bf640',
        schDay: 4,
        schHoSta: '12:00',
        schHoEnd: '13:00',
        schState: 1
      },
      {
        __typename: 'StoreSchedule',
        idStore: '013e5387-34a1-6a78-303d-5098f17bf640',
        schId: '013e5387-34a1-6a78-303d-5098f17bf640',
        id: '013e5387-34a1-6a78-303d-5098f17bf640',
        schDay: 4,
        schHoSta: '12:00',
        schHoEnd: '13:00',
        schState: 1
      }
    ],
    cateStore: {
      __typename: 'CatStore',
      catStore: '013e5387-34a1-6a78-303d-5098f17bf640',
      cName: 'Comida rapida',
      cState: null,
      cDatCre: null,
      cDatMod: null,
      csDescription: null
    }
  },
  disabledPrint: false,
  loading: false,
  openAction: false,
  pDatCre: {
    day: '29',
    fullDate: '29/02/2024',
    hourMinutes12: '10:56 a. m.',
    numberDay: 4,
    yearMonthDay: '2024-02-29',
    hourMinutes24: '10:56',
    longDayName: 'jueves',
    shortDayName: 'jue',
    month: '02',
    year: '2024'
  },
  saleGroup: false,
  saleKey: [],
  totalProductsPrice: 56.00
}

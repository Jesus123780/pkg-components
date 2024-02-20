export const mockData = {
  srcLogo: '/images/DEFAULTBANNER.png',
  addressStore: '',
  storePhone: '3423423423423',
  date: '2024-02-20 - 8:32:25 - martes',
  client: {
    clientName: '',
    clientNumber: '',
    ccClient: ''
  },
  ref: 'ShkT2cqYzL',
  products: [
    {
      pId: '22f39df1-04c4-4251-e518-b43f93fc8a2b',
      pName: 'Hamburguesa  mas papas',
      getOneTags: null,
      unitPrice: 5000,
      ProDescription: 'wedsdasdasasdasdadasd',
      ProImage: 'https:https://front-back-server.onrender.comstatic/platos/undefined',
      ProPrice: 0,
      ProQuantity: 8,
      free: true
    },
    {
      pId: '075c0df7-8ec2-2fdf-7db6-2b7b481c03bd',
      pName: 'Test con muchos sub items',
      getOneTags: null,
      unitPrice: 5000,
      ProDescription: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      ProImage: 'https:https://front-back-server.onrender.comstatic/platos/undefined',
      ProPrice: 5000,
      ProQuantity: 1
    },
    {
      pId: '486c7a48-1511-bc69-3ebf-13e8c04d2125',
      pName: 'Test con muchos sub items',
      unitPrice: 5000,
      ProDescription: '50000',
      ProImage: 'https:https://front-back-server.onrender.comstatic/platos/undefined',
      ProPrice: 10000,
      ProQuantity: 2,
      free: false,
      dataOptional: [
        {
          __typename: 'ExtProductFoodOptional',
          pId: '486c7a48-1511-bc69-3ebf-13e8c04d2125',
          opExPid: 'f4029fb3-e329-96ce-31a1-f3005a23ea20',
          OptionalProName: 'CATEGORIA',
          state: 1,
          code: 'G0iKUbpk0',
          numbersOptionalOnly: 3,
          pDatCre: '2024-02-09T08:31:17.949Z',
          required: 0,
          pDatMod: '2024-02-09T08:31:17.949Z',
          ExtProductFoodsSubOptionalAll: [
            {
              __typename: 'ExtProductFoodSubOptional',
              pId: '486c7a48-1511-bc69-3ebf-13e8c04d2125',
              opExPid: null,
              idStore: '013e5387-34a1-6a78-303d-5098f17bf640',
              opSubExPid: '44aa8ce5-e7be-bf62-cada-35b123343570',
              OptionalSubProName: 'SUB ITEM DE CATEGORIA 1',
              exCodeOptionExtra: 'G0iKUbpk0',
              exCode: 'fSfTj0uHe',
              state: 1,
              pDatCre: '2024-02-09T08:31:28.547Z',
              pDatMod: '2024-02-09T08:31:28.547Z',
              check: true
            },
            {
              __typename: 'ExtProductFoodSubOptional',
              pId: '486c7a48-1511-bc69-3ebf-13e8c04d2125',
              opExPid: null,
              idStore: '013e5387-34a1-6a78-303d-5098f17bf640',
              opSubExPid: 'fca67b88-d2d0-e7b8-c93d-0d6625f12cf0',
              OptionalSubProName: 'SUB ITEM DE CATEGORIA 2',
              exCodeOptionExtra: 'G0iKUbpk0',
              exCode: 'ZuSm9PDN7',
              state: 1,
              pDatCre: '2024-02-09T08:31:30.460Z',
              pDatMod: '2024-02-09T08:31:30.460Z',
              check: true
            }
          ]
        }
      ],
      dataExtra: [
        {
          __typename: 'ExtProductFood',
          pId: '486c7a48-1511-bc69-3ebf-13e8c04d2125',
          exPid: 'd677aae4-9d42-3274-a404-b9e3b47be8f2',
          exState: 0,
          extraName: 'PERO QUE PRECIO 1',
          extraPrice: 5000,
          state: 1,
          pDatCre: '2024-02-09T08:31:57.772Z',
          pDatMod: '2024-02-09T08:31:57.772Z',
          quantity: 7,
          newExtraPrice: 35000
        }
      ]
    }
  ],
  total: '50.000',
  change: '',
  NitStore: '3423423423423',
  storeName: 'Los Buñueleros'
}

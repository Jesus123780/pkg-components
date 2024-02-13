import { TextLineHeight, TextSize, TextWeight } from '../../../../../atoms'

interface TextProps {
  content: string;
  weight?: TextWeight;
  size?: TextSize;
  lineHeight?: TextLineHeight;
}

interface ColumnProps {
  texts: TextProps[];
}

export interface PaymentInfoProps {
  columns: ColumnProps[];
}

export const paymentInfo: PaymentInfoProps[] = [
  {
    columns: [
      {
        texts: [
          { content: 'Abono inicial' },
          { content: '$35.50', weight: 'bold', size: '5xl', lineHeight: '2xl' },
        ],
      },
      {
        texts: [
          { content: '8 cuotas de' },
          { content: '$26.41', weight: 'bold', size: '5xl', lineHeight: '2xl'  },
        ],
      },
    ],
  },
];

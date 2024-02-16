export interface ProductFood {
    __typename: string;
    pId: string;
    sizeId: string | null;
    colorId: string | null;
    cId: string | null;
    dId: string | null;
    ctId: string | null;
    fId: string | null;
    pName: string;
    getOneTags: any | null; // Reemplaza 'any' por el tipo correcto si es conocido
    ProPrice: number;
    ProDescuento: string;
    free: number;
    ProUniDisponibles: any | null; // Reemplaza 'any' por el tipo correcto si es conocido
    ProDescription: string;
    ProProtegido: any | null; // Reemplaza 'any' por el tipo correcto si es conocido
    ProAssurance: any | null; // Reemplaza 'any' por el tipo correcto si es conocido
    ValueDelivery: any | null; // Reemplaza 'any' por el tipo correcto si es conocido
    ProStar: number;
    sTateLogistic: number;
    ProImage: string;
    ProWidth: any | null; // Reemplaza 'any' por el tipo correcto si es conocido
    ProHeight: any | null; // Reemplaza 'any' por el tipo correcto si es conocido
    ProLength: string;
    ProWeight: string;
    ProQuantity: any | null; // Reemplaza 'any' por el tipo correcto si es conocido
    ProOutstanding: number;
    pDatCre: string;
    pDatMod: string;
    ProDelivery: number;
    ProVoltaje: any | null; // Reemplaza 'any' por el tipo correcto si es conocido
    pState: number;
    feat: any | null; // Reemplaza 'any' por el tipo correcto si es conocido
    area: any | null; // Reemplaza 'any' por el tipo correcto si es conocido
    comment: boolean;
    edit: boolean;
    onClick: () => void;
    render: string;
    tag: any | null; // Reemplaza 'any' por el tipo correcto si es conocido
}

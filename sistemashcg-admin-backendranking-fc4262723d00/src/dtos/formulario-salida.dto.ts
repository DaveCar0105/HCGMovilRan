export class FormularioSalidaDto {
    id: number;
    formularioNombreDesplazar: string;
    categorias: CategoryD[] = [];
}

export class CategoryD {
    categoriaId: number;
    categoriaNombre: string;
    subcategorias: SubcategoryD[] = [];
}

export class SubcategoryD {
    subcategoriaId: number;
    subcategoriaNombre: string;
    subcategoriaNombreDesplazar: string;
    respuestas: ItemD[] = [];
}

export class ItemD {
    itemId: number;
    itemNombre: string;
    itemNombreMostrar: string;
    itemsRango: RangoD[]= [];
    cantidadRespuesta: number = 0;
    totalRespuesta: number = 0;
}

export class RangoD {
    minimo: number;
    maximo: number;
    cantidadaDisminuir: number;
}



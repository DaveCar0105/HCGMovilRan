import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryD, FormularioSalidaDto, ItemD, RangoD, SubcategoryD } from "src/dtos/formulario-salida.dto";
import { FormularioAuditoriaEntity } from "src/entities/formulario-auditoria.entity";
import { FormularioItemAuditoriaEntity } from "src/entities/formulario-item-auditoria.entity";
import { Repository } from "typeorm";

@Injectable()
export class FormularioAuditoriaRepository{
    constructor(
        @InjectRepository(FormularioAuditoriaEntity)
        private readonly repository: Repository<FormularioAuditoriaEntity>,
    ){}

    async selectAllFormulario(): Promise<FormularioSalidaDto[]> {
        const formularioSalida: FormularioSalidaDto[] = [];
        const value: FormularioAuditoriaEntity[] = await this.repository.find({
            join:{
                alias: 'formulario',
                leftJoinAndSelect:{
                    formularioItems: 'formulario.formularioItems',
                    item: 'formularioItems.item',
                    itemsRango: 'item.itemsRango',
                    rango: 'itemsRango.rango',
                    subcategoria: 'item.subcategoria',
                    categoria: 'subcategoria.categoria'
                }
            }
        });
        for(const formu of value){
            const newFormulario = new FormularioSalidaDto();
            newFormulario.formularioNombreDesplazar = formu.formularioNombreDesplazar;
            newFormulario.id = formu.id;
            const categorias: CategoryD[] = [];
            for(const formuItem of formu?.formularioItems){
                const item = formuItem?.item;
                const categoriaId = item?.subcategoria?.categoria?.id;
                const indexCategoria = categorias.findIndex(a => a.categoriaId==categoriaId);
                if (indexCategoria!=-1){
                    const categoriaSelected = categorias[indexCategoria];
                    const subcategoriaId = item?.subcategoria?.id;
                    const indexSubcategoria = categoriaSelected.subcategorias.findIndex(a => a.subcategoriaId==subcategoriaId);
                    if(indexSubcategoria!=-1){
                        const newRespuesta = new ItemD();
                        newRespuesta.itemId = item?.id;
                        newRespuesta.itemNombre = item?.itemNombre;
                        newRespuesta.itemNombreMostrar = item?.itemNombre;
                        categoriaSelected.subcategorias[indexSubcategoria].respuestas.push(newRespuesta);
                    }else {
                        const newSubcategoria = new SubcategoryD();
                        newSubcategoria.subcategoriaId = item?.subcategoria?.id;
                        newSubcategoria.subcategoriaNombre = item?.subcategoria?.subcategoriaNombre;
                        newSubcategoria.subcategoriaNombreDesplazar = item?.subcategoria?.subcategoriaNombre;
                        const newRespuesta = new ItemD();
                        newRespuesta.itemId = item?.id;
                        newRespuesta.itemNombre = item?.itemNombre;
                        newRespuesta.itemNombreMostrar = item?.itemNombre;
                        newSubcategoria.respuestas.push(newRespuesta);
                        categoriaSelected.subcategorias.push(newSubcategoria);
                    }
                } else {
                    const newCategoria = new CategoryD();
                    newCategoria.categoriaId = categoriaId;
                    newCategoria.categoriaNombre = item?.subcategoria?.categoria?.categoriaNombre;
                    const newSubcategoria = new SubcategoryD();
                    newSubcategoria.subcategoriaId = item?.subcategoria?.id;
                    newSubcategoria.subcategoriaNombre = item?.subcategoria?.subcategoriaNombre;
                    newSubcategoria.subcategoriaNombreDesplazar = item?.subcategoria?.subcategoriaNombre;
                    const newRespuesta = new ItemD();
                    newRespuesta.itemId = item?.id;
                    newRespuesta.itemNombre = item?.itemNombre;
                    newRespuesta.itemNombreMostrar = item?.itemNombre;
                    newSubcategoria.respuestas.push(newRespuesta);
                    newCategoria.subcategorias.push(newSubcategoria);
                    categorias.push(newCategoria);
                }
            }
            newFormulario.categorias.push(...categorias);
            formularioSalida.push(newFormulario);
        }
        return formularioSalida;
    }

}
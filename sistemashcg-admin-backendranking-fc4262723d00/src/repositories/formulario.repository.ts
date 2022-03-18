import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppConstant } from "src/app.constant";
import { CategoryD, FormularioSalidaDto, ItemD, RangoD, SubcategoryD } from "src/dtos/formulario-salida.dto";
import { FormularioItemEntity } from "src/entities/formulario-item.entity";
import { FormularioEntity } from "src/entities/formulario.entity";
import { InsertResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class FormularioRepository{
    constructor(
        @InjectRepository(FormularioEntity)
        private readonly repository: Repository<FormularioEntity>,
        @InjectRepository(FormularioItemEntity)
        private readonly repositoryFormularioItem: Repository<FormularioItemEntity>,
    ){}

    async insert(entity: FormularioEntity): Promise<InsertResult> {
        entity.estado = AppConstant.ESTADO_ENTITY_ACTIVO;
        const newFormulario = await this.repository.insert(entity);
        if(entity.formularioItems){
            for (const itemsFormu  of entity.formularioItems){
                itemsFormu.idFormulario = newFormulario.identifiers[0].id;
                delete itemsFormu.formulario;
                delete itemsFormu.item;
                await this.repositoryFormularioItem.insert(itemsFormu);
            }
        }
        return newFormulario;
    }

    selectAll(): Promise<FormularioEntity[]> {
        return this.repository.find();
    }

    async selectAllFormulario(): Promise<FormularioSalidaDto[]> {
        const formularioSalida: FormularioSalidaDto[] = [];
        const value: FormularioEntity[] = await this.repository.find({
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
                    for(const rango  of item?.itemsRango){
                        const newRango = new RangoD();
                        newRango.minimo = rango?.rango?.minimo;
                        newRango.maximo = rango?.rango?.maximo;
                        newRango.cantidadaDisminuir = rango?.rango?.cantidadDisminuir;
                        newRespuesta.itemsRango.push(newRango);
                    }
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

    selectById(id: number): Promise<FormularioEntity | undefined> {
        return this.repository.findOne({
            where: {id},
            join: {
                alias: 'formulario',
                leftJoinAndSelect: {
                    formularioItems: 'formulario.formularioItems',
                    item: 'formularioItems.item',
                    subcategoria: 'item.subcategoria'
                }
            }
        });
    }

    updateEstadoActivo(id: number): Promise<UpdateResult> {
        const fieldEntity = {
            estado: AppConstant.ESTADO_ENTITY_ACTIVO
        };
        return this.repository.update(id, fieldEntity);
    }

    updateEstadoDesActivo(id: number): Promise<UpdateResult> {
        const fieldEntity = {
            estado: AppConstant.ESTADO_ENTITY_DESACTIVADO
        };
        return this.repository.update(id, fieldEntity);
    }


}
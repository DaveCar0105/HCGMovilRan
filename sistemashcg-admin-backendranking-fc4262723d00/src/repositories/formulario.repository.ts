import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppConstant } from "src/app.constant";
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

    selectAllFormulario(): Promise<FormularioEntity[]> {
        return this.repository.find({
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
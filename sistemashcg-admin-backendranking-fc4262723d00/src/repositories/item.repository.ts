import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppConstant } from "src/app.constant";
import { ItemEntity } from "src/entities/item.entity";
import { InsertResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class ItemRepository{
    constructor(
        @InjectRepository(ItemEntity)
        private readonly repository: Repository<ItemEntity>
    ){}

    insert(entity: ItemEntity): Promise<InsertResult> {
        entity.estado = AppConstant.ESTADO_ENTITY_ACTIVO;
        return this.repository.insert(entity);
    }

    selectAll(): Promise<ItemEntity[]> {
        return this.repository.find();
    }

    selectAllWithRango(): Promise<ItemEntity[]> {
        return this.repository.find({
            join:{
                alias: 'item',
                leftJoinAndSelect:{
                    itemsRango: 'item.itemsRango',
                    rango: 'itemsRango.rango'
                }
            }
        });
    }

    selectById(id: number): Promise<ItemEntity | undefined> {
        return this.repository.findOne({id});
    }

    update(id: number, fieldEntity: ItemEntity): Promise<UpdateResult> {
        delete fieldEntity.estado;
        delete fieldEntity.fechaHoraActualizacion;
        delete fieldEntity.fechaHoraRegistro;
        delete fieldEntity.id;
        delete fieldEntity.subcategoria;
        return this.repository.update(id, fieldEntity);
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
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppConstant } from "src/app.constant";
import { ProductoEntity } from "src/entities/producto.entity";
import { InsertResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class ProductoRepository{
    constructor(
        @InjectRepository(ProductoEntity)
        private readonly repository: Repository<ProductoEntity>
    ){}

    insert(entity: ProductoEntity): Promise<InsertResult> {
        entity.estado = AppConstant.ESTADO_ENTITY_ACTIVO;
        return this.repository.insert(entity);
    }

    selectAll(): Promise<ProductoEntity[]> {
        return this.repository.find();
    }

    selectById(id: number): Promise<ProductoEntity | undefined> {
        return this.repository.findOne({id});
    }

    update(id: number, fieldEntity: ProductoEntity): Promise<UpdateResult> {
        delete fieldEntity.estado;
        delete fieldEntity.fechaHoraActualizacion;
        delete fieldEntity.fechaHoraRegistro;
        delete fieldEntity.id;
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
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppConstant } from "src/app.constant";
import { CategoriaEntity } from "src/entities/categoria.entity";
import { InsertResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class CategoriaRepository{
    constructor(
        @InjectRepository(CategoriaEntity)
        private readonly repository: Repository<CategoriaEntity>
    ){}

    insert(entity: CategoriaEntity): Promise<InsertResult> {
        entity.estado = AppConstant.ESTADO_ENTITY_ACTIVO;
        return this.repository.insert(entity);
    }

    selectAll(): Promise<CategoriaEntity[]> {
        return this.repository.find();
    }

    selectById(id: number): Promise<CategoriaEntity | undefined> {
        return this.repository.findOne({id});
    }

    update(id: number, fieldEntity: CategoriaEntity): Promise<UpdateResult> {
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
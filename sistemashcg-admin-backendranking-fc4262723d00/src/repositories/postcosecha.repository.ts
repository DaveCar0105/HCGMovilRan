import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppConstant } from "src/app.constant";
import { PostcosechaEntity } from "src/entities/postcosecha.entity";
import { InsertResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class PostcosechaRepository{
    constructor(
        @InjectRepository(PostcosechaEntity)
        private readonly repository: Repository<PostcosechaEntity>
    ){}

    insert(entity: PostcosechaEntity): Promise<InsertResult> {
        entity.estado = AppConstant.ESTADO_ENTITY_ACTIVO;
        return this.repository.insert(entity);
    }

    selectAll(): Promise<PostcosechaEntity[]> {
        return this.repository.find();
    }

    selectById(id: number): Promise<PostcosechaEntity | undefined> {
        return this.repository.findOne({id});
    }

    update(id: number, fieldEntity: PostcosechaEntity): Promise<UpdateResult> {
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
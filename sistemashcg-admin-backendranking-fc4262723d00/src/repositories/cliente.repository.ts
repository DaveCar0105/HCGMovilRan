import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppConstant } from "src/app.constant";
import { ClienteEntity } from "src/entities/cliente.entity";
import { InsertResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class ClienteRepository{
    constructor(
        @InjectRepository(ClienteEntity)
        private readonly repository: Repository<ClienteEntity>
    ){}

    insert(entity: ClienteEntity): Promise<InsertResult> {
        entity.estado = AppConstant.ESTADO_ENTITY_ACTIVO;
        return this.repository.insert(entity);
    }

    selectAll(): Promise<ClienteEntity[]> {
        return this.repository.find();
    }

    selectById(id: number): Promise<ClienteEntity | undefined> {
        return this.repository.findOne({id});
    }

    update(id: number, fieldEntity: ClienteEntity): Promise<UpdateResult> {
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
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppConstant } from "src/app.constant";
import { UsuarioEntity } from "src/entities/usuario.entity";
import { InsertResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class UsuarioRepository{
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly repository: Repository<UsuarioEntity>
    ){}

    async insert(entity: UsuarioEntity): Promise<InsertResult> {
        const usuario = await this.selectByNick(entity.usuarioUsername);
        if (usuario) {
            throw new BadRequestException({
              mensaje: `¡El nick ${entity.usuarioUsername} ya se encuentra registrado, por favor intente con otro!`,
            });
        } else {
            entity.estado = AppConstant.ESTADO_ENTITY_ACTIVO;
            return this.repository.insert(entity);
        }
    }

    selectByNick(usuarioUsername: string): Promise<UsuarioEntity | undefined> {
        return this.repository.findOne({ usuarioUsername });
    }

    async selectAll(): Promise<UsuarioEntity[]> {
        const usuariosEntities = await  this.repository.find();
        usuariosEntities.forEach(value => delete value.usuarioPassword);
        return usuariosEntities;
    }

    async selectById(id: number): Promise<UsuarioEntity | undefined> {
        const usuariosEntities = await this.repository.findOne({id});
        if(usuariosEntities!=null)
            delete usuariosEntities.usuarioPassword;
        return usuariosEntities;
    }

    update(id: number, fieldEntity: UsuarioEntity): Promise<UpdateResult> {
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
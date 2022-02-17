import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppConstant } from "src/app.constant";
import { SubcategoriaEntity } from "src/entities/subcategoria.entity";
import { InsertResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class SubcategoriaRepository{
    constructor(
        @InjectRepository(SubcategoriaEntity)
        private readonly repository: Repository<SubcategoriaEntity>
    ){}

    insert(entity: SubcategoriaEntity): Promise<InsertResult> {
        entity.estado = AppConstant.ESTADO_ENTITY_ACTIVO;
        return this.repository.insert(entity);
    }

    selectAll(): Promise<SubcategoriaEntity[]> {
        return this.repository.find();
    }

    async selectByAllItems(): Promise<SubcategoriaEntity[]> {
        const subcategorias = await this.repository.find({
            join: {
                alias: 'subcategoria',
                leftJoinAndSelect:{
                    items: 'subcategoria.items'
                }
            }
        });
        subcategorias.forEach(a=> {
            const items = a.items.filter(b => b.estado == AppConstant.ESTADO_ENTITY_ACTIVO);
            a.items = items;
        })
        return subcategorias;
    }

    selectById(id: number): Promise<SubcategoriaEntity | undefined> {
        return this.repository.findOne({id});
    }

    update(id: number, fieldEntity: SubcategoriaEntity): Promise<UpdateResult> {
        delete fieldEntity.estado;
        delete fieldEntity.categoria;
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
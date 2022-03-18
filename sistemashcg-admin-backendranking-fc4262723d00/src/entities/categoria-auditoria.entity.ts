import { AppConstantDatabase } from "src/app.constant";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany } from "typeorm";
import { SubcategoriaAuditoriaEntity } from "./subcategoria-auditoria.entity";

@Entity('categoria_auditoria')
export class CategoriaAuditoriaEntity{
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn({
        name: 'fecha_hora_registro',
        type: 'timestamp without time zone'
    })
    fechaHoraRegistro? : Date;

    @UpdateDateColumn({
        name: 'fecha_hora_actualizacion',
        type: 'timestamp without time zone'
    })
    fechaHoraActualizacion? : Date;

    @Column({
        nullable: false,
        length: AppConstantDatabase.DB_COLUMN_TEXT_TAMANIO,
        name: 'categoria_nombre'
    })
    categoriaNombre: string;

    @Column({nullable: false, default: AppConstantDatabase.DB_COLUMN_ESTADO_DEFAULT_ACTIVO})
    estado: number;

    @OneToMany(() => SubcategoriaAuditoriaEntity, subcategoria => subcategoria.categoria)
    subcategorias?: SubcategoriaAuditoriaEntity[];
}
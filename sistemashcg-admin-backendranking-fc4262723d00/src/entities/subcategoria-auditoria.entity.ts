import { AppConstantDatabase } from "src/app.constant";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { CategoriaAuditoriaEntity } from "./categoria-auditoria.entity";
import { ItemAuditoriaEntity } from "./item-auditoria.entity";

@Entity('subcategoria_auditoria')
export class SubcategoriaAuditoriaEntity{
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
        name: 'subcategoria_nombre'
    })
    subcategoriaNombre: string;

    @Column({nullable: false, default: AppConstantDatabase.DB_COLUMN_ESTADO_DEFAULT_ACTIVO})
    estado: number;

    @Column({ name: 'id_categoria', nullable: true })
    idCategoria?: number;

    @ManyToOne(() => CategoriaAuditoriaEntity, categoria => categoria.subcategorias, { eager: true })
    @JoinColumn({ name: 'id_categoria' })
    categoria?: CategoriaAuditoriaEntity;

    @OneToMany(() => ItemAuditoriaEntity, item => item.subcategoria)
    items?: ItemAuditoriaEntity[];
}
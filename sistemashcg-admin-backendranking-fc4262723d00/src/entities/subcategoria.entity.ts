import { AppConstantDatabase } from "src/app.constant";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CategoriaEntity } from "./categoria.entity";
import { ItemEntity } from "./item.entity";

@Entity('subcategoria')
export class SubcategoriaEntity{
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

    @ManyToOne(() => CategoriaEntity, categoria => categoria.subcategorias, { eager: true })
    @JoinColumn({ name: 'id_categoria' })
    categoria?: CategoriaEntity;

    @OneToMany(() => ItemEntity, item => item.subcategoria)
    items?: ItemEntity[];
}
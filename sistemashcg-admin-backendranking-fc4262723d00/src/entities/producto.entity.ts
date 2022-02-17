import { AppConstantDatabase } from "src/app.constant";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { VariedadEntity } from "./variedad.entity";

@Entity('producto')
export class ProductoEntity{
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
        name: 'producto_nombre'
    })
    productoNombre: string;

    @Column({nullable: false, default: AppConstantDatabase.DB_COLUMN_ESTADO_DEFAULT_ACTIVO})
    estado: number;

    // ejemplo de una  amuchos un producyto tienees muchas variedades
    
    @OneToMany(() => VariedadEntity, variedad => variedad.producto)
    variedades?: VariedadEntity[];

    //////////////////77
}
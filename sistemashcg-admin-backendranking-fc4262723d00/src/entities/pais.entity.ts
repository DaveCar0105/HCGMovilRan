import { AppConstantDatabase } from "src/app.constant";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('pais')
export class PaisEntity{
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
        name: 'pais_nombre'
    })
    paisNombre: string;

    @Column({nullable: false, default: AppConstantDatabase.DB_COLUMN_ESTADO_DEFAULT_ACTIVO})
    estado: number;
}
import { AppConstantDatabase } from "src/app.constant";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { InformacionAuditoriaEntity } from "./informacion-auditoria.entity";
import { ProcesoMaltratoEntity } from "./proceso-maltrato.entity";
import { ProcesoTamanoBotonEntity } from "./proceso-tamano-boton.entity";

@Entity('usuario')
export class UsuarioEntity{
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
        name: 'usuario_nombre'
    })
    usuarioNombre: string;

    @Column({
        nullable: false,
        length: AppConstantDatabase.DB_COLUMN_TEXT_TAMANIO,
        name: 'usuario_username'
    })
    usuarioUsername: string;

    @Column({
        nullable: true,
        length: AppConstantDatabase.DB_COLUMN_TEXT_TAMANIO,
        name: 'usuario_codigo'
    })
    usuarioCodigo: string;

    @Column({
        nullable: false,
        length: AppConstantDatabase.DB_COLUMN_TEXT_TAMANIOPASSWORD,
        name: 'usuario_password'
    })
    usuarioPassword: string;

    @Column({nullable: false, default: AppConstantDatabase.DB_COLUMN_ESTADO_DEFAULT_ACTIVO})
    estado: number;

    @OneToMany(() => InformacionAuditoriaEntity, infoAuditoria => infoAuditoria.usuario)
    informacionAuditorias?: InformacionAuditoriaEntity[];

    @OneToMany(() => ProcesoTamanoBotonEntity, proTamanoBoton => proTamanoBoton.usuario)
    procesosTamanoBoton?: ProcesoTamanoBotonEntity[];

    @OneToMany(() => ProcesoMaltratoEntity, procesoMaltrato => procesoMaltrato.usuario)
    procesosMaltrato?: ProcesoMaltratoEntity[];
}
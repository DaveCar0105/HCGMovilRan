import { AppConstantDatabase } from "src/app.constant";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AuditoriaCausaEntity } from "./auditoria-causa.entity";
import { PostcosechaEntity } from "./postcosecha.entity";
import { UsuarioEntity } from "./usuario.entity";
import { VariedadEntity } from "./variedad.entity";

@Entity('proceso_maltrato')
export class ProcesoMaltratoEntity{
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
        name: 'fecha_auditoria',
        type: 'timestamp without time zone'
    })
    fechaAuditoria? : Date;

    @Column({
        name: 'tallo_muestreado_recepcion',
        nullable: true
    })
    talloMuestreadoRecepcion?: number;

    @Column({
        name: 'tallo_maltrato_recepcion',
        nullable: true
    })
    talloMaltratoRecepcion?: number;

    @Column({
        name: 'porcentaje_incidencia_recepcion', 
        type: 'double precision', 
        nullable: true
    })
    porcentajeIncidenciaRepcepcion?: number;

    @Column({
        name: 'tallo_muestreado_boncheo',
        nullable: true
    })
    talloMuestreadoBoncheo?: number;

    @Column({
        name: 'tallo_maltrato_boncheo',
        nullable: true
    })
    talloMaltratoBoncheo?: number;

    @Column({
        name: 'porcentaje_incidencia_boncheo', 
        type: 'double precision', 
        nullable: true
    })
    porcentajeIncidenciaBoncheo?: number;

    @Column({
        name: 'tallo_muestreado_cuartofrio',
        nullable: true
    })
    talloMuestreadoCuartoFrio?: number;

    @Column({
        name: 'tallo_maltrato_cuartofrio',
        nullable: true
    })
    talloMaltratoCuartoFrio?: number;

    @Column({
        name: 'porcentaje_incidencia_cuartofrio', 
        type: 'double precision', 
        nullable: true
    })
    porcentajeIncidenciaCuartoFrio?: number;

    @Column({
        name: 'tallo_muestreado_empaque',
        nullable: true
    })
    talloMuestreadoEmpaque?: number;

    @Column({
        name: 'tallo_maltrato_empaque',
        nullable: true
    })
    talloMaltratoEmpaque?: number;

    @Column({
        name: 'porcentaje_incidencia_empaque', 
        type: 'double precision', 
        nullable: true
    })
    porcentajeIncidenciaEmpaque?: number;

    @Column({ name: 'id_postcosecha', nullable: true })
    idPostcosecha?: number;

    @ManyToOne(() => PostcosechaEntity, postcosecha => postcosecha.procesosMaltrato, { eager: true })
    @JoinColumn({ name: 'id_postcosecha' })
    postcosecha?: PostcosechaEntity;

    @Column({ name: 'id_usuario', nullable: true })
    idUsuario?: number;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.procesosMaltrato, { eager: true })
    @JoinColumn({ name: 'id_usuario' })
    usuario?: UsuarioEntity;

    @Column({ name: 'id_variedad', nullable: true })
    idVariedad?: number;

    @ManyToOne(() => VariedadEntity, variedad => variedad.procesosMaltrato, { eager: true })
    @JoinColumn({ name: 'id_variedad' })
    variedad?: VariedadEntity;

}
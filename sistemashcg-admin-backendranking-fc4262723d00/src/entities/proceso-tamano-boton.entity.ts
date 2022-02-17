import { AppConstantDatabase } from "src/app.constant";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AuditoriaCausaEntity } from "./auditoria-causa.entity";
import { PostcosechaEntity } from "./postcosecha.entity";
import { UsuarioEntity } from "./usuario.entity";
import { VariedadEntity } from "./variedad.entity";

@Entity('proceso_tamanio_boton')
export class ProcesoTamanoBotonEntity{
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
        name: 'grado_variedad',
        nullable: true
    })
    gradoVariedad?: number;

    @Column({
        name: 'largo_area', 
        type: 'double precision', 
        nullable: true
    })
    largoArea?: number;

    @Column({
        name: 'ancho_area', 
        type: 'double precision', 
        nullable: true
    })
    anchoArea?: number;

    @Column({
        name: 'area_ramo', 
        type: 'double precision', 
        nullable: true
    })
    areaRamo?: number;

    @Column({
        name: 'tamano_boton_1', 
        type: 'double precision', 
        nullable: true
    })
    tamanoBoton1?: number;

    @Column({
        name: 'tamano_boton_2', 
        type: 'double precision', 
        nullable: true
    })
    tamanoBoton2?: number;

    @Column({
        name: 'tamano_boton_3', 
        type: 'double precision', 
        nullable: true
    })
    tamanoBoton3?: number;

    @Column({
        name: 'tamano_boton_promedio', 
        type: 'double precision', 
        nullable: true
    })
    tamanoBotonPromedio?: number;

    @Column({
        name: 'numero_petalos',
        nullable: true
    })
    numeroPetalos?: number;

    @Column({ name: 'id_postcosecha', nullable: true })
    idPostcosecha?: number;

    @ManyToOne(() => PostcosechaEntity, postcosecha => postcosecha.procesosTamanoBoton, { eager: true })
    @JoinColumn({ name: 'id_postcosecha' })
    postcosecha?: PostcosechaEntity;

    @Column({ name: 'id_usuario', nullable: true })
    idUsuario?: number;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.procesosTamanoBoton, { eager: true })
    @JoinColumn({ name: 'id_usuario' })
    usuario?: UsuarioEntity;

    @Column({ name: 'id_variedad', nullable: true })
    idVariedad?: number;

    @ManyToOne(() => VariedadEntity, variedad => variedad.procesosTamanoBoton, { eager: true })
    @JoinColumn({ name: 'id_variedad' })
    variedad?: VariedadEntity;

}
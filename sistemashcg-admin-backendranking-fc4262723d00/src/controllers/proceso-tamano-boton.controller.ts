import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { AppConstantController } from "src/app.constant";
import { ProcesoTamanoBotonEntity } from "src/entities/proceso-tamano-boton.entity";
import { ProcesoTamnoBotonRepository } from "src/repositories/proceso-tamano-boton.repository";

@Controller(AppConstantController.PROCESO_TAMANO_BOTON_CONTROLLER)
export class ProcesoTamanoBotonController{
    constructor(private readonly procesoTamanoBotonRepository: ProcesoTamnoBotonRepository){}

    @Post()
    create(@Body() objetoDto) {
        var newObject = new ProcesoTamanoBotonEntity;
        newObject.idUsuario = objetoDto[0]["usuarioId"];
        newObject.fechaAuditoria = objetoDto[0]["procesoTamanioBotonFecha"];
        newObject.idVariedad = objetoDto[0]["variedadId"];
        newObject.gradoVariedad = objetoDto[0]["procesoTamanioBotonGradoVariedad"];
        newObject.largoArea = objetoDto[0]["procesoTamanioBotonLargoArea"];
        newObject.anchoArea = objetoDto[0]["procesoTamanioBotonAnchoArea"];
        newObject.areaRamo = objetoDto[0]["procesoTamanioBotonAreaRamo"];
        newObject.tamanoBoton1 = objetoDto[0]["procesoTamanioBotonTamanoBoton1"];
        newObject.tamanoBoton2 = objetoDto[0]["procesoTamanioBotonTamanoBoton2"];
        newObject.tamanoBoton3 = objetoDto[0]["procesoTamanioBotonTamanoBoton3"];
        newObject.tamanoBotonPromedio = objetoDto[0]["procesoTamanioBotonTamanoBotonPromedio"];
        newObject.numeroPetalos = objetoDto[0]["procesoTamanioBotonNumeroPetalos"];
        return this.procesoTamanoBotonRepository.insert(newObject);
    }

    @Get()
    async findAll(@Res() response) {
        return response.send(await this.procesoTamanoBotonRepository.selectAll());
    }

    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this.procesoTamanoBotonRepository.selectById(id));
    }
}
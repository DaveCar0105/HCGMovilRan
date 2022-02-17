import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { AppConstantController } from "src/app.constant";
import { ProcesoTamnoBotonRepository } from "src/repositories/proceso-tamano-boton.repository";

@Controller(AppConstantController.PROCESO_TAMANO_BOTON_CONTROLLER)
export class ProcesoTamanoBotonController{
    constructor(private readonly procesoTamanoBotonRepository: ProcesoTamnoBotonRepository){}

    @Post()
    create(@Body() objetoDto) {
        return this.procesoTamanoBotonRepository.insert(objetoDto);
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
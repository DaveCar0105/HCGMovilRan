import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { AppConstantController } from "src/app.constant";
import { InformacionAuditoriaRepository } from "src/repositories/informacion-auditoria.repository";

@Controller(AppConstantController.INFORMACION_AUDITORIA_CONTROLLER)
export class InformacionAuditoriaController{
    constructor(private readonly informacionAuditoriaRepository: InformacionAuditoriaRepository){}

    @Post()
    create(@Body() objetoDto) {
        return this.informacionAuditoriaRepository.insert(objetoDto);
    }

    @Get()
    async findAll(@Res() response) {
        return response.send(await this.informacionAuditoriaRepository.selectAll());
    }

    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this.informacionAuditoriaRepository.selectById(id));
    }
}
import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { AppConstantController } from "src/app.constant";
import { VariedadRepository } from "src/repositories/variedad.repository";

@Controller(AppConstantController.VARIEDAD_CONTROLLER)
export class VariedadController{
    constructor(private readonly variedadRepository: VariedadRepository){}

    @Post()
    create(@Body() objetoDto) {
        return this.variedadRepository.insert(objetoDto);
    }

    @Get()
    async findAll(@Res() response) {
        return response.send(await this.variedadRepository.selectAll());
    }

    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this.variedadRepository.selectById(id));
    }

    @Put(':id')
    async update(@Param('id') id, @Body() objActualizar) {
        return await this.variedadRepository.update(id, objActualizar);
    }

    @Put('activar/:id')
    async updateActivar(@Param('id') id) {
        return await this.variedadRepository.updateEstadoActivo(id);
    }

    @Put('desactivar/:id')
    async updateDesactivar(@Param('id') id) {
        return await this.variedadRepository.updateEstadoDesActivo(id);
    }
}
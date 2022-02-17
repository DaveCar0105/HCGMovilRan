import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { AppConstantController } from "src/app.constant";
import { CargueraRepository } from "src/repositories/carguera.repository";

@Controller(AppConstantController.CARGUERA_CONTROLLER)
export class CargueraController{
    constructor(private readonly cargueraRepository: CargueraRepository){}

    @Post()
    create(@Body() objetoDto) {
        return this.cargueraRepository.insert(objetoDto);
    }

    @Get()
    async findAll(@Res() response) {
        return response.send(await this.cargueraRepository.selectAll());
    }

    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this.cargueraRepository.selectById(id));
    }

    @Put(':id')
    async update(@Param('id') id, @Body() objActualizar) {
        return await this.cargueraRepository.update(id, objActualizar);
    }

    @Put('activar/:id')
    async updateActivar(@Param('id') id) {
        return await this.cargueraRepository.updateEstadoActivo(id);
    }

    @Put('desactivar/:id')
    async updateDesactivar(@Param('id') id) {
        return await this.cargueraRepository.updateEstadoDesActivo(id);
    }
}
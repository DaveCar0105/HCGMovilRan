import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { AppConstantController } from "src/app.constant";
import { SubcategoriaRepository } from "src/repositories/subcategoria.repository";

@Controller(AppConstantController.SUBCATEGORIA_CONTROLLER)
export class SubcategoriaController{
    constructor(private readonly subcategoriaRepository: SubcategoriaRepository){}

    @Post()
    create(@Body() objetoDto) {
        return this.subcategoriaRepository.insert(objetoDto);
    }

    @Get()
    async findAll(@Res() response) {
        return response.send(await this.subcategoriaRepository.selectAll());
    }

    @Get('items')
    async findAllByItems(@Res() response) {
        return response.send(await this.subcategoriaRepository.selectByAllItems());
    }

    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this.subcategoriaRepository.selectById(id));
    }

    @Put(':id')
    async update(@Param('id') id, @Body() objActualizar) {
        return await this.subcategoriaRepository.update(id, objActualizar);
    }

    @Put('activar/:id')
    async updateActivar(@Param('id') id) {
        return await this.subcategoriaRepository.updateEstadoActivo(id);
    }

    @Put('desactivar/:id')
    async updateDesactivar(@Param('id') id) {
        return await this.subcategoriaRepository.updateEstadoDesActivo(id);
    }
}
import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { AppConstantController } from "src/app.constant";
import { ItemRepository } from "src/repositories/item.repository";

@Controller(AppConstantController.ITEM_CONTROLLER)
export class ItemController{
    constructor(private readonly itemRepository: ItemRepository){}

    @Post()
    create(@Body() objetoDto) {
        return this.itemRepository.insert(objetoDto);
    }

    @Get()
    async findAll(@Res() response) {
        return response.send(await this.itemRepository.selectAll());
    }

    @Get('rango')
    async findAllWithRango(@Res() response) {
        return response.send(await this.itemRepository.selectAllWithRango());
    }

    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this.itemRepository.selectById(id));
    }

    @Put(':id')
    async update(@Param('id') id, @Body() objActualizar) {
        return await this.itemRepository.update(id, objActualizar);
    }

    @Put('activar/:id')
    async updateActivar(@Param('id') id) {
        return await this.itemRepository.updateEstadoActivo(id);
    }

    @Put('desactivar/:id')
    async updateDesactivar(@Param('id') id) {
        return await this.itemRepository.updateEstadoDesActivo(id);
    }
}
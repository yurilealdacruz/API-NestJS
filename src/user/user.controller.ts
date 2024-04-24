import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto.ts";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { userService } from "./user.service";



@Controller("users")
export class userController {

    constructor(private readonly userService: userService){}

    @Get()
    async list(@Body() body) {
        return this.userService.list()
    }

    @Post()
    async create(@Body() data: CreateUserDTO) {
        return this.userService.create(data)
      }

      @Get(":id")
      async show(@Param('id', ParseIntPipe) id : number) {
          const user = await this.userService.show(id)

          if(!user) {
            throw new NotFoundException('Usuário não encontrado');
          }
          return user
      }
  

    @Put(":id")
    async update(@Body() data: UpdatePutUserDTO,@Param('id', ParseIntPipe) id: number){
        return this.userService.update(id, data)
    }

    @Patch(":id")
    async updatePartial(@Body() data : UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number) {
        return this.userService.updatePartial(id, data)
    }

    @Delete(":id")
    async delete(@Param('id', ParseIntPipe) id: number) {
        return {
            id
        }
    }
}
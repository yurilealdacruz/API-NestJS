import { Body, Controller, Delete, Get, NotFoundException, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto.ts";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { userService } from "./user.service";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";


@Controller("users")
export class userController {

    constructor(private readonly userService: userService){}

    @Roles(Role.Admin)
    @Get()
    async list(@Body() body) {
        return this.userService.list()
    }
    
    @Roles(Role.Admin)
    @Post()
    async create(@Body() data: CreateUserDTO) {
        return this.userService.create(data)
      }
      
    @Roles(Role.Admin)
      @Get(":id")
      async show(@ParamId() id : number) {
          const user = await this.userService.show(id)

          if(!user) {
            throw new NotFoundException('Usuário não encontrado');
          }
          return user
      }
  
    @Roles(Role.Admin)
    @Put(":id")
    async update(@Body() data: UpdatePutUserDTO,@ParamId() id: number){
        return this.userService.update(id, data)
    }

    @Roles(Role.Admin)
    @Patch(":id")
    async updatePartial(@Body() data : UpdatePatchUserDTO, @ParamId() id: number) {
        return this.userService.updatePartial(id, data)
    }
    
    @Roles(Role.Admin)
    @Delete(":id")
    async delete(@ParamId() id: number) {
        return this.userService.delete(id);
    }
}
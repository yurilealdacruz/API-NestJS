import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
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
      async show(@Body() body, @Param('id') id : string) {
          return this.userService.getId(Number(id))
      }
  

    @Put(":id")
    async update(@Body() {name,email,password}: UpdatePutUserDTO,@Param('id', ParseIntPipe) id: number){
        return {
            method: "put",
            name,email,password,
            id
        }
    }

    @Patch(":id")
    async updatePartial(@Body() {name,email,password} : UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number) {
        return {
            methor: "patch",
            name,email,password,
            id
        }
    }

    @Delete(":id")
    async delete(@Param('id', ParseIntPipe) id: number) {
        return {
            id
        }
    }
}
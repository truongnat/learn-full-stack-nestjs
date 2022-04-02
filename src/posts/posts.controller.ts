import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthenticationGuard } from 'src/authentication/jwt-authentication.guard';
import { FindOneParams } from 'src/utils/findOneParams';
import { RequestWithUser } from 'src/authentication/requestWithUser.interface';
import { PaginationParams } from 'src/utils/types/paginationParams';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':id')
  getPostById(@Param() { id }: FindOneParams) {
    return this.postsService.getPostById(id);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: RequestWithUser,
  ) {
    return await this.postsService.createPost(createPostDto, req.user);
  }

  @Get()
  async getPosts(
    @Query('search') search: string,
    @Query() { offset, limit }: PaginationParams,
  ) {
    if (search) {
      return this.postsService.searchForPosts(search, offset, limit);
    }
    return this.postsService.getAllPosts(offset, limit);
  }
}

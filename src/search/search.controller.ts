import { Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('api/v1/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('indexes')
  @HttpCode(200)
  async getAllIndexes() {
    return await this.searchService.getAllIndices();
  }
  @Get(':name')
  @HttpCode(200)
  async getIndex(@Param('name') name: string) {
    return await this.searchService.getIndexByName(name);
  }

  @Get('getAll/:name')
  @HttpCode(200)
  async getAll(@Param(':name') name: string) {
    return await this.searchService.getAllData(name);
  }

  @Post('match')
  @HttpCode(200)
  async mathQuery(
    @Query('query') searchQuery: string,
    @Query('field') field: string
  ) {
    return await this.searchService.matchQuery(searchQuery, field);
  }

  @Post('term')
  @HttpCode(200)
  async termQuery(
    @Query('query') searchQuery: string,
    @Query('field') field: string
  ) {
    return await this.searchService.termQuery(searchQuery, field);
  }

  @Post('bool')
  @HttpCode(200)
  async boolQuery(@Query('query') searchQuery: string) {
    // return await this.searchService.matchQuery(searchQuery);
  }

  @Post('fuzzy')
  @HttpCode(200)
  async fuzzyQuery(
    @Query('field') field: string,
    @Query('query') value: string,
    @Query('fuzziness') fuzziness: string
  ) {
    return await this.searchService.fuzzyQuery(field, value, fuzziness);
  }

  @Post('range')
  @HttpCode(200)
  async rangeQuery(
    @Query('field') field: string,
    @Query('lower') lower: string,
    @Query('upper') upper: string
  ) {
    return await this.searchService.rangeQuery(field, lower, upper);
  }

  @Post('prefix')
  @HttpCode(200)
  async prefixQuery(
    @Query('field') field: string,
    @Query('query') value: string
  ) {
    return await this.searchService.prefixQuery(field, value);
  }
}

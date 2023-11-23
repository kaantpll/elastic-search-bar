import { Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('api/v1/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('indexes')
  @HttpCode(200)
  async getAllIndexes() {
    return await this.searchService.getAllIndices();
  }
  @Get('all')
  @HttpCode(200)
  async getAll() {
    return await this.searchService.getAll();
  }
  @Get('match')
  @HttpCode(200)
  async mathQuery(@Query('query') searchQuery: string) {
    return await this.searchService.matchQuery(searchQuery);
  }

  @Get('term')
  @HttpCode(200)
  async termQuery(
    @Query('query') searchQuery: string,
    @Query('field') field: string,
  ) {
    return await this.searchService.termQuery(searchQuery, field);
  }

  @Get('bool')
  @HttpCode(200)
  async boolQuery(@Query('query') searchQuery: string) {
    return await this.searchService.matchQuery(searchQuery);
  }

  @Get('fuzzy')
  @HttpCode(200)
  async fuzzyQuery(
    @Query('field') field: string,
    @Query('value') value: string,
    @Query('fuzziness') fuzziness: string,
  ) {
    return await this.searchService.fuzzyQuery(field, value, fuzziness);
  }

  @Get('range')
  @HttpCode(200)
  async rangeQuery(
    @Query('field') field: string,
    @Query('lower') lower: string,
    @Query('upper') upper: string,
  ) {
    return await this.searchService.rangeQuery(field, lower, upper);
  }

  @Get('range')
  @HttpCode(200)
  async wildQuery(@Query('query') searchQuery: string) {
    //  return await this.searchService.wildQuery(searchQuery);
  }

  @Get('prefix')
  @HttpCode(200)
  async prefixQuery(
    @Query('field') field: string,
    @Query('value') value: string,
  ) {
    return await this.searchService.prefixQuery(field, value);
  }
}

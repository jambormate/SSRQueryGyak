import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get()
  @Render('index')
  getHome() {
    return {
      title: 'Összes kiadás összege',
      total: this.appService.getTotal()
    };
  }
  @Get('all')
  @Render('all')
  getAll() {
    return {
      title: 'Összes kiadás',
      expenses: this.appService.getAll()
    };
  }
  @Get('top3')
  @Render('all')
  getTop3() {
    return {
      title: 'Top 3 kiadás',
      expenses: this.appService.getTop3()
    };
  }
  @Get('search')
  @Render('search')
  getSearch(@Query('name') name?: string) {
    const searchTerm = name ?? '';
    return {
      title: 'Kiadás keresése',
      expenses: this.appService.search(searchTerm),
      searchTerm
    };
  }
  @Get('expensive')
  @Render('expensive')
  getExpensive(@Query('amount') amount?: string) {
    const minAmount = Number(amount);
    return {
      title: 'Drága kiadások',
      expenses: this.appService.getExpensive(minAmount),
      amount: amount ?? ''
    };
  }
  @Get('stats')
  @Render('stats')
  getStats() {
    const stats = this.appService.getStats();
    return {
      title: 'Statisztikák',
      osszesDarab: stats.count,
      osszesOsszeg: stats.total,
      osszesAtlag: stats.average,
      kategoriak: stats.categories
    };
  }
}

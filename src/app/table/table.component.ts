import {AfterViewInit, Component, computed, effect, inject, signal} from '@angular/core';
import {PeopleService} from '../_person/people.service';
import {Chart, registerables} from 'chart.js';
import {courses} from '../_person/_mapper/mapper';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit {
  readonly peopleService = inject(PeopleService);

  numPerPage = 10;

  sort = signal<string>("fullName");
  readonly sortedPeople = computed(() => {
    return this.peopleService.paginatedSortedPeopleBy(this.sort(), this.numPerPage);
  });

  paginateTo(page: number) {
    this.peopleService.pageNum.set(page);
  }

  protected readonly Math = Math;

  hslToHex(h: number, s: number, l: number) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  generateColors(n: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < n; i++) {
      let hue = Math.floor((360 / n) * i);
      colors.push(this.hslToHex(hue, 70, 50));
    }
    return colors;
  }

  constructor() {
    Chart.register(...registerables);
    effect(() => {
      this.peopleService.filteredPeople();
      if(this.courseChart) {
        const contents = this.peopleService.getPeopleBy("course");
        this.courseChart.data.labels = contents[0];
        this.courseChart.data.datasets[0].data = contents[1];
        this.courseChart.data.datasets[0].backgroundColor = this.generateColors(contents[0].length);
        this.courseChart.update();
      }
      if(this.countryChart) {
        const contents = this.peopleService.getPeopleBy("country");
        this.countryChart.data.labels = contents[0];
        this.countryChart.data.datasets[0].data = contents[1];
        this.countryChart.data.datasets[0].backgroundColor = this.generateColors(contents[0].length);
        this.countryChart.update();
      }
      if(this.genderChart) {
        const contents = this.peopleService.getPeopleBy("gender");
        this.genderChart.data.labels = contents[0];
        this.genderChart.data.datasets[0].data = contents[1];
        this.genderChart.data.datasets[0].backgroundColor = this.generateColors(contents[0].length);
        this.genderChart.update();
      }
    })
  }

  getChart(type: string) {
    const ctx = (document.getElementById(type + "-chart")! as HTMLCanvasElement).getContext('2d');
    if (!ctx) return;

    const contents = this.peopleService.getPeopleBy(type);
    return new Chart(ctx, {
      type: 'pie',
      data: {
        labels: contents[0],
        datasets: [{
          data: contents[1]
        }]
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'left',
            align: 'start'
          }
        }
      }
    });
  }

  private courseChart: Chart | null = null;
  private genderChart: Chart | null = null;
  private countryChart: Chart | null = null;

  ngAfterViewInit() {
    this.countryChart = this.getChart("country")!;
    this.genderChart = this.getChart("gender")!;
    this.courseChart = this.getChart("course")!;
  }

}

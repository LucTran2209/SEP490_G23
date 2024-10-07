import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostBinding, inject, Input, OnChanges, Renderer2, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  template: `
<span #svgContainer [style]="{margin: marginInput, padding: paddingInput}"></span>
`,
  styleUrl: './svg-icon.component.css',
  
})

export class SvgIconComponent implements OnChanges {
  @Input() src?: string;
  @Input() marginInput?: string;
  @Input() paddingInput?: string;
  @ViewChild('svgContainer', { static: true }) svgContainerRef!: ElementRef;
  @HostBinding('style.display') display = 'inline-flex';

  constructor(private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.src) return;
    this.http.get(this.src, { responseType: 'text' }).subscribe((data) => {
      const div = this.svgContainerRef.nativeElement;
      // console.log('change start', data);
      if (div) {
        div.innerHTML = data;
      }
    })
  }



}

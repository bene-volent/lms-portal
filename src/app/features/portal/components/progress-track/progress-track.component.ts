// progress-track.component.ts
import { Component, Input, AfterViewInit, OnDestroy, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-progress-track',
  templateUrl: './progress-track.component.html',
  styles: [`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    svg {
      border-radius: 8px;
    }
  `]
})
export class ProgressTrackComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() trackPath: string = 'M50,200 C100,100 200,150 250,200 S350,250 400,200 S500,100 600,150 S700,250 750,200 S650,100 600,50 S450,50 400,100 S250,150 200,100 S100,50 50,100 S150,200 50,200';
  @Input() months: number = 4;
  @Input() targetPercentage: number = 50;
  @Input() currentPercentage: number = 60;
  @Input() animationDuration: number = 3500;

  @ViewChild('progressBar') progressBar!: ElementRef<HTMLElement>;
  @ViewChild('progressPath') progressPath!: ElementRef<SVGPathElement>;
  @ViewChild('currentProgressPath') currentProgressPath!: ElementRef<SVGPathElement>;

  loading: boolean = false;
  error: boolean = false;

  private car!: SVGGElement;
  private flags: SVGGElement[] = [];
  private animationFrame: number = 0;
  private initialized: boolean = false;

  private secondProgressPathRequired = false;

  ngAfterViewInit() {
    this.initialized = true;
    this.initializeComponent();
  }

  ngOnChanges(changes: SimpleChanges) {

    if (!this.initialized) return;

    if (changes['trackPath'] || changes['flagPositions']) {
      // Cancel existing animation if running
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }

      // Remove existing car and flags
      if (this.car) {
        this.car.remove();
      }
      this.flags.forEach(flag => flag.remove());
      this.flags = [];

      // Reinitialize with new values
      this.initializeComponent();
    }
  }

  private initializeComponent() {

    this.loading = true;
    this.error = false;

    try {

      if (!this.progressBar?.nativeElement || !this.progressPath?.nativeElement || !this.currentProgressPath?.nativeElement) {
        console.log('Error: Unable to find SVG elements');
        return;
      }

      const svg = this.progressBar.nativeElement;
      const path = this.progressPath.nativeElement;

      let currentPath = this.currentProgressPath.nativeElement;
      this.car = this.createCar();
      svg.appendChild(this.car);

      // Create flags
      const flagPositions = Array.from({ length: this.months - 1 }, (_, index) => (index + 1) * (100 / (this.months )));

      this.flags = flagPositions.map((_, index) => {
        const flag = this.createFlag(index);
        svg.appendChild(flag);
        return flag;
      });

      const pathLength = path.getTotalLength();
      let progress = 0;
      const progressPathLength = path.getTotalLength();

      const currentProgressLength = (this.currentPercentage / 100) * pathLength;

      path.style.strokeDasharray = `${progressPathLength}`;
      path.style.strokeDashoffset = `${progressPathLength}`;

      if (this.secondProgressPathRequired){
      currentPath.style.strokeDasharray = `${currentProgressLength} ${pathLength}`;
      currentPath.style.strokeDashoffset = `${0}`;
      } else
      {
        currentPath.style.strokeDasharray = `0 ${pathLength}`;
        currentPath.style.strokeDashoffset = `${0}`;
      }

      // Animation parameters
      const targetLength = ((100 - this.targetPercentage) / 100) * progressPathLength;
      let currentOffset = progressPathLength;
      const frameRate = 60;
      const totalFrames = (this.animationDuration / 1000) * frameRate;
      const offsetIncrement = (progressPathLength - targetLength) / totalFrames;
      const carProgressIncrement = (this.targetPercentage / 100) / totalFrames;

      // Position flags
      flagPositions.forEach((pos, index) => {
        const point = path.getPointAtLength((pos / 100) * pathLength);
        this.flags[index].setAttribute('transform', `translate(${point.x},${point.y})`);
      });

      // Start animation
      const animate = () => {
        if (currentOffset > targetLength) {
          const point = path.getPointAtLength(progress * pathLength);

          // Calculate the angle of rotation for the car
          const tangentLength = 1;
          const nextPoint = path.getPointAtLength((progress * pathLength) + tangentLength);
          const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

          // Position and rotate the car
          this.car.setAttribute('transform', `translate(${point.x},${point.y}) rotate(${angle})`);

          progress += carProgressIncrement;
          currentOffset -= offsetIncrement;
          path.style.strokeDashoffset = `${currentOffset}`;
          this.animationFrame = requestAnimationFrame(animate);
        }
      };


      const startPoint = path.getPointAtLength(0);
      const endPoint = path.getPointAtLength(pathLength);

      // Create start and finish banners
      const startBanner = this.createBanners(startPoint.x,startPoint.y,true);
      const finishBanner = this.createBanners(endPoint.x,endPoint.y,false);

      svg.appendChild(startBanner);
      svg.appendChild(finishBanner);

      animate();
      this.loading = false;
    } catch (e) {
      console.error(e);
      this.loading = false;
      this.error = true;
    }

  }

  private createCar(): SVGGElement {
    const car = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    // Car body (main shape)
    const body = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    body.setAttribute('d', 'M-12,-8 L12,-8 L14,-4 L14,4 L12,8 L-12,8 L-14,4 L-14,-4 Z');
    body.setAttribute('fill', 'url(#carBodyGradient)');
    body.setAttribute('stroke', '#c92a2a');
    body.setAttribute('stroke-width', '1');

    // Front windshield
    const frontWindow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    frontWindow.setAttribute('d', 'M-6,-4 L6,-4 L4,0 L-4,0 Z');
    frontWindow.setAttribute('fill', 'url(#windowGradient)');

    // Back windshield
    const backWindow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    backWindow.setAttribute('d', 'M-6,4 L6,4 L4,0 L-4,0 Z');
    backWindow.setAttribute('fill', 'url(#windowGradient)');

    // Wheels
    const wheelPositions = [
      { cx: -10, cy: -6 },
      { cx: 10, cy: -6 },
      { cx: -10, cy: 6 },
      { cx: 10, cy: 6 }
    ];

    
    car.appendChild(body);
    car.appendChild(frontWindow);
    car.appendChild(backWindow);
    
    wheelPositions.forEach(pos => {
      const wheel = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      wheel.setAttribute('cx', `${pos.cx}`);
      wheel.setAttribute('cy', `${pos.cy}`);
      wheel.setAttribute('rx', '3');
      wheel.setAttribute('ry', '2');
      wheel.setAttribute('fill', '#343a40');
      car.appendChild(wheel);
    });

    const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
    
    // Set the tooltip text for the title
    title.textContent = `Current Progress: ${this.targetPercentage}%`;

    car.appendChild(title);
    return car;
  }

  private createBanners(x:number,y:number,isStart:boolean=true): SVGGElement{
    const flag = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    // Create pole
    const pole = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    pole.setAttribute('x', '-5');
    pole.setAttribute('y', '-40');
    pole.setAttribute('width', '10');
    pole.setAttribute('height', '60');
    pole.setAttribute('fill', '#666');

    // Create flag rectangle
    const flagRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    flagRect.setAttribute('x', '-20');
    flagRect.setAttribute('y', '-60');
    flagRect.setAttribute('width', '40');
    flagRect.setAttribute('height', '30');
    flagRect.setAttribute('fill', isStart ? '#51cf66' : '#f03e3e');

    // Create text
    // const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    // text.setAttribute('x', '0');
    // text.setAttribute('y', '6');
    // text.setAttribute('text-anchor', 'middle');
    // text.setAttribute('fill', 'white');
    // text.setAttribute('font-size', '12');
    // text.textContent = isStart ? 'START' : 'FINISH';
    // text.setAttribute('transform', 'rotate(90)');

    flag.appendChild(pole);
    flag.appendChild(flagRect);
    // flag.appendChild(text);
    flag.setAttribute('transform', `translate(${x},${y})`);

    return flag;
  }

  private createFlag(index: number): SVGGElement {
    const flag = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    flag.setAttribute('id', `flag${index}`);

    // Flag pole
    const pole = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    pole.setAttribute('x1', '0');
    pole.setAttribute('y1', '0');
    pole.setAttribute('x2', '0');
    pole.setAttribute('y2', '-40');
    pole.setAttribute('stroke', '#495057');
    pole.setAttribute('stroke-width', '2');

    // Flag banner
    const banner = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    banner.setAttribute('d', 'M0,-40 L20,-30 L0,-20 Z');
    banner.setAttribute('fill', 'url(#flagGradient)');
    banner.setAttribute('stroke', '#1971c2');
    banner.setAttribute('stroke-width', '1');

    // Month text
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '0');
    text.setAttribute('y', '30');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-family', 'Roboto, sans-serif');
    text.setAttribute('font-size', '16');
    text.setAttribute('font-weight', 'bold');
    text.setAttribute('fill', '#000');
    text.textContent = `Month ${index + 1}`;

    flag.appendChild(pole);
    flag.appendChild(banner);
    flag.appendChild(text);

    var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
    
    // Set the tooltip text for the title
    title.textContent = `Month ${index + 1}`;

    flag.appendChild(title);

    return flag;
  }

  ngOnDestroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}
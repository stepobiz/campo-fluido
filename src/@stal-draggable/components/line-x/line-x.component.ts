import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'line-x',
    templateUrl: 'line-x.component.html'
})

export class ConnectorLineXComponent implements OnInit {
    @Input() pointA: any;
    @Input() pointB: any;

    @Input() color: string = "black";
    @Input() thickness: number = 1;

    protected x: number;
    protected y: number;
    protected length: number;

    private timers: any[] = [];

    constructor() { }

    ngOnInit(): void {
        let positionUpdaterInterval = setInterval(() => {
            this.drawX1DLine();
        }, 1);
        this.timers.push(positionUpdaterInterval);
    }

    ngOnDestroy() {
        this.timers.forEach((t) => clearInterval(t));
    }

    private drawX1DLine() {
        if (this.pointA.x == this.pointB.x && this.pointA.y == this.pointB.y) return;

        let distance = this.pointB.x - this.pointA.x;
        this.length = Math.abs(distance);
        this.y = this.pointA.y - this.thickness + (this.thickness / 2);

        if (distance < 0) this.x = this.pointA.x - this.length;
        else this.x = this.pointA.x;
    }
}
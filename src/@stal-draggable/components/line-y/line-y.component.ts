import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'line-y',
    templateUrl: 'line-y.component.html'
})

export class ConnectorLineYComponent implements OnInit {
    @Input() pointA: any = {};
    @Input() pointB: any = {};

    @Input() color: string = "black";
    @Input() thickness: number = 1;

    protected x: number;
    protected y: number;
    protected length: number;

    private timers: any[] = [];

    constructor() { }

    ngOnInit(): void {
        let positionUpdaterInterval = setInterval(() => {
            this.drawY1DLine();
        }, 1);
        this.timers.push(positionUpdaterInterval);
    }

    ngOnDestroy() {
        this.timers.forEach((t) => clearInterval(t));
    }

    private drawY1DLine() {
        if (this.pointA.x == this.pointB.x && this.pointA.y == this.pointB.y) return;

        let distance = this.pointB.y - this.pointA.y;
        this.length = Math.abs(distance);
        this.x = this.pointA.x - (this.length / 2);

        if (distance < 0) this.y = this.pointA.y - this.length + (this.length / 2) - this.thickness + (this.thickness / 2);
        else this.y = this.pointA.y + (this.length / 2) - this.thickness + (this.thickness / 2);
    }
}
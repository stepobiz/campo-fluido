import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
	selector: 'stal-connector',
	templateUrl: 'connector.component.html'
})

export class ConnectorComponent {
	@Input() pointA: any;
	@Input() pointB: any;
	@Input() direction: string = "top";

	@Input() color: string = "black";
	@Input() thickness: number = 2;

	private oldPositions: any = {
		pointA: {},
		pointB: {},
		direction: undefined,
		thickness: undefined,
	};
    private timers: any[] = [];

    ngOnInit(): void {
        let positionUpdaterInterval = setInterval(() => {
			if(
				this.pointA.x != this.oldPositions.pointA.x ||
				this.pointA.y != this.oldPositions.pointA.y ||
				this.pointB.x != this.oldPositions.pointB.x ||
				this.pointB.y != this.oldPositions.pointB.y ||
				this.direction != this.oldPositions.direction ||
				this.thickness != this.oldPositions.thickness
			) {
				this.oldPositions.pointA = { ...this.pointA };
				this.oldPositions.pointB = { ...this.pointB };
				this.oldPositions.direction = this.direction.slice();
				this.oldPositions.thickness = (this.thickness + 1 - 1);

				this.somethingIsChanged();
			}
        }, 1);
        this.timers.push(positionUpdaterInterval);
    }

    ngOnDestroy() {
        this.timers.forEach((t) => clearInterval(t));
    }
	
	protected linesX: any[] = [];
	protected linesY: any[] = [];

	somethingIsChanged() {
		let linesX: any[] = [];
		let linesY: any[] = [];

		if (this.pointA.x == this.pointB.x && this.pointA.y == this.pointB.y) {
			return;
		}

		let type = 'tree';
		if (this.pointA.x == this.pointB.x) type = 'lineY';
		if(this.pointA.y == this.pointB.y) type = 'lineX';

		switch (type) {
			case 'tree':
				let middle;
				let midleA;
				let midleB;
				switch (this.direction) {
					case 'bottom': case 'top':
						middle = this.pointA.y + ((this.pointB.y - this.pointA.y) / 2);
						midleA = { x: this.pointA.x, y: middle };
						midleB = { x: this.pointB.x, y: middle };
						linesY.push({a: this.pointA, b: midleA, c: "blue", t: this.thickness});
						linesX.push({a: midleA, b: midleB, c: "red", t: this.thickness});
						linesY.push({a: midleB, b: this.pointB, c: "black", t: this.thickness});
						break;
					case 'right': case 'left':
						middle = this.pointA.x + ((this.pointB.x - this.pointA.x) / 2);
						midleA = { y: this.pointA.y, x: middle };
						midleB = { y: this.pointB.y, x: middle };
						linesX.push({a: this.pointA, b: midleA, c: "blue", t: this.thickness});
						linesY.push({a: midleA, b: midleB, c: "red", t: this.thickness});
						linesX.push({a: midleB, b: this.pointB, c: "black", t: this.thickness});
						break;
					default:
						break;
				}

				break;
			case 'lineX':
				linesX.push({a: this.pointA, b: this.pointB, c: this.color, t: this.thickness});
				break;
			case 'lineY':
				linesY.push({a: this.pointA, b: this.pointB, c: "red", t: this.thickness});
				break;
		}
		this.linesX = linesX;
		this.linesY = linesY;
	}
}
import { Component, OnInit } from '@angular/core';

interface PlayerI {
	number: number;
	visible: boolean;
	size?: number;
}

@Component({
	selector: 'main-view',
	templateUrl: 'main-view.component.html',
	styleUrls: [ 'main-view.component.scss' ]
})

export class MainViewComponent implements OnInit {
	constructor() { }

	visibleSetting: boolean = false;

	arenaSize: number = 1000;
	arenaVertical: boolean = false;

	playersSize: number = 100;

	ballSize: number = 70;

	openSettings() {
		this.visibleSetting = true;
	}

	closeSettings() {
		this.visibleSetting = false;
	}

	players: PlayerI[] = [
		{
			number: 1,
			visible: true,
		},{
			number: 3,
			visible: false,
		},{
			number: 4,
			visible: false,
		},{
			number: 5,
			visible: true,
		},{
			number: 6,
			visible: true,
		},{
			number: 7,
			visible: true,
		},{
			number: 9,
			visible: true,
		},{
			number: 11,
			visible: true,
		},{
			number: 13,
			visible: true,
		},{
			number: 16,
			visible: false,
		},{
			number: 17,
			visible: false,
		},{
			number: 18,
			visible: false,
		},{
			number: 20,
			visible: false,
		},{
			number: 21,
			visible: false,
		},{
			number: 22,
			visible: true,
		},{
			number: 23,
			visible: false,
		},{
			number: 24,
			visible: false,
		},{
			number: 31,
			visible: false,
		},{
			number: 55,
			visible: false,
		},{
			number: 59,
			visible: false,
		},{
			number: 68,
			visible: true,
		},{
			number: 70,
			visible: false,
		},{
			number: 77,
			visible: true,
		},{
			number: 81,
			visible: false,
		},{
			number: 95,
			visible: false,
		},{
			number: 99,
			visible: true,
		},{
			number: 100,
			visible: false,
		},{
			number: 101,
			visible: false,
		},{
			number: 102,
			visible: false,
		},
	]

	image= "assets/players/99.png";

	ngOnInit() { }
}
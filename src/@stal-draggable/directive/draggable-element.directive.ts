import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ContentChild, Directive, ElementRef, Inject, Input, OnDestroy } from '@angular/core';
import { fromEvent, Subscription, takeUntil } from 'rxjs';

@Directive({ selector: '[stalDraggable]' })
export class DraggableElementDirective implements AfterViewInit, OnDestroy {
	private readonly DEFAULT_DRAGGING_BOUNDARY_QUERY = "body";
	
	@Input() boundaryQuery = this.DEFAULT_DRAGGING_BOUNDARY_QUERY;
	@Input() initialPosition: any | undefined;
	@Input() position: any | undefined;

	draggingBoundaryElement: any; //HTMLElement | HTMLBodyElement;
	private element: HTMLElement;
	private subscriptions: Subscription[] = [];

	@ContentChild(DraggableElementDirective) handle: DraggableElementDirective;
	handleElement: HTMLElement

	constructor(
		private elementRef: ElementRef,
		@Inject(DOCUMENT) private document: any
	) { }

	ngOnInit(): void {
		this.element = this.elementRef.nativeElement as HTMLElement;
		if(this.initialPosition !== undefined) {
			this.setPosition(this.initialPosition.x, this.initialPosition.y);
		}
		this.initDrag();
	}

	ngAfterViewInit(): void {
		this.draggingBoundaryElement = (this.document as Document).querySelector(
			this.boundaryQuery
		);
		if (!this.draggingBoundaryElement) {
			throw new Error(
				"Couldn't find any element with query: " + this.boundaryQuery
			);
		} else {
			this.element = this.elementRef.nativeElement as HTMLElement;
			this.handleElement = this.handle?.elementRef?.nativeElement || this.element;
			this.element.style.cursor = "pointer";
			this.initDrag();
		}
	}

	initDrag(): void {
		// 1
		const dragStart$ = fromEvent<MouseEvent>(this.element, "mousedown");
		const dragEnd$ = fromEvent<MouseEvent>(this.document, "mouseup");
		const drag$ = fromEvent<MouseEvent>(this.document, "mousemove").pipe(
			takeUntil(dragEnd$)
		);

		// 2
		let initialX: number, initialY: number;
		let currentX = 0, currentY = 0;
		if(this.initialPosition !== undefined) {
			currentX = this.initialPosition.x;
			currentY = this.initialPosition.y;
		}

		let dragSub: Subscription;

		// 3
		const dragStartSub = dragStart$.subscribe((event: MouseEvent) => {
			initialX = event.clientX - currentX;
			initialY = event.clientY - currentY;
			this.element.classList.add('free-dragging');

			// 4
			dragSub = drag$.subscribe((event: MouseEvent) => {
				event.preventDefault();

				currentX = event.clientX - initialX;
				currentY = event.clientY - initialY;
				if(currentX < 0) currentX = 0;
				if(currentY < 0) currentY = 0;

				this.setPosition(currentX, currentY);
			});
			this.subscriptions.push(dragSub);
		});
		this.subscriptions.push(dragStartSub);

		// 5
		const dragEndSub = dragEnd$.subscribe(() => {
			initialX = currentX;
			initialY = currentY;
			this.element.classList.remove('free-dragging');
			if (dragSub) {
				dragSub.unsubscribe();
			}
		});
		this.subscriptions.push(dragEndSub);
	}

	private setPosition(x: number, y: number) {
		this.element.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
		if(this.position !== undefined) {
			this.position.x = x;
			this.position.y = y;
		}
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((s) => s?.unsubscribe());
	}
}
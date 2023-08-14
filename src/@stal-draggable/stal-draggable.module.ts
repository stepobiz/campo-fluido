import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConnectorComponent } from './components/connector/connector.component';
import { ConnectorLineXComponent } from './components/line-x/line-x.component';
import { ConnectorLineYComponent } from './components/line-y/line-y.component';
import { DraggableElementDirective } from './directive/draggable-element.directive';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DraggableElementDirective,
        ConnectorComponent,

        ConnectorLineXComponent,
        ConnectorLineYComponent,
    ],
    exports: [
        DraggableElementDirective,
        ConnectorComponent,
    ],
})
export class StalDraggableModule { }

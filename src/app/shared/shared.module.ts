import { NgModule } from "@angular/core";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HeaderComponent } from "./header/header.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    declarations: [
        BreadcrumbsComponent,
        NopagefoundComponent,
        SidebarComponent,
        HeaderComponent
    ],
    exports: [
        BreadcrumbsComponent,
        NopagefoundComponent,
        SidebarComponent,
        HeaderComponent
    ]
})
export class SharedModule{

}
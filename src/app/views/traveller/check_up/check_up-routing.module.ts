import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CheckUpComponent } from './check_up.component';

const routes: Routes = [
  {
    path: '',
    component: CheckUpComponent,
    data: {
      title: `CheckUp`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckUpRoutingModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FollowUpComponent } from './follow_up.component';

const routes: Routes = [
  {
    path: '',
    component: FollowUpComponent,
    data: {
      title: `FollowUp`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FollowUpRoutingModule {
}

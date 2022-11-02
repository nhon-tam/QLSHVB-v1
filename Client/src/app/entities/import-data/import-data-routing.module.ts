import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportDataComponent } from './import-data/import-data.component';

const routes: Routes = [
  {
    path: "",
      data: {
          title: "Import dữ liệu tài liệu"
      },
      children: [
          {
              path: 'importData',
              data: {
                  title: "Import dữ liệu tài liệu"
              },
              component: ImportDataComponent
          },
          
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportDataRoutingModule { }

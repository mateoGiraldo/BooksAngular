import { Injectable, Query, QueryList } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';

@Injectable({
  providedIn: 'root'
})
export class DataTablesOptionsService {

  public dtButtons = ['excel'];
  dtLanguage = {
    sZeroRecords: "No se encontraron registros coincidentes",
    sProcessing: "Procesando...",
    sEmptyTable: "No hay datos disponibles en la tabla",
    sInfo: "Registros ( _START_ de _END_ ) total _TOTAL_",
    sInfoEmpty: "Registros ( 0 )",
    sInfoFiltered: "(Filtrados de _MAX_)",
    sDecimal: ",",
    sLoadingRecords: "Cargando...",
    sSearch: "¿Quieres filtrar los resultados encontrados?",
    searchPlaceholder: "Ingresa el dato que deseas filtrar sobre los resultados encontrados",
    paginate: {
      sFirst: "Primero",
      sLast: "Último",
      sNext: "Siguiente",
      sPrevious: "Anterior",
    }
  }
  public dtOptions: any = {
    'iDisplayLength': 10,
    "pageLength": 10,
    'order': [],
    'columnDefs': [{
      'targets': 'no-sort',
      'orderable': false,
    }],
    language: this.dtLanguage
  }

  public dtOptionsWithExcel: any = {
    'iDisplayLength': 10,
    "pageLength": 10,
    'order': [],
    'columnDefs': [{
      'targets': 'no-sort',
      'orderable': false,
    }],
    dom: 'Bfrtip',
    buttons: ['excel'],
    language: this.dtLanguage
  }

  constructor() { }

  _renderTable = function (dtElements: QueryList<DataTableDirective>, idTable: string, data: any) {

    let promise = new Promise((resolve, reject) => {
      try {
        dtElements.forEach((dtElement: DataTableDirective, index: number) => {
          if (dtElement.dtInstance) {
            dtElement.dtInstance.then((dtInstance: any) => {
              if(dtInstance.table().node().id == idTable){
                dtInstance.destroy();
              }              
            });
          }
        });
        resolve(data);
      } catch (error) {
        reject(null);
      }      
    });

    return promise
  }

  public renderTable = this._renderTable;

}


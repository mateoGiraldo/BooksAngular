import { Injectable } from '@angular/core';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class ErrordialogService {

  constructor() { }

  public openDialog(type: string, data: string) {

    let title = '';

    if (type == "success") {
      title = "¡Éxito!"
    } else if (type == "error") {
      title = "Error!"
    } else if (type == "warning") {
      title = "Alerta!"
    } else if (type == "info") {
      title = ""
    }

    swal({
      icon: type,
      title: title,
      text: data
    });

  }

  _openConfirmDialog = function (data: string) {

    let promise = new Promise((resolve, reject) => {
      try {
        swal({
          title: 'Alerta!',
          text: data,
          icon: "warning",
          buttons: ["Cancelar", "Aceptar"],
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            resolve(true);
          } else {
            resolve(false)
          }
        });
        
      } catch (error) {
        reject(null);
      }
    });

    return promise
  }

  _openConfirmDialogWithoutCloseOnClick = function (data: string) {

    let promise = new Promise((resolve, reject) => {
      try {
        swal({
          title: 'Alerta!',
          text: data,
          icon: "warning",
          buttons: ["Cancelar", "Aceptar"],
          dangerMode: true,
          closeOnClickOutside: false
        }).then((willDelete) => {
          if (willDelete) {
            resolve(true);
          } else {
            resolve(false)
          }
        });
        
      } catch (error) {
        reject(null);
      }
    });

    return promise
  }

  public openConfirmDialog = this._openConfirmDialog;
  public openConfirmDialogWithoutCloseOnClick = this._openConfirmDialogWithoutCloseOnClick;
}

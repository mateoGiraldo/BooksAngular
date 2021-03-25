import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrordialogService } from 'src/app/services/errordialog.service';
import { Subject, Observable } from 'rxjs';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { DataTablesOptionsService } from 'src/app/services/data-tables-options.service';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})


export class LibrosComponent implements OnInit {

  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;
  dtLibrosTrigger: Subject<any> = new Subject();
  dtLibrosOptions: any = this.dataTablesOptionsService.dtOptions;
  bsOptions: any = { dateInputFormat: 'DD/MM/YYYY', maxDate: new Date() };
  Libro: any = [];

  combos: any = {
    editoriales: null,
  };

  registerForm: FormGroup;
  submittedRegisterForm: boolean = false;

  customModalTitle: string = "Nuevo Libro";
  isNewRegister: boolean = true;

  constructor(private http: ApiService,
    private formBuilder: FormBuilder, private dialogService: ErrordialogService,
    private localeService: BsLocaleService, private dataTablesOptionsService: DataTablesOptionsService,
    private modalService: BsModalService) {
    this.localeService.use('es');
  }


  @ViewChild('LibrosModal', { static: false }) LibrosModal: ModalDirective;



  fillCombos() {

    this.http.HttpGet(`api/Editoriales/EditorialesDropDown`).subscribe(res => {

      this.combos.editoriales = res;

    });
  }

  ngOnInit() {
    this.initForms();
    this.fillCombos();
    this.getLibros();
  }

  getLibros() {


    // Libros

    this.http.HttpGet(`api/Libros`).subscribe(res => {
      this.Libro = res;
      this.dataTablesOptionsService.renderTable(this.dtElements, 'tblLibros', res).then(res => {
        // this.Libro = res;
        setTimeout(() => {
          this.dtLibrosTrigger.next();
        }, 800);
      });
    });
  }




  get f() { return this.registerForm.controls; }
  initForms() {
    this.registerForm = this.formBuilder.group({
      id: [0],
      titulo: ['', Validators.required],
      editorialId: ['', Validators.required],
      autor: [''],
      costo: [0, Validators.required],
      precioSugerido: [0, Validators.required],
      fecha: [new Date()],

    });
  }

  clearForm() {
    this.registerForm.reset();
    this.initForms();
    this.submittedRegisterForm = false;
    this.LibrosModal.hide();
    this.getLibros();
  }


  onSubmitModal() {
    this.submittedRegisterForm = true;

    if (this.registerForm.invalid) {
      this.dialogService.openDialog('warning', 'Debes diligenciar los campos obligatiorios');
      return;

    } else {

      let data = this.registerForm.value;

      //nuevo
      if(this.isNewRegister){
        this.http.HttpPost(`api/Libros`, data).subscribe(res => {
          if (res) {
            this.dialogService.openDialog('success', 'Guardado con éxito');
            this.clearForm();
          }
          else {
            this.dialogService.openDialog('error', 'No se pudo guardar el registro.');
          }
        });
      }
      else{
        this.http.HttpPut(`api/Libros/${data.id}`, data).subscribe(res => {
          if (res) {
            this.dialogService.openDialog('success', 'Guardado con éxito');
            this.clearForm();
          }
          else {
            this.dialogService.openDialog('error', 'No se pudo guardar el registro.');
          }
        });
      }

    }
  }

  editarLibro(id) {
    this.customModalTitle = 'Editar libro';
    this.isNewRegister = false;


    this.http.HttpGet(`api/Libros/${id}`).subscribe(res => {

      this.registerForm.patchValue({
        id: (res['id']),
        titulo: (res['titulo']).toString(),
        autor: (res['autor']).toString(),
        costo: (res['costo'] ? (res['costo']) : ''),
        precioSugerido: (res['precioSugerido'] ? (res['precioSugerido']) : ''),
        fecha: (res['fecha'] ? (new Date(res['fecha'])) : new Date()),
        editorialId: (res['editorialId'] ? (res['editorialId']) : '0'),

      });

      this.LibrosModal.show();
    });
  }

  eliminarLibro(id){

    this.dialogService.openConfirmDialog('¿Estás seguro que deseas eliminar este libro?').then(resUser => {

      if(resUser){
        this.http.HttpDelete(`api/Libros/${id}`).subscribe(res =>{
          if(res){
            this.dialogService.openDialog('success', 'Eliminado con éxito');
          }
          else {
            this.dialogService.openDialog('error', 'No se pudo eliminar el registro.');
          }
          this.getLibros();
        })
      }


    });


  }


}

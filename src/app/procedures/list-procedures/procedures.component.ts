import { Component, OnInit } from '@angular/core';
import { ProcedureService } from '../../_services/procedure.service';

@Component({
  selector: 'app-proceduresList',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.css']
})
export class ProceduresComponent implements OnInit {
  procedures: any[] = [];
  error: string | null = null;

  constructor(private procedureService: ProcedureService) { }

  ngOnInit(): void {
    this.loadProcedures();
  }

  loadProcedures(): void {
    this.procedureService.getAllProcedures().subscribe({
      next: (data) => {
        this.procedures = data;
      },
      error: (err) => {
        this.error = 'Error loading procedures';
        console.error(err);
      }
    });
  }

 
}

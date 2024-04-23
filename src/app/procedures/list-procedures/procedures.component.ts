import { Component, OnInit } from '@angular/core';
import { ProcedureService } from '../../_services/procedure.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-procedures-list',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.css']
})
export class ProceduresComponent implements OnInit {
  procedures: any[] = [];
  filteredProcedures: any[] = [];
  searchTerm: string = '';
  error: string | null = null;

  constructor(private procedureService: ProcedureService, private router: Router) { }

  ngOnInit(): void {
    this.loadProcedures();
  }

  loadProcedures(): void {
    this.procedureService.getAllProcedures().subscribe({
      next: (data) => {
        this.procedures = data;
        this.filterProcedures();
      },
      error: (err) => {
        this.error = 'Error loading procedures';
        console.error(err);
      }
    });
  }

  filterProcedures(): void {
    this.filteredProcedures = this.procedures.filter(proc =>
      (proc.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
       proc.description?.toLowerCase().includes(this.searchTerm.toLowerCase()))
     
    );
  }

  handleRowClick(procedure: any): void {
    this.router.navigate([`/showprocedure/${procedure._id}`], { state: { procedure } });
  }

  onSearchTermChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filterProcedures();
  }
}

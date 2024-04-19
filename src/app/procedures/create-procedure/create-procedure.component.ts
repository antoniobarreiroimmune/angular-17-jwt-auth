import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProcedureService } from '../../_services/procedure.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-procedure',
  templateUrl: './create-procedure.component.html',
  styleUrls: ['./create-procedure.component.css']
})
export class CreateProcedureComponent {
  procedureForm: FormGroup;
 
  judicialBodyOptions = [
    { value: 'Instrucción N.1 A Coruña', viewValue: 'Instrucción N.1 A Coruña' },
    { value: 'Instrucción N.2 A Coruña', viewValue: 'Instrucción N.2 A Coruña' },
  ];

  constructor(
    private fb: FormBuilder,
    private procedureService: ProcedureService,
    private router: Router
  ) {
    this.procedureForm = this.fb.group({
      name: [''],
      firstName: [''],
      lastName: [''],
      dni: [''],
      location: [''],  
      address: [''],
      observations: [''],
      isGenderViolence: [false],
      isDomesticViolence: [false],
      judicialBody: [''],
      procedureReport: [''],
    });
  }

  onSubmit() {
    this.procedureService.createProcedure(this.procedureForm.value).subscribe({
      next: () => this.router.navigate(['/procedures']),
      error: error => console.error('Error creating procedure:', error)
    });
  }

  getDeviceLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        
        const coords = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
        
        this.procedureForm.get('location')?.setValue(coords);
      },
      (error) => {
        console.error('Error getting location', error);
      }
    );
  }
}

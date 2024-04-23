import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProcedureService } from '../../_services/procedure.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-create-procedure',
  templateUrl: './create-procedure.component.html',
  styleUrls: ['./create-procedure.component.css']
})
export class CreateProcedureComponent implements OnInit {
  procedureForm: FormGroup;
  judicialBodyOptions = [
    { value: 'Instrucción N.1 A Coruña', viewValue: 'Instrucción N.1 A Coruña' },
    { value: 'Instrucción N.2 A Coruña', viewValue: 'Instrucción N.2 A Coruña' },
  ];
  userData: any;

  constructor(
    private fb: FormBuilder,
    private procedureService: ProcedureService,
    private authService: AuthService,
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
      procedureReport: ['']
    });
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe({
      next: (user) => {
        this.userData = user;
        console.log('UserData from server:', this.userData);
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
  }

  onSubmit() {
    if (this.procedureForm.valid) {
      const { _id: guardId, name, firstName, lastName, email, role } = this.userData || {};
      const guardInfo = { guardId, name, firstName, lastName, email, role };

      const completeProcedureData = {
        ...this.procedureForm.value,
        guardInfo
      };

      this.procedureService.createProcedure(completeProcedureData).subscribe({
        next: () => {
          console.log('Procedure created successfully');
          this.router.navigate(['/procedures']);
        },
        error: (error) => {
          console.error('Error creating procedure:', error);
        }
      });
    } else {
      console.log('Invalid form data');
    }
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

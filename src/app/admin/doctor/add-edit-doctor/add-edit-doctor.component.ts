import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Doctor } from 'src/app/interface/doctor';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-add-edit-doctor',
  templateUrl: './add-edit-doctor.component.html',
  styleUrls: ['./add-edit-doctor.component.css'],
})
export class AddEditDoctorComponent implements OnInit {
  doctorForm: FormGroup;
  doctorData:Doctor
  id=0
  constructor(private doctorService: DoctorService,private messageService:MessageService,private rout:Router,private router:ActivatedRoute) {}

  ngOnInit(): void {

    this.id = this.router.snapshot.params.userId;

    console.log("Id"+this.id);

    this.doctorService.getDoctorById(this.id).then(res => {
      this.doctorData = res.data

      // console.log("ss"+res.data);

      this.doctorForm = new FormGroup({
        userId: new FormControl(this.doctorData.userId, Validators.required),
        firstName: new FormControl(this.doctorData.firstName, Validators.required),
        lastName: new FormControl(this.doctorData.lastName, Validators.required),
        email: new FormControl(this.doctorData.email, Validators.required),
        password: new FormControl(this.doctorData.password, Validators.required),
        gender: new FormControl(this.doctorData.gender, Validators.required),
        qualification: new FormControl(this.doctorData.qualification, Validators.required),
        about: new FormControl(this.doctorData.about, Validators.required),
        specialization: new FormControl(this.doctorData.specialization, Validators.required),
        experience_in_year: new FormControl(this.doctorData.experience_in_year, Validators.required),
        registrationNo: new FormControl(this.doctorData.registrationNo, Validators.required),
      });

    })

    this.doctorForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      qualification: new FormControl('', Validators.required),
      about: new FormControl('', Validators.required),
      specialization: new FormControl('', Validators.required),
      experience_in_year: new FormControl('', Validators.required),
      registrationNo: new FormControl('', Validators.required),
    });
  }

  submit() {
    if (this.doctorForm.valid) {
      this.doctorService.addDoctor(this.doctorForm.value).subscribe(res => {
        // if (res.status != 200) {
          this.messageService.add({severity:'success', summary: 'Success', detail:'Successfully Signup!!'});
          console.log(res.data);
          this.rout.navigateByUrl('dashboard/doctor');
        // }
        // else{
          // console.log(res);
          // this.messageService.add({severity:'warn', summary: 'Warn', detail: 'You have already registered!!'});
        // }
      });
    }
    else{
      this.messageService.add({severity:'info', summary: 'Info', detail: 'Please Enter All Fields!!'});
    }
  }
}

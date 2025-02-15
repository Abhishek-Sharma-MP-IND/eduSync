// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-dashbaord',
//   templateUrl: './dashbaord.component.html',
//   styleUrls: ['./dashbaord.component.scss']
// })
// export class DashbaordComponent {

// }


// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import { HttpService } from '../../services/http.service';


// @Component({
//     selector: 'app-dashbaord',
//     templateUrl: './dashbaord.component.html',
//     styleUrls: ['./dashbaord.component.scss']
// })
// export class DashboardComponent implements OnInit {
//   itemForm!: FormGroup;
//   events: any[] = [];
//   isUser: boolean = false;
//   isAdmin: boolean = false;
//   showMessage: boolean = false;
//   responseMessage: string = '';

//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private httpService: HttpService,
//     private authService: AuthService
//   ) {
//     this.itemForm = this.fb.group({
//       eventId: ['', [Validators.required]],
//       studentId: ['', [Validators.required]]
//     });
//   }

//   ngOnInit(): void {
//     this.checkUserRole();
//     this.fetchEvents();
//   }

//   checkUserRole(): void {
//     // Placeholder for checking user role, replace with actual logic
//     const role = this.authService.getRole; // Assumed method to get user role
//     if (role === 'user') {
//       this.isUser = true;
//     } else if (role === 'admin') {
//       this.isAdmin = true;
//     }
//   }

//   onSubmit(): void {
//     if (this.itemForm.valid) {
//       this.httpService.createEvent(this.itemForm.value).subscribe(
//         response => {
//           this.showMessage = true;
//           this.responseMessage = 'Event created successfully!';
//           this.fetchEvents();
//           this.itemForm.reset();
//         },
//         error => {
//           console.error('Error saving event', error);
//           this.showMessage = true;
//           this.responseMessage = 'Error saving event';
//         }
//       );
//     } else {
//       this.showMessage = true;
//       this.responseMessage = 'Please fill in all required fields.';
//     }
//   }

//   fetchEvents(): void {
//     this.httpService.GetAllevents().subscribe(
//       response => {
//         this.events = response;
//       },
//       error => {
//         console.error('Error fetching events', error);
//       }
//     );
//   }

//   onUpdate(event: any): void {
//     if (this.itemForm.valid) {
//       this.httpService.updateEvent(this.itemForm.value, event.id).subscribe(
//         (response) => {
//           this.showMessage = true;
//           this.responseMessage = 'Event updated successfully!';
//           this.fetchEvents();
//           this.itemForm.reset();
//         },
//         (error) => {
//           console.error('Error updating event', error);
//           this.showMessage = true;
//           this.responseMessage = 'Error updating event';
//         }
//       );
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashboardComponent implements OnInit {
  itemForm!: FormGroup;
  events: any[] = [];


  educatorEvents: any[] = [];
  eventStatus: any[] = [];
  role: string = '';
  showMessage: boolean = false;
  responseMessage: string = '';

  allocatedResources: any[] = [];

  resources: any[] = [];
 
  eventId: any;
  studentId: string = '';
  searchStudentId: string = '';
  username:any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private authService: AuthService
  ) {

this.itemForm = this.fb.group({

      eventId: ['', [Validators.required]],
      studentId: ['', [Validators.required]]
    });
  }

 
  ngOnInit(): void {
    this.getUserRole();
    this.username =this.authService.getUsername();
    this.fetchEvents();
    
    if(this.role === 'institution'){
      this.fetchAllocatedResources(3);
      this.fetchResources();
    }
  }
 
  getUserRole(): void {
    this.role = this.authService.getRole(); // Fetch user role
  }
 
  // registerEvent(): void {
  //   if (this.eventId && this.studentId) {
  //     this.httpService.registerForEvent({ eventId: this.eventId, studentId: this.studentId }).subscribe(
  //       () => {
  //         this.showMessage = true;
  //         this.responseMessage = 'Registration successful!';
  //         this.eventId = '';
  //         this.studentId = '';
  //       },
  //       () => {
  //         this.showMessage = true;
  //         this.responseMessage = 'Error registering for event';
  //       }
  //     );
  //   }
  // }

  registerEvent(): void {
    if (this.eventId && this.studentId) {
      const details = { studentId: this.studentId }; // Only send studentId in body
      this.httpService.registerForEvent(this.eventId, details).subscribe(
        () => {
          this.showMessage = true;
          this.responseMessage = 'Registration successful!';
          this.eventId = '';
          this.studentId = '';
        },
        () => {
          this.showMessage = true;
          this.responseMessage = 'Error registering for event';
        }
      );
    } else {
      this.showMessage = true;

      this.responseMessage = 'Please enter both Event ID and Student ID.';
    }
  }
 
  searchEventStatus(event:any): void {
    const eventId=event.target.value.toLowerCase().trim();
    if (!eventId) {
      console.log(eventId)
      this.fetchAllocatedResources(eventId)
      this.showMessage = true;
      this.responseMessage = 'Please enter a Event ID.';
      return;
    }
    
   
    // this.httpService.getBookingDetails(eventId).subscribe(
    //   (response) => {
    //     this.eventStatus = response; // Store the retrieved event status
    //     this.showMessage = false; // Hide any previous error message
    //   },
    //   (error) => {
    //     console.error('Error fetching event status', error);
    //     this.showMessage = true;
    //     this.responseMessage = 'Error fetching event registration status.';
    //   }
    // );
  }
 
  fetchEvents(): void {
    if(this.role === 'institution'){

      this.httpService.GetAllevents().subscribe(
        (response) => {
          this.events = response;
        },
        () => {
          this.events = [];
        }
      );
    }else if(this.role === 'educator'){
      this.httpService.getAllEventAgenda().subscribe(
        (response) => {
          this.educatorEvents = response;
        },
        () => {
          this.events = [];
        }
      );
    }
  }


  fetchResources(): void {

    this.httpService.GetAllResources().subscribe(
      (response) => {
        this.resources = response;
      },
      (error) => {
        console.error('Error fetching resources', error);
      }
    );
  }

  fetchAllocatedResources(eventId: any): void 
  {
    // this.eventId=event.id;
    this.httpService.GetAllocatedResources(eventId).subscribe(
      (response) => {
        this.allocatedResources = response;
        console.log(this.allocatedResources);
      },
      (error) => {
        console.error('Error fetching allocated resources', error);
      }
    );
  }
 
  onUpdate(event: any): void {
    const updatedDetails = {
  name: event.name,
      description: event.description,
      material: event.material,
    }; // Add relevant fields to update
   
  this.httpService.updateEvent(updatedDetails, event.id).subscribe(
      (response) => {
        this.showMessage = true;
        this.responseMessage = 'Event updated successfully!';
        this.fetchEvents();
      },
      (error) => {
        console.error('Error updating event', error);
        this.showMessage = true;
        this.responseMessage = 'Error updating event';
      }
    );
  }
  onLogout(){
    this.authService.logout();
    // this.route.navigateByUrl('/login');
    window.location.reload();
  }
 
}
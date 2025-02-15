
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {

  itemForm!: FormGroup;
  showError!: boolean;
  errorMessage: any;
  resourceList: any;
  assignModel: any;
  showMessage: any;
  responseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      resourceType: ['', [Validators.required]],
      availability: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      this.httpService.addResource(this.itemForm.value).subscribe(
        (response) => {
          this.showMessage = true;
          this.responseMessage = 'Resource added successfully';
          setTimeout(() => {
            this.router.navigateByUrl('/dashboard');
          }, 2000);
        },
        (error) => {
          this.showError = true;
          this.errorMessage = 'An error occurred while adding the resource';
        }
      );
    } else {
      this.showError = true;
      this.errorMessage = 'Please fill in all required fields';
    }
  }

  getResources(): void {
    this.httpService.GetAllResources().subscribe(
      (resources) => {
        this.resourceList = resources;
      },
      (error) => {
        this.showError = true;
        this.errorMessage = 'An error occurred while fetching the resources';
      }
    );
  }
}

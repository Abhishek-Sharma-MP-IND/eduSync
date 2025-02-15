import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

teamMembers = [
  { name: 'Abhishek S', role: 'Team Leader', logo: 'assets/team/abhishek.png' },
  { name: 'Ramya A', role: 'Contributor', logo: 'assets/team/ramya.png' },
  { name: 'Aviral V', role: 'Contributor', logo: 'assets/team/aviral.png' },
  { name: 'Shravani G', role: 'Contributor', logo: 'assets/team/shravani.png' },
  { name: 'Shivraj S', role: 'Contributor', logo: 'assets/team/shivraj.png' }

];

scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


}

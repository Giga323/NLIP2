import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api/api.service';
import { Subscription } from 'rxjs';
import { LanguageProbability } from './interfaces/languageProbabilityInterface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '2lab-front';
  
  isMenuOpen: boolean = false
  methods: string[] = ['alphabetMethod', 'shortWordsMethod', 'neurolink']
  chosenMethod: string = ''
  language!: LanguageProbability 
  selectedFile!: File
  isFileContentOpen: boolean = false

  constructor(
    private apiService: ApiService
  ) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }

  chooseMethod(method: string) {
    this.chosenMethod = method
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  recognizeLanguage() {
    this.apiService.postFile(this.chosenMethod, this.selectedFile).subscribe((response: LanguageProbability) => {
      this.language = response
      console.log(this.language)
    })
  }

  toggleFileContent() {
    this.isFileContentOpen = !this.isFileContentOpen
  }

}

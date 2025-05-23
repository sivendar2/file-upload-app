import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // Important for standalone components to use *ngIf

@Component({
  selector: 'app-file-upload',
  standalone: true, // Mark this component as standalone
  imports: [CommonModule], // Import CommonModule to use *ngIf, etc.
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  uploadProgress: number = 0;
  uploadSuccess: boolean = false;
  uploadError: string | null = null;

  // IMPORTANT: Replace this with your actual Spring Boot API endpoint for file uploads
  private uploadUrl = 'http://localhost:8080/api/upload'; // Example: Your Spring Boot app might be on port 8080

  constructor(private http: HttpClient) { } // Inject HttpClient

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.resetUploadStatus();
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.uploadSuccess = false;
      this.uploadError = null;
      this.uploadProgress = 0;

      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.http.post(this.uploadUrl, formData, {
        reportProgress: true,
        observe: 'events'
      }).pipe(
        finalize(() => {
          this.selectedFile = null;
        })
      )
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / (event.total || 1)));
        } else if (event.type === HttpEventType.Response) {
          if (event.status === 200) {
            this.uploadSuccess = true;
            console.log('File uploaded successfully!', event.body);
          } else {
            this.uploadError = `Server responded with status: ${event.status}`;
            console.error('File upload failed:', event.body);
          }
        }
      }, error => {
        this.uploadError = `Could not upload file: ${error.message || 'Unknown error'}`;
        console.error('Upload error:', error);
      });
    }
  }

  private resetUploadStatus(): void {
    this.uploadSuccess = false;
    this.uploadError = null;
    this.uploadProgress = 0;
  }
}
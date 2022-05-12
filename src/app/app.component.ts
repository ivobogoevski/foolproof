import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFile } from 'src/shared/models/file.model';
import { ITypes } from 'src/shared/models/type.model';
import { FilesService } from 'src/shared/services/files/files.service';
import { TypesService } from 'src/shared/services/types/types.service';
import { UsersService } from 'src/shared/services/users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  files: IFile[] = [];
  filteredFiles: IFile[] = [];
  isLoading = true;
  errorOccurred = false;
  search = '';

  constructor(
    private fileService: FilesService,
    private typeService: TypesService,
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    combineLatest([this.fileService.getFiles(), this.userService.getUsers(), this.typeService.getTypes()]).pipe(
      map(response => {
        response[0].map(file => {
          const createdBy = response[1].find(user => user.id === file.createdBy);
          const modifiedBy = response[1].find(user => user.id === file.modifiedBy);
          file.createdByUserName = `${createdBy?.givenName} ${createdBy?.familyName}`;
          file.modifiedByUserName = `${modifiedBy?.givenName} ${modifiedBy?.familyName}`;
          file.typeColor = response[2].find(type => type.id === file.type)?.colourId;
          return file;
        });
        return response;
      })
    ).subscribe(
      res => {
        this.files = res[0];
        this.filteredFiles = res[0];
        this.isLoading = false;
      },
      error => {
        this.errorOccurred = true;
        this.isLoading = false;
      }
    );
  }

  searchFiles(term: string): void {
    this.filteredFiles = this.files.filter(file => file.title.toLowerCase().includes(term.toLowerCase()));
  }
}

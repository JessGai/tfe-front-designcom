import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParentWithChildren } from '../../models/parent_model';

@Injectable({
  providedIn: 'root',
})
export class ParentService {
  readonly http = inject(HttpClient);
  readonly API_BASE_URL = 'http://localhost:8081/api/parent';
  readonly API_BASE_URL_PARENTENFANT = 'http://localhost:8081/api/parent/me';

  getParentWithChildren(): Observable<ParentWithChildren> {
    return this.http.get<ParentWithChildren>(this.API_BASE_URL_PARENTENFANT);
  }
}

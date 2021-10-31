import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
<% if (transform) { %>
import { <%= classify(name) %>, ServerResponse } from './<%= dasherize(name) %>.model';
<% } else { %>
import { <%= classify(name) %> } from './<%= dasherize(name) %>.model';
<% } %>

const API_URL = '/api/<%= dasherize(name) %>';

@Injectable({
	providedIn: 'root'
})
export class <%= classify(name) %>DataService {
	
	constructor(
		private readonly httpClient: HttpClient
	) { }
		
	public getAll(): Observable<<%= classify(name) %>[]> {
		<% if (transform) { %>
		return this.httpClient.get<ServerResponse<<%= classify(name) %>>[]>(API_URL).pipe(
			map(this.transformResponse),
			catchError(() => of([]))
		);
		<% } else { %> 
		return this.httpClient.get<<%= classify(name) %>[]>(API_URL).pipe(
			catchError(() => of([]))
		);
		<% } %> 
	}
				
	public getOne(id: string): Observable<<%= classify(name) %>> {
		return this.httpClient.get<<%= classify(name) %>[]>(`${API_URL}/${id}`).pipe(
			catchError(() => of(null))
		);
	}
					
	public createOne(<%= camelize(name) %>: <%= classify(name) %>): Observable<string> {
		return this.httpClient.post<string>(API_URL, <%= camelize(name) %>).pipe(
			catchError(() => of(''))
		);
	}
						
	public updateOne(<%= camelize(name) %>: <%= classify(name) %>): Observable<string> {
		return this.httpClient.put<string>(API_URL, <%= camelize(name) %>).pipe(
			catchError(() => of(''))
		);
	}
							
	public deleteOne(id: string): Observable<string> {
		return this.httpClient.delete<string>(`${API_URL}/${id}`).pipe(
			catchError(() => of(''))
		);
	}

	<% if (transform) { %>
	private transformResponse(response: ServerResponse<T>): T {
		return response.data;
	}
	<% } %>
}
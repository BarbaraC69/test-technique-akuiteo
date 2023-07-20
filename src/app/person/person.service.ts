import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { GenerationConfig } from "./generation-config";
import { Person } from "./person";

@Injectable({
	providedIn: "root"
})
export class PersonService {

	constructor(private http: HttpClient) {
	}

	getPersons(config: GenerationConfig): Observable<Person[]> {
		
		return this.http.get<Person[]>("/assets/data/persons.json").pipe(
			map((persons: Person[]) => {
			  // Filtrer par genre
			  
			  if (config.female == false) {
				persons = persons.filter(person => person.gender === "Male");
			  } else if (config.male == false) {
				persons = persons.filter(person => person.gender === "Female");
			  } else if (!config.male && !config.female) {
				// Si les deux booléens sont à false, ne retourne aucune personne
				persons = [];
			  }

	  
			  // Limiter le nombre de personnes
			  if (config.count && config.count <= persons.length) {
				persons = persons.slice(0, config.count);
			  }
	  
			  return persons;
			})
		  );
	}
}

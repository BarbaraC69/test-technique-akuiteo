import { Component, OnInit } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { GenerationConfig } from "../generation-config";
import { Person } from "../person";
import { PersonService } from "../person.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
	selector: "app-person-list",
	templateUrl: "./person-list.component.html",
	styleUrls: ["./person-list.component.scss"]
})
export class PersonListComponent {

	displayedColumns: string[] = ["id", "firstName", "lastName", "gender", "email"];
	dataSource: Observable<Person[]> = EMPTY;
	genderTranslations: { [key: string]: string } = {};

	constructor(private personService: PersonService,
		private translate: TranslateService ) {
			this.translate.setDefaultLang('fr');
			this.getTranslations();	  
	}

	generate(config: GenerationConfig) {
		this.dataSource = this.personService.getPersons(config);
	}

	getTranslations() {
		this.translate
		  .get(['GENDER.Male', 'GENDER.Female'])
		  .subscribe((translations) => {
			this.translate.set('GENDER.Male', translations['GENDER.Male']);
			this.translate.set('GENDER.Female', translations['GENDER.Female']);
		  });
	  }
	
	  getGenderTranslation(gender: string): Observable<string> {
		return this.translate.get(`GENDER.${gender}`);
	  }


}

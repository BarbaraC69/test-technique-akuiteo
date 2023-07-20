import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GenerationConfig } from "../generation-config";

@Component({
	selector: "app-person-generator",
	templateUrl: "./person-generator.component.html",
	styleUrls: ["./person-generator.component.scss"]
})
export class PersonGeneratorComponent implements OnInit {

	generator: FormGroup;

	@Output()
	private generateRequest = new EventEmitter<GenerationConfig>();

	constructor(private formBuilder: FormBuilder) {
	}

	ngOnInit() {
		this.generator = this.formBuilder.group({
			count: [1000, [Validators.min(0), Validators.max(1000)]],
			male: [true],
			female: [true],
		}, {
			validators: this.requireOne
		});
	}

	generate() {
		const value: GenerationConfig = this.generator.value;
		
		if (this.generator.valid)
		
			this.generateRequest.emit(value);
	}

	requireOne(formGroup : FormGroup) {
		const male = formGroup.get('male').value;
		const female = formGroup.get('female').value;
		if (male || female) {
		  return null;
		} else {
		  return { requireOne: true };
		}
	  }

	  limitNumberInput(){
		const countFormControl = this.generator.get('count');

	   let enteredValue = countFormControl.value;

		if (enteredValue < 0) {
			countFormControl.setValue(Math.min(0), { emitEvent: false });
		}

		if (enteredValue > 100) {
		countFormControl.setValue(Math.trunc(enteredValue / 10), { emitEvent: false });
		}

	} 

}

import { TestBed } from "@angular/core/testing";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { PersonGeneratorComponent } from "./person-generator.component";

describe("PersonGeneratorComponent", () => {
  let component: PersonGeneratorComponent;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormBuilder]
    });

    formBuilder = TestBed.inject(FormBuilder);
    component = new PersonGeneratorComponent(formBuilder);
  });

  it("should generate with valid generation config", () => {
    const formGroup = new FormGroup({
      count: new FormControl(500, [Validators.min(0), Validators.max(1000)]),
      male: new FormControl(true),
      female: new FormControl(true),
    }, { validators: component.requireOne });

    component['generator'] = formGroup;

    component.generate();

  });

  it("should not generate with invalid generation config", () => {
    const formGroup = new FormGroup({
      count: new FormControl(-500, [Validators.min(0), Validators.max(1000)]),
      male: new FormControl(false),
      female: new FormControl(false),
    }, { validators: component.requireOne });

    component['generator'] = formGroup;

    component.generate();
  });

  it("should limit number input to valid range", () => {
    const formGroup = formBuilder.group({
      count: [1500, [Validators.min(0), Validators.max(1000)]],
      male: [true],
      female: [true],
    });

    component['generator'] = formGroup;

    component.limitNumberInput();

  });
});

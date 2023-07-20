import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Spectator } from "@ngneat/spectator";
import { createComponentFactory } from "@ngneat/spectator/jest";
import { PersonGeneratorComponent } from "../person-generator/person-generator.component";
import { PersonListComponent } from "./person-list.component";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

describe("PersonListComponent", () => {
  let spectator: Spectator<PersonListComponent>;
  const createComponent = createComponentFactory({
    component: PersonListComponent,
    declarations: [PersonListComponent, PersonGeneratorComponent],
    imports: [
      MatTableModule,
      MatCheckboxModule,
      MatInputModule,
      MatButtonModule,
      ReactiveFormsModule,
      HttpClientTestingModule,
      HttpClientModule,
      NoopAnimationsModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) =>
            new TranslateHttpLoader(http, "./assets/i18n/", ".json"),
          deps: [HttpClient],
        },
      }),
    ],
  });

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [],
      declarations: [PersonListComponent, PersonGeneratorComponent],
      imports: [
        MatTableModule,
        MatCheckboxModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        HttpClientModule,
        NoopAnimationsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) =>
              new TranslateHttpLoader(http, "./assets/i18n/", ".json"),
            deps: [HttpClient],
          },
        }),
      ],
    }).compileComponents();
    spectator = createComponent();
  });

  test("should create", () => {
    expect(spectator.component).toBeTruthy();
  });
});


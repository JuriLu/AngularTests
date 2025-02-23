import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {HomeComponent} from "./home.component";
import {DebugElement} from "@angular/core";
import {CoursesModule} from "../courses.module";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {CoursesService} from "../services/courses.service";
import {setupCourses} from "../common/setup-test-data";
import {By} from "@angular/platform-browser";
import {of} from "rxjs";

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;
  let coursesService: any;

  const beginnerCourses = setupCourses().filter(course => course.category === 'BEGINNER')
  const advancedCourses = setupCourses().filter(course => course.category === 'ADVANCED')

  beforeEach(waitForAsync(() => {
    const coursesServiceSpy = jasmine.createSpyObj("CoursesService", ["findAllCourses"]);

    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
        NoopAnimationsModule
      ],
      providers: [
        {provide: CoursesService, useValue: coursesServiceSpy},
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        coursesService = TestBed.inject(CoursesService);
      })
  }))

  it('should create the component', () => {
    expect(component).toBeTruthy();
  })

  it('should display only beginner courses', () => {
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses))
    fixture.detectChanges();
    const tabs = el.queryAll(By.css('.mdc-tab'))
    expect(tabs.length).withContext('Unexpected number of tabs found').toBe(1);
  })

  it('should display only advanced courses', () => {

  })
})

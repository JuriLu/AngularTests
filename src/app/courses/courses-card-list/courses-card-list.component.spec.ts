import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {CoursesModule} from "../courses.module";
import {CoursesCardListComponent} from "./courses-card-list.component";

describe("CourseCardListComponent", () => {
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;  //Test utility typee

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ CoursesModule ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CoursesCardListComponent);
        component = fixture.componentInstance;
      })
  }))

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it('should display the course list', () => {

  });

  it('should display the first course', () => {

  });
})

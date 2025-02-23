import {TestBed} from "@angular/core/testing";
import {CoursesService} from "./courses.service";
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {COURSES} from "../../../../server/db-data";
import {provideHttpClient} from "@angular/common/http";

describe("CoursesService", () => {
  let coursesService: CoursesService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        CoursesService
      ]
    })


    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  })

  it('should retrieve all courses', () => {

    coursesService.findAllCourses().subscribe(courses => {
      expect(courses).withContext('No courses returned').toBeTruthy()
      expect(courses.length).withContext('Incorrect number of courses').toBe(12);

      const course = courses.find(courses => courses.id === 12);
      expect(course.titles.description).toBe("Angular Testing Course")
    });

    const req = httpTestingController.expectOne('/api/courses')   //Mock request
    expect(req.request.method).toBe('GET');
    req.flush({payload: Object.values(COURSES)}) //Pass some data to our mock request, pass the data return

  })

  it('should find a course by id', () => {

    coursesService.findCourseById(12).subscribe(course => {
      expect(course).withContext('No course returned').toBeTruthy()
      expect(course.id).withContext('Incorrect course id').toBe(12);

      expect(course.titles.description).toBe("Angular Testing Course")
    });

    const req = httpTestingController.expectOne('/api/courses/12')   //Mock request
    expect(req.request.method).toBe('GET');
    req.flush(COURSES[12]) //Pass some data to our mock request, pass the data return

  })

  afterEach(()=>{
    httpTestingController.verify() // Verify that no other call is being made after the finish of each call
  })

})

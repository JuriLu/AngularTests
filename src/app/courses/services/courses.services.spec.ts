import {TestBed} from "@angular/core/testing";
import {CoursesService} from "./courses.service";
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {COURSES, findLessonsForCourse} from "../../../../server/db-data";
import {HttpErrorResponse, provideHttpClient} from "@angular/common/http";
import {Course} from "../model/course";
import {extractJsDocDescription} from "@angular/compiler-cli/src/ngtsc/docs/src/jsdoc_extractor";

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

  it('should save a course data', () => {
    const changes: Partial<Course> = {titles: {description: "Testing Course"}};

    coursesService.saveCourse(12, changes).subscribe(course => {
      expect(course.id).withContext('Incorrect course id').toBe(12);
    });

    const req = httpTestingController.expectOne('/api/courses/12')   //Mock request
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.titles.description).withContext('Description not the same as in changes').toBe(changes.titles.description);
    req.flush({
      ...COURSES[12],
      ...changes
    }) //Pass some data to our mock request, pass the data return

  })

  it('should give an error if save course fails', () => {
    const changes: Partial<Course> = {titles: {description: "Testing Course"}};

    coursesService.saveCourse(12, changes).subscribe(
      () => fail("The save course operation should have failed"),
      (error: HttpErrorResponse) => expect(error.status).toBe(500)
    )

    const req = httpTestingController.expectOne('/api/courses/12')   //Mock request
    expect(req.request.method).toBe('PUT');
    req.flush('Save Course Failed', {status: 500, statusText: 'Internal Server Error'}) //Pass some data to our mock request, pass the data return

  })

  it('should find a list of lessons', () => {

    coursesService.findLessons(12).subscribe(lessons => {
      expect(lessons).withContext('No course returned').toBeTruthy()
      expect(lessons.length).withContext('Incorrect course id').toBe(3);
    });

    const req = httpTestingController.expectOne(req => req.url == '/api/lessons')
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get("courseId")).toEqual('12');
    expect(req.request.params.get("filter")).toEqual('');
    expect(req.request.params.get("sortOrder")).toEqual('asc');
    expect(req.request.params.get("pageNumber")).toEqual('0');
    expect(req.request.params.get("pageSize")).toEqual('3');

    req.flush({
      payload: findLessonsForCourse(12).slice(0,3)
    })

  })

  afterEach(() => {
    httpTestingController.verify() // Verify that no other call is being made after the finish of each call
  })

})

import {CalculatorService} from './calculator.service';
import {LoggerService} from './logger.service';
import {TestBed} from '@angular/core/testing';

/*
*  THREE STEPS OF WRITING A TEST
*
* 1. We set up the test, usually done via the use of  a beforeEach block, where we define a spy (because we shouldn't inject real dependencies of the services that we don't care testing on this test suite)
*      and the testbed Testing module configurations and inject the services
* 2. We will perform the operation we want. For example: adding two numbers , or subtract one number from another
* 3. We run a series of assertions ( expect() ) that will either pass the test or fail the test.
*
 */


describe('CalculatorService', () => {

    let calculator: CalculatorService,
        loggerSpy: any;

    beforeEach(()=> {

        console.log("Calling beforeEach");

        /*
        * loggerSpy => is a complete fake implementation of a logger service. This is an object
        * created by Jasmine that contains only one method called "log". We are not testing logger service, only calculator service here.
        */
        loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]);

        TestBed.configureTestingModule({   // Testbed makes possible to inject the service in the service, to make possible to also use DI on testing
            providers: [
                CalculatorService,
                {provide: LoggerService, useValue: loggerSpy}
            ]
        });

        /*
        * Injection of Calculator Service, only here we use the real instance of the service,
        * to test its functionality. The goal is to test the calculator service in isolation, assuming that all the other parts of the
        * application with which the calculator interacts are OK.
        * This it called Unit Testing.
        * Because we are testing only the calculator service we don't care for the other parts.
        */
        calculator = TestBed.inject(CalculatorService);

    });

    it('should add two numbers', () => {   //it => test only one functionality of the service and one only.

        console.log("add test");

        const result = calculator.add(2, 2);

        expect(result).toBe(4);

        expect(loggerSpy.log).toHaveBeenCalledTimes(1); //See how many times, did the log function get called

    });


    it('should subtract two numbers', () => {

        console.log("subtract test");

        const result = calculator.subtract(2, 2);

        expect(result).withContext("unexpected subtraction result").toBe(0);

        expect(loggerSpy.log).toHaveBeenCalledTimes(1);

    });

});

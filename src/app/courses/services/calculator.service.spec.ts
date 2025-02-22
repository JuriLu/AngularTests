import {CalculatorService} from './calculator.service';
import {LoggerService} from './logger.service';
import {TestBed} from '@angular/core/testing';


describe('CalculatorService', () => {

    let calculator: CalculatorService,
        loggerSpy: any;

    beforeEach(()=> {

        console.log("Calling beforeEach");

        loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]); // complete fake implemetation of a logger service. This is an object
                                                                    // created by Jasmine that contains only one method called "log"

        TestBed.configureTestingModule({   // Testbed makes possible to inject the service in the service, to make possible to also use DI on testing
            providers: [
                CalculatorService,
                {provide: LoggerService, useValue: loggerSpy}
            ]
        });

        calculator = TestBed.inject(CalculatorService);  // Injection of Calculator Service

    });

    it('should add two numbers', () => {

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

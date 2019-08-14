import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { convertToParamMap, ParamMap } from '@angular/router';

/**
 * @see https://remypenchenat.blogspot.com/2018/02/angular-testing-activatedroute.html
 */
@Injectable()
export class ActivatedRouteStub {
  // Observable that contains a map of the parameters
  private subjectParamMap = new BehaviorSubject(convertToParamMap(this.testParamMap));
  paramMap = this.subjectParamMap.asObservable();

  private _testParamMap: ParamMap;
  // tslint:disable-next-line:typedef
  get testParamMap() {
    return this._testParamMap;
  }
  set testParamMap(params: {}) {
    this._testParamMap = convertToParamMap(params);
    this.subjectParamMap.next(this._testParamMap);
  }

  // Observable that contains a map of the query parameters
  private subjectQueryParamMap = new BehaviorSubject(convertToParamMap(this.testParamMap));
  queryParamMap = this.subjectQueryParamMap.asObservable();

  private _testQueryParamMap: ParamMap;
  // tslint:disable-next-line:typedef
  get testQueryParamMap() {
    return this._testQueryParamMap;
  }
  set testQueryParamMap(params: {}) {
    this._testQueryParamMap = convertToParamMap(params);
    this.subjectQueryParamMap.next(this._testQueryParamMap);
  }

  get snapshot(): {
    paramMap: any;
    queryParamMap: any;
  } {
    return {
      paramMap: this.testParamMap,
      queryParamMap: this.testQueryParamMap,
    };
  }
}

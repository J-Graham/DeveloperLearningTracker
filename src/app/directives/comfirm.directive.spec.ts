import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { SaConfirmDirective } from './confirm.directive';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'my-test-component',
  template: `
    <div saConfirm></div>
  `,
})
class TestComponent {}

describe('SaConfirmDirective', () => {
  let componentFixture: ComponentFixture<TestComponent>;
  let directive: SaConfirmDirective;
  let fixture: ComponentFixture<TestComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SaConfirmDirective, TestComponent],
      imports: [SweetAlert2Module.forRoot()],
    });
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestComponent);
      const directiveEl = fixture.debugElement.query(By.directive(SaConfirmDirective));
      directive = directiveEl.injector.get(SaConfirmDirective);
    });
    componentFixture = TestBed.createComponent(TestComponent);
    componentFixture.detectChanges();
  }));

  describe('#saConfirm', () => {
    it('should pop confirm when clicked', () => {
      const debugEl: HTMLElement = fixture.debugElement.nativeElement;
      const element = debugEl.querySelector('div');
      // simulate click
      spyOn(directive, 'onHostClicked');

      element.click();
      expect(directive.onHostClicked).toHaveBeenCalled();
    });
  });
});

import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FitTextDirective } from './fit-text.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div id="container" style="width: 300px; border: 1px solid black">
      <h1 appFitText>Test Title</h1>
  `,
})
class TestComponent {}

describe('FitTextDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveInstance: FitTextDirective;
  let h1Element: HTMLElement;
  let container: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FitTextDirective],
      declarations: [TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const debugEl = fixture.debugElement.query(By.directive(FitTextDirective));
    h1Element = debugEl.nativeElement;
    container = h1Element.parentElement as HTMLElement;
    directiveInstance = debugEl.injector.get(FitTextDirective);
  });

  it('should create an instance', () => {
    expect(directiveInstance).toBeTruthy();
  });

  it('should set initial styles', () => {
    expect(h1Element.style.whiteSpace).toBe('nowrap');
    expect(h1Element.style.display).toBe('inline-block');
    expect(h1Element.style.fontSize).toContain('px');
  });

  it('should reduce font size if text overflows the parent', () => {
    Object.defineProperty(container, 'clientWidth', { value: 100, configurable: true });
    Object.defineProperty(h1Element, 'scrollWidth', { value: 200, configurable: true });

    (directiveInstance as any).fitText();

    const fontSizeValue = parseFloat(h1Element.style.fontSize);
    expect(fontSizeValue).toBeLessThan(150);
    expect(fontSizeValue).toBeGreaterThanOrEqual(10);
  });

  it('should keep the base font size if text fits within the parent', () => {
    Object.defineProperty(container, 'clientWidth', { value: 300, configurable: true });
    Object.defineProperty(h1Element, 'scrollWidth', { value: 250, configurable: true });

    (directiveInstance as any).fitText();

    const fontSizeValue = parseFloat(h1Element.style.fontSize);
    expect(fontSizeValue).toBe(150);
  });

  it('should disconnect observers on destroy', () => {
    spyOn((directiveInstance as any).resizeObserver, 'disconnect').and.callThrough();
    spyOn((directiveInstance as any).mutationObserver, 'disconnect').and.callThrough();

    directiveInstance.ngOnDestroy();

    expect((directiveInstance as any).resizeObserver.disconnect).toHaveBeenCalled();
    expect((directiveInstance as any).mutationObserver.disconnect).toHaveBeenCalled();
  });
});

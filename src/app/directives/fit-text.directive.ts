import { Directive, ElementRef, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core'

@Directive({
  selector: '[appFitText]',
  standalone: true,
})
export class FitTextDirective implements AfterViewInit, OnDestroy {
  private readonly baseFontSize = 150
  private readonly minFontSize = 10
  private readonly resizeObserver = new ResizeObserver(() => this.fitText())
  private readonly mutationObserver = new MutationObserver(() => this.fitText())

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit(): void {
    const element = this.el.nativeElement as HTMLElement
    const parent = element.parentElement
    if (parent) {
      this.resizeObserver.observe(parent)
    }
    this.mutationObserver.observe(element, {
      childList: true,
      characterData: true,
      subtree: true,
    })
    this.fitText()
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect()
    this.mutationObserver.disconnect()
  }

  private fitText(): void {
    const element = this.el.nativeElement as HTMLElement
    const parent = element.parentElement as HTMLElement
    if (!parent) return

    this.renderer.setStyle(element, 'white-space', 'nowrap')
    this.renderer.setStyle(element, 'display', 'inline-block')

    let fontSize = this.baseFontSize
    this.renderer.setStyle(element, 'font-size', `${fontSize}px`)

    const maxWidth = parent.clientWidth
    if (element.scrollWidth > maxWidth) {
      const ratio = maxWidth / element.scrollWidth
      fontSize = Math.max(this.minFontSize, fontSize * ratio)
      this.renderer.setStyle(element, 'font-size', `${fontSize}px`)
    }
  }
}

import { Directive, OnInit, ComponentRef, ViewContainerRef, ComponentFactoryResolver, Output, EventEmitter, OnDestroy, HostListener } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Subscription } from 'rxjs';
import { SweetAlertOptions } from 'sweetalert2';

@Directive({ selector: '[saConfirm]' })
export class SaConfirmDirective implements OnInit, OnDestroy {
  /**
   * Emits when the user clicks "Confirm".
   * Bears a value when using "input", resolved "preConfirm", etc.
   *
   * Example:
   *     public handleConfirm(email: string): void {
   *         // ... save user email
   *     }
   */
  @Output() public readonly saConfirm = new EventEmitter<any>();

  /**
   * Emits when the user clicks "Cancel" (or dismisses the modal by any other way).
   * By default, it will emit a string representing the reason for which the SweetAlert has been closed, or the
   * value of a rejected "preConfirm".
   *
   * Example:
   *     public handleCancel(reason: string): void {
   *         // reason can be 'cancel', 'overlay', 'close', and 'timer'
   *         // ... do something
   *     }
   */
  @Output() public readonly cancel = new EventEmitter<any>();

  /**
   * Holds the default SweetAlert2 options.
   */
  private swalOptions: SweetAlertOptions = {
    cancelButtonClass: 'btn btn-swal-override',
    confirmButtonClass: 'btn btn-swal-override',
    confirmButtonText: 'Yes, do it!',
    showCancelButton: true,
    text: 'You wont be able to revert this!',
    title: 'Are you sure?',
    type: 'warning',
  };

  private confirmSubscription: Subscription;
  private cancelSubscription: Subscription;
  private swalRef: ComponentRef<SwalComponent>;
  private swalInstance: SwalComponent;

  constructor(private readonly viewContainerRef: ViewContainerRef, private readonly resolver: ComponentFactoryResolver) {}

  public ngOnInit(): void {
    if (!this.swalInstance) {
      const factory = this.resolver.resolveComponentFactory(SwalComponent);

      this.swalRef = this.viewContainerRef.createComponent(factory);
      this.swalInstance = this.swalRef.instance;
    }

    this.confirmSubscription = this.swalInstance.confirm.asObservable().subscribe((v) => this.saConfirm.emit(v));
    this.cancelSubscription = this.swalInstance.cancel.asObservable().subscribe((v) => this.cancel.emit(v));
  }

  /**
   * OnDestroy lifecycle handler.
   * Destroys the dynamically-created SwalComponent and unsubscribes from that component's (confirm) and (cancel).
   */
  public ngOnDestroy(): void {
    if (this.swalRef) {
      this.swalRef.destroy();
    }

    this.confirmSubscription.unsubscribe();
    this.cancelSubscription.unsubscribe();
  }

  /**
   * Click handler.
   * The directive listens for onclick events on its host element.
   * When this happens, it shows the <swal> attached to this directive.
   */
  @HostListener('click', ['$event'])
  public onHostClicked(event: MouseEvent): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.swalInstance.options = this.swalOptions;
    this.swalInstance.show();
  }
}

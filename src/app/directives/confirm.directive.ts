import { Directive, OnInit, ComponentRef, ViewContainerRef, ComponentFactoryResolver, Output, EventEmitter, OnDestroy, HostListener, Input } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Subscription } from 'rxjs';
import { SweetAlertOptions, SweetAlertType } from 'sweetalert2';

export interface IConfirmConfig {
  saConfirmOptions?: SweetAlertOptions;
}

@Directive({ selector: '[saConfirm]' })
export class SaConfirmDirective implements OnInit, OnDestroy {
  /**
   * Pass in a SweetAlertOptions object that will override any of the default properties.
   *
   * Example:
   *       confirmOptions = {
   *          confirmButtonText: 'sure... I guess',
   *       };
   */
  @Input() public readonly saConfirmOptions: SweetAlertOptions = {};

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
    confirmButtonText: this.saConfirmOptions && this.saConfirmOptions.confirmButtonText ? this.saConfirmOptions.confirmButtonText : 'Yes, do it!',
    showCancelButton: true,
    text: this.saConfirmOptions && this.saConfirmOptions.text ? this.saConfirmOptions.text : 'You wont be able to revert this!',
    title: this.saConfirmOptions && this.saConfirmOptions.title ? this.saConfirmOptions.title : 'Are you sure?',
    type: this.saConfirmOptions && this.saConfirmOptions.type ? this.saConfirmOptions.type : 'warning',
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

    this.swalOptions = Object.assign(this.swalOptions, this.saConfirmOptions);
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

    // override any of the passed in options vs the default options
    if (this.swalOptions) {
      this.swalInstance.options = this.swalOptions;
    }

    this.swalInstance.show();
  }
}

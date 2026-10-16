import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonSpinner,
} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonSpinner,
  ],
})
export class HomePage {
  private fb = inject(FormBuilder);

  public inventarioForm: FormGroup;
  public isSubmitting = signal(false);

  public categorias = ['Electrónica', 'Herramientas', 'Consumibles'];

  constructor() {
    this.inventarioForm = this.fb.group({
      sku: ['', [Validators.required, this.skuValidator]],
      nombre: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      stockMinimo: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
    });
  }

  private skuValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    return /^[A-Za-z0-9]{12}$/.test(value) ? null : { skuInvalido: true };
  }

  async onSubmit(): Promise<void> {
    if (this.inventarioForm.invalid) {
      this.inventarioForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    // Simulación de guardado
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Producto guardado:', this.inventarioForm.value);
    this.inventarioForm.reset();
    this.isSubmitting.set(false);
  }
}
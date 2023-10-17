import { FormGroup, FormControl} from "@angular/forms"

export class FormValidator{
    static validateFormFields(formGroup: FormGroup){
        Object.keys(formGroup.controls).forEach((field)=>{
          const control = formGroup.get(field);
          if(control instanceof FormControl){
            control.markAsDirty({onlySelf: true});
          }else if( control instanceof FormGroup){
            this.validateFormFields(control);
          }
        });
      }
}
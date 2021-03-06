// Angular Dependencies
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PlatformLocation } from '@angular/common';

// Third party dependencies
import { slideInOutAnimation } from '../../animation/index';
import { MessageService } from '../../shared/services/message.service';
import { ContactList } from '../../models/contact-model';
import { ContactService } from '../../services/contact.service';
import { SpinnerService } from '../../shared/spinner/spinner.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'add-contact.component.html',
    styleUrls: ['add-contact.component.css'],
    animations: [slideInOutAnimation],
    host: { '[@slideInOutAnimation]': '' }
})

export class AddContactComponent implements OnInit {
    loggedInUserDetails: any;
    errorMessage: any;
    errorFlagForAdd: boolean;
    /**Form Variables */
    AddContactForm: FormGroup;

    mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
    emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

    constructor(
        private _router: Router,
        private _messageService: MessageService,
        private formBuilder: FormBuilder,
        private _contactService: ContactService,
        private _spinnerService: SpinnerService,
        private location1: PlatformLocation) {
        // history.pushState(null, null, location.href);
        // window.onpopstate = function () {
        //     history.go(1);
        // };
        // location.onPopState(() => {
        //     console.log('pressed back!');
        // });
    }

    ngOnInit() {
        this.errorFlagForAdd = false;
        this.setAddContactForm();
    }
    setAddContactForm() {
        this.AddContactForm = this.formBuilder.group({
            FirstName: ['', [Validators.required]],
            LastName: ['', [Validators.required]],
            Email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
            PhoneNumber: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
            Status: ['Active'],
            Age: ['', [this.ageRangeValidator]],
            fromDate: ['', [Validators.required]],
            toDate: [new Date(), [Validators.required]]
        }, { validator: this.dateValidate('fromDate', 'toDate') });
    }
    dateValidate(from: string, to: string) {
        return (group: FormGroup): {[key: string]: any} => {
            let f = group.controls[from].value;
            let t = group.controls[to].value;
            if (f > t) {
              return {
                dates: "Date from should be less than Date to"
              };
            }
            if(t>new Date()){
                return{
                    dates:"To date should not be in future"
                }
            }
            console.log(f);
            console.log(t);
            return {};
          }
    }
    ageRangeValidator(control: AbstractControl): {[key: string]: boolean } | null {
        if (control.value !== undefined && (isNaN(control.value) || control.value < 18 || control.value > 45)) {
            return { 'ageRange': true };
        }
        return null;
    }
    onAddContact({ value, valid }: { value: ContactList, valid: boolean }) {
        if (valid) {
            this.errorFlagForAdd = false;
            this._contactService.addContact(value);
            this._messageService.addMessage({ severity: 'success', summary: 'Success Message', detail: 'Contact Added Successfully..!!' });
            this._router.navigate(['/contact-list']);
        } else {
            this.errorFlagForAdd = true;
        }
    }
}

import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { ContactList } from "../../models/contact-model";

import { ContactService } from "../../services/contact.service";

@Injectable()
export class UpdateContactResolver implements Resolve<ContactList> {
  constructor(
    private _contactService: ContactService,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ContactList> {
    let id = route.paramMap.get("id");
    console.log(id);
    let contact = this._contactService.getContactById(Number(id));

    if (contact) {
      return contact;
    } else {
      this.router.navigate(["/contact-list"]);
      return null;
    }
  }
}

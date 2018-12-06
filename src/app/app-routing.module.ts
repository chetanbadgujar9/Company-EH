import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";

// Other Components
import { AddContactComponent } from "./contact-list/add-contact/add-contact.component";
import { ContactListComponent } from "./contact-list/contact-list/contact-list.component";
import { UpdateContactComponent } from "./contact-list/update-contact/update-contact.component";
import { DirectiveDemoComponent } from "./directive-demo/directive-demo.component";
import { LoginComponent } from "./login/login.component";
import { UpdateContactResolver } from "./contact-list/update-contact/update-contact.resolver";

const routes: Routes = [
  {
    path: "contact-list",
    component: ContactListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "contact-list",
    component: ContactListComponent,
    children: [
      {
        path: "add-contact",
        component: AddContactComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "update-contact/:id",
        component: UpdateContactComponent,
        canActivate: [AuthGuard],
        resolve: { contactDetails: UpdateContactResolver }
      }
    ]
  },
  {
    path: "directive-demo",
    component: DirectiveDemoComponent,
    canActivate: [AuthGuard]
  },
  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "contact-list", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

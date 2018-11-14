import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchPipe' })

export class SearchPipe implements PipeTransform {
    transform(value: any[], searchString: string): any[] {
        return searchString ? value.filter(item =>
            (
                item.FirstName.search(new RegExp(searchString, 'i')) !== -1 ||
                item.LastName.search(new RegExp(searchString, 'i')) !== -1 ||
                item.Email.search(new RegExp(searchString, 'i')) !== -1 ||
                item.PhoneNumber.search(new RegExp(searchString, 'i')) !== -1 ||
                item.Status.search(new RegExp(searchString, 'i')) !== -1
            )
        ) : value;
    }
}

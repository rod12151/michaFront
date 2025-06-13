import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Eleccion';

  newsActive: boolean = true;
  menuActive: boolean = false;

  onMaskClick() {
    this.hideMenu();
  }

  hideMenu() {
    this.menuActive = false;
    this.removeClass(document.body, 'blocked-scroll');
  }

  removeClass(element: any, className: string) {
    if (element.classList)
      element.classList.remove(className);
    else
      element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }

  onMenuButtonClick() {
    this.menuActive = true;
    this.addClass(document.body, 'blocked-scroll');
  }

  addClass(element: any, className: string) {
    if (element.classList)
      element.classList.add(className);
    else
      element.className += ' ' + className;
  }
}

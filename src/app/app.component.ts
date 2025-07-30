import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactModalComponent } from './features/contact-modal/contact-modal.component';
import { ContactService } from './core/services/contact.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title: string = "Agenda - Grupo II";
  public icon: string = "chevron_forward";
  public displayToolsMenu: boolean = true;
  public searchValue: string = '';
  public routeTitle: string = '';

 constructor(private matDialog: MatDialog,
    private contactService: ContactService,
    private router: Router,
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const currentUrl = this.router.url;

      if (currentUrl.includes('/list')) {
        this.routeTitle = 'Lista de contatos';
      } else if (currentUrl.includes('/about')) {
        this.routeTitle = 'Sobre o aplicativo';
      }

      if (event.url === "/list") {
        this.displayToolsMenu = true;
      } else {
        this.displayToolsMenu = false;
      }
    });
  }

  public addNewContact(): void {
    this.matDialog.open(ContactModalComponent, {
      data: {
        edit: false
      },
      width: "500px",
      height: "500px"
    });
  }

  public handleKeydown($event: Event) {
    setTimeout(() => {
      this.contactService.changeSearchParam(($event.target as HTMLInputElement).value);
    }, 200)
  }
}

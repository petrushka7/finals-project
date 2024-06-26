import { Component, OnInit, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ICustomer } from '../../shared/interfaces';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'cm-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customer: ICustomer | null = null;
  mapEnabled: boolean = false;
  mapComponentRef: ComponentRef<any> = {} as ComponentRef<any>;

  @ViewChild('mapsContainer', { read: ViewContainerRef }) 
  private mapsViewContainerRef: ViewContainerRef = {} as ViewContainerRef;

  constructor(private route: ActivatedRoute, 
    private dataService: DataService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    // Subscribe to params so if it changes we pick it up. Could use this.route.parent.snapshot.params["id"] to simplify it.
    this.route.parent?.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id) {
        this.dataService.getCustomer(id)
          .subscribe((customer: ICustomer) => {
            this.customer = customer;
            if (this.customer && this.customer.latitude) {
            //  this.lazyLoadMapComponent();
              // this.mapEnabled = true; // For eager loading map
            }
          });
      }
    });
  }




}

import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 5000;

  public text: string;
  public type = "success";

  aSub: Subscription;

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.alertService.alert$.subscribe(({type, text}) => {
      this.text = text;
      this.type = type

      const timout = setTimeout(() => {
        clearTimeout(timout);
        this.text = "";
      }, this.delay)
      })
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}

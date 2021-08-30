import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../../services/users.service";
import {Users} from "../../../models/users";
import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  search = '';
  searchForCode: Subject<string> = new Subject<string>();
  list: Users[] = [];
  constructor(
    private svcUsers: UsersService
  ) {
    this.searchForCode
      .pipe(
        debounceTime(300)
      ).subscribe(resp => {
        if(resp.length == 0) {
          this.svcUsers.getUser();
        } else {
          this.search = resp;
          this.svcUsers.searchUser(resp);
        }
    })
  }

  ngOnInit(): void {
    this.svcUsers.userList.subscribe(resp => {
      this.list = resp;
    });
  }

  onSearchUpdate(value: string) {
    this.searchForCode.next(value);
  }
}

import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Users} from "../models/users";
import {HttpClient} from "@angular/common/http";
import { environment } from "../environments/environment"
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userListControl: BehaviorSubject<Users[]> = new BehaviorSubject<Users[]>([]);
  userList = this.userListControl.asObservable();
  constructor(private http: HttpClient) {
    this.getUser()
  }

  public getUser() {
    this.http.get(environment.apiUrl).pipe( tap(() => { this.userListControl.next([]);})).subscribe((resp: any) => {
      this.userListControl.next(resp.data);
    });
  }

  public searchUser(code: string) {
    this.http.get(`${environment.apiUrl}/${code}`).subscribe((resp: any) => {
       this.userListControl.next([]);
       this.userListControl.next([resp.data]);
    });
  }
  public updateList(list: Users[]): void {
    this.userListControl.next(list);
  }

}

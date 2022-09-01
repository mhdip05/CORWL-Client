import { PaginationModel } from './../../../_models/PaginationModel';
import { IPagination } from './../../../_interface/IPagination';
import { UserService } from './../../../_services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/_interface/IUser';

@Component({
  selector: 'app-user-role-mapping',
  templateUrl: './user-role-mapping.component.html',
  styleUrls: ['./user-role-mapping.component.scss']
})
export class UserRoleMappingComponent implements OnInit {

  users: Partial<IUser[]> = []
  cols!: any[];
  pagination: any
  paginationModel = new PaginationModel 

  constructor(private userSerivces: UserService) { }

  ngOnInit(): void {
    this.getAllUser(this.paginationModel.pageNumber, this.paginationModel.pageSize)
  }

  private userRoleMappingColumn() {
    this.cols = [
      { field: 'userName', header: 'Username' },
      { field: 'email', header: 'Email' },
      { field: 'phoneNumber', header: 'Phone Number' },
    ]
  }

  getAllUser(pageNumber:number, pageSize:number) {
    this.userSerivces.getAllUser(pageNumber, pageSize).subscribe({
      next: (users) => {
        //console.log(users)
        this.users = users.result
        this.pagination = users.pagination;

        this.userRoleMappingColumn()
      },
      complete: () => {

      }
    })
  }

  paginate($event: any) {
    //console.log($event)
    var pageNumber = $event.page + 1
    var pageSize = $event.rows;

    this.getAllUser(pageNumber, pageSize)
  }

  selectUsername(userData: IUser) {
    console.log(userData)
  }

}

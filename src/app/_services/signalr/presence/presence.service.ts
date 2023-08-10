import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { IUser } from 'src/app/_interface/IUser';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection | any;

  constructor() {}

  CreateHubConnect(user: IUser) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((error: any) => console.log(error));

    // for testing
    this.hubConnection.on('UserIsOnline', (username: any) => {
      console.log(username + ' has connected');
    });

    this.hubConnection.on('UserIsOffline', (username: any) => {
      console.log(username + ' has disconnected');
    });
  }

  stopHubConnection(){
    this.hubConnection.stop().catch((error:any)=> console.log(error))
  }
}

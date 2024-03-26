import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

const uriAPI = 'http://localhost:8080/elevator-request';

@Injectable({
  providedIn: 'root'
})
export class ElevatorService {

  constructor( private httpClient: HttpClient ) { }

  async requestElevator( floor: number ) {
    const response = await firstValueFrom( this.httpClient.post(uriAPI, floor) )
    return response;
  }

  async getListRequestFloors() {
    const response = await firstValueFrom( this.httpClient.get<number[]>(uriAPI) )
    return response;
  }

  async getNextFloor( currentFloor: number, elevatorTravelDirection: 'Stationary' | 'Up' | 'Down' ) {
    const response = await firstValueFrom( this.httpClient.get<number>(`${uriAPI}/next?currentFloor=${currentFloor}&elevatorTravelDirection=${elevatorTravelDirection}`) )
    return response;
  }

  async deleteRequestElevator(floor: number) {
    const response = await firstValueFrom( this.httpClient.delete(`${uriAPI}/${floor}`) )
    return response;
  }
  

}

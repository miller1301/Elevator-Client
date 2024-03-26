import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ElevatorService } from '../../services/elevator.service';

@Component({
  selector: 'app-elevator',
  standalone: true,
  imports: [HttpClientModule],
  providers: [ElevatorService],
  templateUrl: './elevator.component.html',
  styleUrl: './elevator.component.scss'
})
export default class ElevatorComponent {

  currentFloor: number = 1;
  listFloors: number[] = [];
  nextFloor!: number;

  constructor( private elevatorService: ElevatorService ) {}
  
  async requestElevator(floor: number) {
    this.currentFloor = floor;
    await this.elevatorService.requestElevator(floor);
    await this.getListRequestFloors();
    await this.getNextFloor();
  }

  async getListRequestFloors() {
    this.listFloors = await this.elevatorService.getListRequestFloors();
  }

  async getNextFloor() {
    let elevatorTravelDirection: 'Stationary' | 'Up' | 'Down';

    if( !this.listFloors || this.listFloors.length === 0 ) {
      elevatorTravelDirection = 'Stationary';
    } else if( this.currentFloor < this.listFloors[this.listFloors.length - 1] ) {
      elevatorTravelDirection = 'Up';
    } else {
      elevatorTravelDirection = 'Down';
    }



    this.nextFloor = await this.elevatorService.getNextFloor(this.currentFloor, elevatorTravelDirection);

    if(!this.nextFloor) this.nextFloor = this.currentFloor;
    
  }

  async deleteRequestElevator(floor: number) {
    await this.elevatorService.deleteRequestElevator(floor);
  }

}

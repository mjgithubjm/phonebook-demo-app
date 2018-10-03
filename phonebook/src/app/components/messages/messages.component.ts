import { Component, OnInit, Inject } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  constructor(public messageService: MessageService,
    public dialogRef: MatDialogRef<MessagesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit() {
  }
 

  onNoClick(): void {
    this.dialogRef.close();
  }

}

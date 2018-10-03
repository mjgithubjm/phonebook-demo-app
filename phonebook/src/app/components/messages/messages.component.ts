import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MessageService } from '../../services/message.service';

@Component({
	selector: 'app-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
	constructor(private messageService: MessageService,
		private matDialog: MatDialog) {
		this.messageService.messageRequestEvent.subscribe((options: any) => {
			this.openDialog(options);
		});
	}

	ngOnInit() {
	}

	openDialog(options: any) {
		this.matDialog.open(ConfirmationDialogLayoutComponent, {
			data: options
		});
	}
}

@Component({
	selector: 'confirmation-dialog-layout',
	templateUrl: './confirmation-dialog-layout.html',
})
export class ConfirmationDialogLayoutComponent {
	message: string;
	category: string;
	acceptFunction: (() => void);
	rejectFunction: (() => void);

	constructor(private dialogRef: MatDialogRef<ConfirmationDialogLayoutComponent>, @Inject(MAT_DIALOG_DATA) public options: any) {
		this.message = options.message;
		this.category = options.category;
		this.acceptFunction = options.acceptFunction;
		this.rejectFunction = options.rejectFunction;
	}

	onAccept() {
		if (this.acceptFunction) this.acceptFunction();
		this.dialogRef.close();
	}

	onReject() {
		if (this.rejectFunction) this.rejectFunction();
		this.dialogRef.close();
	}
}

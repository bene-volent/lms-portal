import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { take } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ToastService{


    maxMessages = 3;
    currentKey = 0

    constructor(private messageService: MessageService) { }

    add(message: { severity: string, summary: string, detail: string }) {
        this.messageService.clear()
        this.messageService.add({...message});
    }

    show(message: string){
        this.add({severity:'success', summary: 'Success', detail: message});
    }
    showSuccess(message: string){
        this.add({severity:'success', summary: 'Success', detail: message});
    }

    showInfo(message: string){
        this.add({severity:'info', summary: 'Info', detail: message});
    }

    showWarn(message: string){
        this.add({severity:'warn', summary: 'Warn', detail: message});
    }

    showError(message: string){
        this.add({severity:'error', summary: 'Error', detail: message});
    }

}
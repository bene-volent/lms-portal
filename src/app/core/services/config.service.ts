import { Injectable } from "@angular/core";

@Injectable(
    { providedIn: 'root' }
)
export class ConfigService {
    menuActive = false;
    logoName = 'Ekadyu'
    get isMenuActive() {
        return this.menuActive;
    }

    hideMenu(){
        this.menuActive = false;
    }

    showMenu(){
        this.menuActive = true;
    }

}
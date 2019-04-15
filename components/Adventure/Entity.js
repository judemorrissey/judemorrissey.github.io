class Entity {
    static getSymbol() {
        return  '';
    }
    static getDescription() {
        return '';
    }
    isPassable(by_entity) {
        return false;
    }
}

class MobileEntity extends Entity {

}

export class Hero extends MobileEntity {
    static getSymbol() {
        return '@';
    }
    static getDescription() {
        return 'is your hero.';
    }
    isPassable(by_entity) {
        return true;
    }
}

export class Golem extends MobileEntity {
    static getSymbol() {
        return 'G';
    }
    static getDescription() {
        return 'is an evil enemy, watch out!';
    }
}

class StaticEntity extends Entity {

}

export class Air extends StaticEntity {
    static getSymbol() {
        return ' ';
    }
    static getDescription() {
        return 'is free and clear.';
    }
    isPassable(by_entity) {
        return true;
    }
}

export class Wall extends StaticEntity {
    static getSymbol() {
        return '#';
    }
    static getDescription() {
        return 'denotes impassable terrain.';
    }
}

export class Exit extends StaticEntity {
    static getSymbol() {
        return 'O';
    }
    static getDescription() {
        return 'is how to escape the G.';
    }
    isPassable(by_entity) {
        return by_entity instanceof Hero;
    }
}

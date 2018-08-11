class Entity {
    constructor() {
        this.isPassable = false;
    }

    static getSymbol() {
        return  '';
    }
    static getDescription() {
        return '';
    }
}

class MobileEntity extends Entity {

}

export class Hero extends MobileEntity {
    constructor() {
        super();
        this.isPassable = true;
    }
    static getSymbol() {
        return '@';
    }
    static getDescription() {
        return 'is your hero.';
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
    constructor() {
        super();
        this.isPassable = true;
    }
    static getSymbol() {
        return ' ';
    }
    static getDescription() {
        return 'is free and clear.';
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
    constructor() {
        super();
        this.isPassable = true;
    }
    static getSymbol() {
        return 'O';
    }
    static getDescription() {
        return 'is how to escape the G.';
    }
}

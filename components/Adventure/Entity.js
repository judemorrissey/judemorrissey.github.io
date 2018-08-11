class Entity {
    static symbol() {
        return  '';
    }
    static description() {
        return '';
    }
}

class MobileEntity extends Entity {

}

export class Hero extends MobileEntity {
    static symbol() {
        return '@';
    }
    static description() {
        return 'is your hero.';
    }
}

export class Golem extends MobileEntity {
    static symbol() {
        return 'G';
    }
    static description() {
        return 'is an evil enemy, watch out!';
    }
}

class StaticEntity extends Entity {

}

export class Air extends StaticEntity {
    static symbol() {
        return ' ';
    }
    static description() {
        return 'is free and clear.';
    }
}

export class Wall extends StaticEntity {
    static symbol() {
        return '#';
    }
    static description() {
        return 'denotes impassable terrain.';
    }
}

export class Exit extends StaticEntity {
    static symbol() {
        return 'O';
    }
    static description() {
        return 'is how to escape the G.';
    }
}

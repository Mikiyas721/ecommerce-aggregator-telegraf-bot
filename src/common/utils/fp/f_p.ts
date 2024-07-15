abstract class EitherTypes {
    abstract isLeft(): boolean

    abstract isRight(): boolean
}

export class Left extends EitherTypes {
    isLeft(): boolean {
        return true;
    }

    isRight(): boolean {
        return false;
    }
}

export class Right extends EitherTypes {
    isLeft(): boolean {
        return false;
    }

    isRight(): boolean {
        return true;
    }
}

export class Either<L extends Left, R extends Right> {
    constructor(private value: L | R) {
    }

    static left<L extends EitherTypes, R extends EitherTypes>(l: L): Either<L, R> {
        return new Either<L, R>(l)
    }

    static right<L extends EitherTypes, R extends EitherTypes>(r: R): Either<L, R> {
        return new Either<L, R>(r)
    }

    fold<B>(ifLeft: (l: L) => B, ifRight: (r: R) => B): B {
        if (this.value.isLeft())
            return ifLeft(this.value as L)
        else
            return ifRight(this.value as R)
    }

    foldLeft<B>(ifLeft: (l: L) => B): B | undefined {
        if (this.value.isLeft())
            return ifLeft(this.value as L)
        return undefined
    }

    foldRight<B>(ifRight: (r: R) => B): B | undefined {
        if (this.value.isRight())
            return ifRight(this.value as R)
        return undefined
    }

    getOrElse<B>(ifLeft: (l: L) => B): B | R {
        if (this.value.isLeft())
            return ifLeft(this.value as L)
        else
            return this.value as R
    }

    /**
     * ifRight has to be provided unless certain that the value is Left
     * if ifRight is not provided and value is Right, an error will be thrown*/
    getLeft(ifRight?: (r: R) => any): L {
        if (this.value.isRight()) {
            if (ifRight == undefined) throw new Error("Function ifRight is missing and the value is right")
            return ifRight(this.value as R)
        } else
            return this.value as L
    }

    /**
     * ifLeft has to be provided unless certain that the value is Right
     * if ifLeft is not provided and value is Left, an error will be thrown*/
    getRight(ifLeft?: (l: L) => any): R {
        if (this.value.isLeft()) {
            if (ifLeft == undefined) throw new Error("Function ifLeft is missing and the value is left")
            return ifLeft(this.value as L)
        } else
            return this.value as R
    }

    get isLeft(): boolean {
        return this.value.isLeft()
    }

    get isRight(): boolean {
        return this.value.isRight()
    }
}

export class Option<S> {
    constructor(private value: undefined | S) {
    }

    static none<S>(): Option<S> {
        return new Option<S>(undefined)
    }

    static some<S>(s: S): Option<S> {
        return new Option<S>(s)
    }

    fold<B>(ifNone: () => B, ifSome: (s: S) => B): B {
        if (this.value == undefined)
            return ifNone()
        else
            return ifSome(this.value as S)
    }

    foldNone<B>(ifNone: () => B): B | undefined {
        if (this.value == undefined)
            return ifNone()
        return undefined
    }

    foldSome<B>(ifSome: (s: S) => B): B | undefined {
        if (this.value != undefined)
            return ifSome(this.value as S)
        return undefined
    }

    getOrElse<B>(ifNone: () => B) {
        if (this.value == undefined)
            return ifNone()
        else
            return this.value as S
    }

    /**
     * ifNone has to be provided unless certain that the value is Right
     * if ifNone is not provided and value is none, an error will be thrown*/
    getSome(ifNone?: () => any): S {
        if (this.value == undefined) {
            if (ifNone == undefined) throw new Error("Function ifNone is missing and the value is none")
            return ifNone()
        } else
            return this.value as S
    }

    get isNone(): boolean {
        return this.value == undefined
    }

    get isSome(): boolean {
        return this.value != undefined
    }
}

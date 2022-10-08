import { Nonce } from "@elrondnetwork/erdjs-network-providers/out/primitives";

export class Token {
    constructor(
        public readonly collection: string,
        public readonly nonce: number) { }

    toString(): string {
        return `${this.collection}-${new Nonce(this.nonce).hex()}`;
    }

    static fromIdentifier(identifier: string): Token {
        const index = identifier.lastIndexOf("-");

        const collection = identifier.substring(0, index);
        const nonce = parseInt(identifier.substring(index + 1), 16);
        return new Token(collection, nonce);
    }
}

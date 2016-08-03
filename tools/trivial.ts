namespace Trivial {

  interface Tri {
    test(): void;
  }

  abstract class Triv implements Tri {
    test() {}
  }

  export class Trivial extends Triv implements Tri {
    private nix: number;
  }

}

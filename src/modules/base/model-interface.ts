interface ModelInterface {
  _id: string;

  readonly id: string;

  // constructor(): void;
};

export default ModelInterface;

export interface ModelInterfaceConstructor {
  new(): ModelInterface;
}

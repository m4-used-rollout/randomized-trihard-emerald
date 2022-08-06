declare interface RandoModule {
    command: string;
    helpText: string;
    operation: ( ...params: string[]) => void;
}
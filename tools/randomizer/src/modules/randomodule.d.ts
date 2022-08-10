declare interface RandoModule {
    command: string;
    helpText: string;
    operation: (data:PokemonJson, ...params: string[]) => void;
}
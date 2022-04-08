export declare class FixtureCommand {
    command(): Promise<void>;
    runMigrations(): Promise<void>;
    createInDatabase(model: any, data: any): Promise<void>;
    getRepository(model: any): import("typeorm").Repository<unknown>;
}
